import { ui } from '../data/content';
const themeButton = document.querySelector<HTMLButtonElement>('.theme-button');
function updateThemeButton() { const dark = document.documentElement.dataset.theme === 'dark'; themeButton?.setAttribute('aria-pressed', String(dark)); themeButton?.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} mode`); }
updateThemeButton();
themeButton?.addEventListener('click', () => { const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; document.documentElement.dataset.theme = theme; try { localStorage.setItem('wig-theme', theme); } catch {} updateThemeButton(); });

const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const band = document.querySelector<HTMLElement>('.statement-band');
const preview = document.querySelector<HTMLElement>('.answer-preview');
let ticking = false;
function onScroll() { if(ticking)return; ticking=true;requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-innerHeight;document.documentElement.style.setProperty('--reading-progress',`${max>0?scrollY/max*100:0}%`);if(!reduced.matches){band?.style.setProperty('--marquee-shift',`${-Math.min(scrollY*.12,240)}px`);if(preview)preview.style.transform=`translateY(${-Math.min(scrollY*.055,24)}px) rotate(${-2+Math.min(scrollY*.004,2)}deg)`;}else{band?.style.removeProperty('--marquee-shift');preview?.style.removeProperty('transform');}ticking=false;}); }
addEventListener('scroll',onScroll,{passive:true});reduced.addEventListener('change',onScroll);onScroll();
const tocLinks = [...document.querySelectorAll<HTMLAnchorElement>('.toc a[href^="#"]')];
if ('IntersectionObserver' in window) { const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){tocLinks.forEach(a=>a.setAttribute('aria-current',String(a.hash==='#'+entry.target.id)));}}},{rootMargin:'-10% 0px -65% 0px'});document.querySelectorAll('.chapter').forEach(section=>observer.observe(section)); }

const form=document.querySelector<HTMLFormElement>('.signup-form');
if(form){
 const button=form.querySelector<HTMLButtonElement>('button')!;
 const status=form.querySelector<HTMLElement>('.form-message')!;
 const message=(text:string,error=false)=>{status.textContent=text;status.dataset.state=error?'error':'success';};
 fetch('/api/status').then(r=>r.ok?r.json():null).then(data=>{if(data && !data.available){message(ui.unavailable);button.disabled=true;button.title=ui.unavailable;}}).catch(()=>{});
 form.addEventListener('submit',async event=>{event.preventDefault();if(!form.reportValidity())return;button.disabled=true;message('Sending your request…');try{const data=new FormData(form);const response=await fetch('/api/subscribe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:data.get('email'),consent:data.get('consent')==='yes',company:data.get('company')})});const result=await response.json();if(response.ok && result.code==='pending'){message(ui.signupSuccess);form.reset();}else{message(result.code==='unavailable'?ui.unavailable:result.code==='rate_limited'?'A few too many attempts. Give it a minute, then try again.':result.code==='invalid'?'Enter a valid email address and tick the consent box.':ui.signupError,true);}}catch{message(ui.signupError,true);}finally{button.disabled=false;status.focus();}});
}
const confirmButton=document.querySelector<HTMLButtonElement>('#confirm-button');
if(confirmButton){
 const message=document.querySelector<HTMLElement>('#confirm-message')!;
 const token=new URLSearchParams(location.hash.slice(1)).get('token');
 if(token)history.replaceState(null,'',location.pathname);
 if(!token){message.textContent='This link is missing or has expired. Head back to the guide and request a fresh one.';confirmButton.hidden=true;}
 confirmButton.addEventListener('click',async()=>{confirmButton.disabled=true;try{const response=await fetch('/api/confirm',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token})});const data=await response.json();if(response.ok && data.code==='confirmed'){message.textContent="You’re confirmed. Future guides and course news will land in your inbox.";confirmButton.hidden=true;}else if(data.code==='expired'){message.textContent='This link has expired or has already been used. Head back to the guide to request a fresh one.';confirmButton.hidden=true;}else if(data.code==='preferences'){message.textContent='You previously opted out of all emails. Contact Adapt Progress Evolve to update your email preferences.';confirmButton.hidden=true;}else{message.textContent=data.code==='unavailable'?ui.unavailable:ui.signupError;confirmButton.disabled=false;}}catch{message.textContent=ui.signupError;confirmButton.disabled=false;}});
}
