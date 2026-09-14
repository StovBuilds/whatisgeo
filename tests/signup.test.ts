import test from 'node:test';
import assert from 'node:assert/strict';
import worker, { SignupMailbox, normaliseEmail, readPayload, hash, logAiRead, type Env } from '../worker/index.ts';
test('rejects malformed email and header injection',()=>{
 assert.equal(normaliseEmail('  Owner+guide@Example.COM '),'owner+guide@example.com');
 for(const value of ['a\r\nbcc:x@y.com','not-email','a@localhost','.a@example.com','a..b@example.com','a@-example.com',null,42])assert.equal(normaliseEmail(value),null);
});
test('rejects oversized and non-object payloads',async()=>{
 for(const body of [JSON.stringify({email:'a'.repeat(3000)}),'null','[]'])await assert.rejects(()=>readPayload(new Request('https://whatisgeo.app/api/subscribe',{method:'POST',headers:{'content-type':'application/json'},body})));
});
test('AI-crawler reads are posted to the meter; humans, assets and /api are not',async(t)=>{
 const posts:{url:string;headers:Record<string,string>;body:Record<string,string>}[]=[];
 t.mock.method(globalThis,'fetch',async(input:RequestInfo|URL,init?:RequestInit)=>{posts.push({url:String(input),headers:init!.headers as Record<string,string>,body:JSON.parse(init!.body as string)});return new Response('{}');});
 const env={SITE_URL:'https://whatisgeo.app',AIREAD_TOKEN:'tok'} as Env;const waited:Promise<unknown>[]=[];const ctx={waitUntil:(p:Promise<unknown>)=>{waited.push(p);}};
 const req=(path:string,ua:string,extra:Record<string,string>={})=>new Request('https://whatisgeo.app'+path,{headers:{'user-agent':ua,'cf-ipcountry':'GB',...extra}});
 assert.equal(logAiRead(req('/llms.txt','Mozilla/5.0 (compatible; GPTBot/1.0)',{'x-fleet-probe':'secret'}),env,ctx),true);
 assert.equal(logAiRead(req('/','Mozilla/5.0 (Macintosh) Chrome/140'),env,ctx),false);
 assert.equal(logAiRead(req('/og.png','ClaudeBot/1.0'),env,ctx),false);
 assert.equal(logAiRead(req('/api/status','ClaudeBot/1.0'),env,ctx),false);
 assert.equal(logAiRead(req('/','ClaudeBot/1.0'),{SITE_URL:'https://whatisgeo.app'} as Env,ctx),false);
 await Promise.all(waited);
 assert.equal(posts.length,1);assert.equal(posts[0].url,'https://api.jstov.uk/api/ai-reads/ingest');
 assert.equal(posts[0].headers['x-ai-read-token'],'tok');assert.equal(posts[0].headers['x-fleet-probe'],'secret');
 assert.deepEqual(posts[0].body,{site:'whatisgeo',path:'/llms.txt',ua:'Mozilla/5.0 (compatible; GPTBot/1.0)',country:'GB'});
});
test('non-canonical hosts redirect to the site origin; the canonical host serves assets',async()=>{
 const env={SITE_URL:'https://whatisgeo.app',ASSETS:{fetch:async()=>new Response('asset')}} as unknown as Env;
 for(const from of ['https://www.whatisgeo.app/privacy/?x=1','https://whatisgeo.jack.workers.dev/llms.txt']){
  const response=await worker.fetch(new Request(from),env);
  assert.equal(response.status,301);assert.equal(response.headers.get('location'),'https://whatisgeo.app'+new URL(from).pathname+new URL(from).search);
 }
 assert.equal(await (await worker.fetch(new Request('https://whatisgeo.app/'),env)).text(),'asset');
});
test('unconfigured signup returns unavailable and cross-site requests are rejected',async()=>{
 const env={SITE_URL:'https://whatisgeo.app'} as Env;
 const request=(origin:string)=>new Request('https://whatisgeo.app/api/subscribe',{method:'POST',headers:{origin,'content-type':'application/json'},body:'{}'});
 const response=await worker.fetch(request(env.SITE_URL),env);assert.equal(response.status,503);assert.equal((await response.json() as {code:string}).code,'unavailable');
 assert.equal((await worker.fetch(request('https://elsewhere.example'),env)).status,403);
 const status=await worker.fetch(new Request('https://whatisgeo.app/api/status'),env);assert.deepEqual(await status.json(),{available:false});
});
test('malformed requests return client errors before reaching signup storage',async()=>{
 const env={SITE_URL:'https://whatisgeo.app',RESEND_API_KEY:'test-only',RESEND_FROM:'test@example.com',RESEND_SEGMENT_ID:'segment',RESEND_TOPIC_ID:'topic',SIGNUPS:{},SIGNUP_LIMITER:{limit:async()=>({success:true})}} as unknown as Env;
 for(const [body,status] of [['{',400],['null',400],[JSON.stringify({email:'a'.repeat(3000)}),413]] as const){
  const response=await worker.fetch(new Request('https://whatisgeo.app/api/subscribe',{method:'POST',headers:{origin:env.SITE_URL,'content-type':'application/json'},body}),env);
  assert.equal(response.status,status);assert.deepEqual(await response.json(),{code:'invalid'});
 }
});
function fixture() {
 const store=new Map<string,unknown>();let chain=Promise.resolve();
 const state={storage:{get:async(key:string)=>store.get(key),put:async(key:string,value:unknown)=>{store.set(key,value);},delete:async(key:string)=>store.delete(key),deleteAll:async()=>store.clear(),setAlarm:async()=>{}},blockConcurrencyWhile:<T>(fn:()=>Promise<T>)=>{const next=chain.then(fn);chain=next.then(()=>{},()=>{});return next;}} as unknown as DurableObjectState;
 const env={SITE_URL:'https://whatisgeo.app',RESEND_API_KEY:'test-only',RESEND_FROM:'What is GEO <test@example.com>',RESEND_SEGMENT_ID:'segment',RESEND_TOPIC_ID:'topic'} as Env;
 return {box:new SignupMailbox(state,env),store};
}
test('creates no contact before confirmation; concurrent replay creates only one contact',async(t)=>{
 const {box}=fixture();let token='';let contacts=0;let emailCount=0;
 t.mock.method(globalThis,'fetch',async(input:RequestInfo|URL,init?:RequestInit)=>{const url=String(input);if(url.endsWith('/emails')){emailCount++;const body=JSON.parse(init!.body as string);token=body.text.match(/#token=([a-f0-9]+\.[a-f0-9]+)/)[1].split('.')[1];return Response.json({id:'email'});}if(init?.method==='GET')return new Response(null,{status:404});contacts++;return Response.json({id:'contact'});});
 const subscribe=()=>new Request('https://mailbox/subscribe',{method:'POST',body:JSON.stringify({email:'reader@example.com',id:'a'.repeat(64)})});
 assert.equal((await box.fetch(subscribe())).status,202);assert.equal(contacts,0);assert.equal(emailCount,1);
 await box.fetch(subscribe());assert.equal(emailCount,1);
 const confirm=()=>new Request('https://mailbox/confirm',{method:'POST',body:JSON.stringify({token})});
 const results=await Promise.all([box.fetch(confirm()),box.fetch(confirm())]);assert.deepEqual(results.map(r=>r.status),[200,410]);assert.equal(contacts,1);
 assert.equal((await box.fetch(confirm())).status,410);
});
test('bad or expired tokens and globally opted-out contacts cannot subscribe',async(t)=>{
 const {box,store}=fixture();const token='b'.repeat(64);const record={email:'reader@example.com',tokenHash:await hash(token),expires:Date.now()+10000,sent:Date.now(),sendCount:1,confirmed:false};store.set('signup',record);
 let calls=0;t.mock.method(globalThis,'fetch',async()=>{calls++;return Response.json({id:'existing',unsubscribed:true});});
 const confirm=(token:string)=>new Request('https://mailbox/confirm',{method:'POST',body:JSON.stringify({token})});
 assert.equal((await box.fetch(confirm('c'.repeat(64)))).status,410);assert.equal(calls,0);
 assert.equal((await box.fetch(confirm(token))).status,409);assert.equal(calls,1);
 store.set('signup',{...record,expires:Date.now()-1});assert.equal((await box.fetch(confirm(token))).status,410);assert.equal(calls,1);
});
test('provider failure never claims success or consumes the confirmation',async(t)=>{
 const {box,store}=fixture();const token='d'.repeat(64);store.set('signup',{email:'reader@example.com',tokenHash:await hash(token),expires:Date.now()+10000,sent:Date.now(),sendCount:1,confirmed:false});
 t.mock.method(globalThis,'fetch',async()=>new Response(null,{status:500}));
 assert.equal((await box.fetch(new Request('https://mailbox/confirm',{method:'POST',body:JSON.stringify({token})}))).status,503);
 assert.equal((store.get('signup') as {confirmed:boolean}).confirmed,false);
});
