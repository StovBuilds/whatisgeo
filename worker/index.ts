import { ui } from '../src/data/content';

export interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  SITE_URL: string;
  RESEND_API_KEY?: string;
  RESEND_FROM?: string;
  RESEND_SEGMENT_ID?: string;
  RESEND_TOPIC_ID?: string;
  SIGNUP_LIMITER?: { limit(options: { key: string }): Promise<{ success: boolean }> };
  SIGNUPS?: DurableObjectNamespace;
}
type SignupRecord = { email: string; tokenHash: string; expires: number; sent: number; sendCount: number; confirmed: boolean };
const DAY = 86_400_000;
const json = (code: string, status = 200) => Response.json({ code }, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });
export function configured(env: Env) { return Boolean(env.RESEND_API_KEY && env.RESEND_FROM && env.RESEND_SEGMENT_ID && env.RESEND_TOPIC_ID && env.SIGNUPS && env.SIGNUP_LIMITER); }
export function normaliseEmail(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const email = value.trim().toLowerCase();
  if (email.length > 254 || !/^[a-z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/.test(email)) return null;
  const local = email.split('@')[0];
  return local.length > 64 || local.startsWith('.') || local.endsWith('.') || local.includes('..') ? null : email;
}
export async function hash(value: string) { return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value)))).map(x=>x.toString(16).padStart(2,'0')).join(''); }
function randomToken() { return Array.from(crypto.getRandomValues(new Uint8Array(32))).map(x=>x.toString(16).padStart(2,'0')).join(''); }
export async function readPayload(request: Request): Promise<Record<string, unknown>> {
  if (Number(request.headers.get('content-length') ?? 0) > 2048) throw new Error('too_large');
  const reader = request.body?.getReader();
  if (!reader) return {};
  const chunks: Uint8Array[] = []; let size = 0;
  while (true) { const chunk = await reader.read(); if (chunk.done) break; size += chunk.value.length; if (size > 2048) { await reader.cancel(); throw new Error('too_large'); } chunks.push(chunk.value); }
  const bytes = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk,offset); offset += chunk.length; }
  const text = new TextDecoder().decode(bytes);
  const type = request.headers.get('content-type')?.split(';')[0];
  if (type === 'application/x-www-form-urlencoded') return Object.fromEntries(new URLSearchParams(text));
  if (type !== 'application/json') throw new Error('invalid');
  const parsed: unknown = JSON.parse(text);
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('invalid');
  return parsed as Record<string, unknown>;
}
async function apiResponse(request: Request, response: Response) {
  if (!request.headers.get('content-type')?.startsWith('application/x-www-form-urlencoded')) return response;
  const data = await response.json() as { code: string };
  const message = data.code === 'pending' ? ui.pending : data.code === 'unavailable' ? ui.unavailable : data.code === 'invalid' ? 'Enter a valid email address and tick the consent box.' : ui.signupError;
  return new Response(`<!doctype html><html lang="en-GB"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="robots" content="noindex"><title>Email updates | What is GEO</title><main style="font:20px/1.7 system-ui;max-width:650px;margin:15vh auto;padding:24px"><h1>Email updates</h1><p>${message}</p><a href="/#updates">Back to the guide</a></main></html>`, { status: response.status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control':'no-store', 'X-Robots-Tag':'noindex' } });
}
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (!url.pathname.startsWith('/api/')) return env.ASSETS.fetch(request);
    if (url.pathname === '/api/status' && request.method === 'GET') return Response.json({ available: configured(env) }, { headers: { 'Cache-Control':'no-store' } });
    if (!['/api/subscribe','/api/confirm'].includes(url.pathname)) return json('not_found',404);
    if (request.method !== 'POST') return new Response(null,{status:405,headers:{Allow:'POST'}});
    const origin = request.headers.get('origin');
    if (!origin || origin !== new URL(env.SITE_URL).origin) return json('forbidden',403);
    if (!configured(env)) return apiResponse(request,json('unavailable',503));
    try {
      const limited = await env.SIGNUP_LIMITER!.limit({key:request.headers.get('CF-Connecting-IP') || 'local'});
      if (!limited.success) return apiResponse(request,json('rate_limited',429));
      let body: Record<string, unknown>;
      try { body = await readPayload(request); }
      catch (error) { return apiResponse(request,json('invalid',error instanceof Error && error.message === 'too_large' ? 413 : 400)); }
      if (url.pathname === '/api/subscribe') {
        if (body.company) return apiResponse(request,json('pending',202));
        const email = normaliseEmail(body.email);
        if (!email || (body.consent !== true && body.consent !== 'yes')) return apiResponse(request,json('invalid',400));
        const id = env.SIGNUPS!.idFromName(email);
        const response = await env.SIGNUPS!.get(id).fetch(new Request('https://mailbox/subscribe', {method:'POST',body:JSON.stringify({email,id:id.toString()})}));
        return apiResponse(request,response);
      }
      if (typeof body.token !== 'string' || !/^[a-f0-9]{64}\.[a-f0-9]{64}$/.test(body.token)) return json('expired',400);
      const [id, token] = body.token.split('.');
      return await env.SIGNUPS!.get(env.SIGNUPS!.idFromString(id)).fetch(new Request('https://mailbox/confirm', {method:'POST',body:JSON.stringify({token})}));
    } catch { return apiResponse(request,json('error',503)); }
  }
};

