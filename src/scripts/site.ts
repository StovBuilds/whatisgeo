import { ui } from '../data/content';
// Theme, menus, the file list and the reading marker live in src/scripts/linefile.ts.
const form=document.querySelector<HTMLFormElement>('.signup-form');
if(form){
 const button=form.querySelector<HTMLButtonElement>('button')!;
 const status=form.querySelector<HTMLElement>('.form-message')!;
 const message=(text:string,error=false)=>{status.textContent=text;status.dataset.state=error?'error':'success';};
 fetch('/api/status').then(r=>r.ok?r.json():null).then(data=>{if(data && !data.available){message(ui.unavailable);button.disabled=true;button.title=ui.unavailable;}}).catch(()=>{});
 form.addEventListener('submit',async event=>{event.preventDefault();if(!form.reportValidity())return;button.disabled=true;message('Sending your request…');try{const data=new FormData(form);const response=await fetch('/api/subscribe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:data.get('email'),consent:data.get('consent')==='yes',company:data.get('company')})});const result=await response.json();if(response.ok && result.code==='pending'){message(ui.signupSuccess);form.reset();dispatchEvent(new CustomEvent('wig:signup',{detail:'pending'}));}else{dispatchEvent(new CustomEvent('wig:signup',{detail:String(result.code||'error')}));message(result.code==='unavailable'?ui.unavailable:result.code==='rate_limited'?'A few too many attempts. Give it a minute, then try again.':result.code==='invalid'?'Enter a valid email address and tick the consent box.':ui.signupError,true);}}catch{message(ui.signupError,true);}finally{button.disabled=false;status.focus();}});
}
const confirmButton=document.querySelector<HTMLButtonElement>('#confirm-button');
if(confirmButton){
 const message=document.querySelector<HTMLElement>('#confirm-message')!;
 const token=new URLSearchParams(location.hash.slice(1)).get('token');
 if(token)history.replaceState(null,'',location.pathname);
 if(!token){message.textContent='This link is missing or has expired. Head back to the guide and request a fresh one.';confirmButton.hidden=true;}
 confirmButton.addEventListener('click',async()=>{confirmButton.disabled=true;try{const response=await fetch('/api/confirm',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token})});const data=await response.json();if(response.ok && data.code==='confirmed'){message.textContent="You’re confirmed. Future guides and course news will land in your inbox.";confirmButton.hidden=true;}else if(data.code==='expired'){message.textContent='This link has expired or has already been used. Head back to the guide to request a fresh one.';confirmButton.hidden=true;}else if(data.code==='preferences'){message.textContent='You previously opted out of all emails. Contact Adapt Progress Evolve to update your email preferences.';confirmButton.hidden=true;}else{message.textContent=data.code==='unavailable'?ui.unavailable:ui.signupError;confirmButton.disabled=false;}}catch{message.textContent=ui.signupError;confirmButton.disabled=false;}});
}