// Per-email storage serialises token consumption, so replaying a confirmation
// cannot opt someone back in after they have unsubscribed.
export class SignupMailbox {
  constructor(private state: DurableObjectState, private env: Env) {}
  async alarm() { await this.state.storage.deleteAll(); }
  async fetch(request: Request): Promise<Response> {
    return this.state.blockConcurrencyWhile(async () => {
      const body = await request.json() as { email?: string; id?: string; token?: string };
      const now = Date.now();
      const stored = await this.state.storage.get<SignupRecord>('signup');
      if (new URL(request.url).pathname === '/subscribe') {
        if (stored && stored.expires > now && (now-stored.sent < 300_000 || stored.sendCount >= 3)) return json('pending',202);
        const token = randomToken();
        const tokenHash = await hash(token);
        const link = `${this.env.SITE_URL}/confirm/#token=${body.id}.${token}`;
        const record: SignupRecord = { email:body.email!,tokenHash,expires:now+DAY,sent:now,sendCount:stored && stored.expires>now ? stored.sendCount+1 : 1,confirmed:false };
        await this.state.storage.put('signup',record);
        await this.state.storage.setAlarm(record.expires);
        try {
          await this.resend('/emails','POST',{from:this.env.RESEND_FROM,to:[record.email],subject:ui.confirmEmailSubject,text:`${ui.confirmEmailBody}\n\n${link}\n\nWhat is GEO\n${this.env.SITE_URL}/privacy/`,html:`<div style="font-family:Arial,sans-serif;line-height:1.7;max-width:560px;margin:auto;padding:30px"><h1>whatisgeo.</h1><p>${ui.confirmEmailBody}</p><p><a href="${link}">${ui.confirmEmailButton}</a></p><p><a href="${this.env.SITE_URL}/privacy/">Privacy</a></p></div>`},`confirmation-${tokenHash}`);
        } catch { if(stored) await this.state.storage.put('signup',stored); else await this.state.storage.delete('signup'); return json('error',503); }
        return json('pending',202);
      }
      if (!stored || stored.expires <= now || stored.confirmed || !body.token || await hash(body.token) !== stored.tokenHash) return json('expired',410);
      try {
        const existing = await this.resend(`/contacts/${encodeURIComponent(stored.email)}`,'GET',undefined,undefined,true) as {id?:string;unsubscribed?:boolean}|null;
        // Preserve global suppression across the owner's other publications.
        if (existing?.unsubscribed) return json('preferences',409);
        if (!existing) {
          await this.resend('/contacts','POST',{email:stored.email,unsubscribed:false,segments:[{id:this.env.RESEND_SEGMENT_ID}],topics:[{id:this.env.RESEND_TOPIC_ID,subscription:'opt_in'}]},`contact-${stored.tokenHash}`);
        } else {
          await this.resend(`/contacts/${existing.id}/segments/${this.env.RESEND_SEGMENT_ID}`,'POST',{},`segment-${stored.tokenHash}`);
          await this.resend(`/contacts/${existing.id}/topics`,'PATCH',[{id:this.env.RESEND_TOPIC_ID,subscription:'opt_in'}]);
        }
        await this.state.storage.put('signup',{...stored,confirmed:true});
        return json('confirmed');
      } catch { return json('error',503); }
    });
  }
  private async resend(path:string,method:string,body?:unknown,key?:string,allowMissing=false):Promise<unknown> {
    for(let attempt=0;attempt<3;attempt++) {
      const response = await fetch('https://api.resend.com'+path,{method,headers:{Authorization:`Bearer ${this.env.RESEND_API_KEY}`,'Content-Type':'application/json',...(key?{'Idempotency-Key':key}:{})},body:body===undefined?undefined:JSON.stringify(body),signal:AbortSignal.timeout(7000)});
      if (response.status===404 && allowMissing) return null;
      if(response.status===429 && attempt<2){await new Promise(resolve=>setTimeout(resolve,1000*(attempt+1)));continue;}
      if(!response.ok) throw new Error('email_provider_error');
      return response.status===204?null:response.json();
    }
    throw new Error('email_provider_error');
  }
}
