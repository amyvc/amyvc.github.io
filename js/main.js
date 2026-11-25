const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('#navigation');const mobile=window.matchMedia('(max-width:850px)');function sync(){nav.hidden=mobile.matches;toggle.setAttribute('aria-expanded',String(!nav.hidden));}if(toggle&&nav){sync();mobile.addEventListener('change',sync);toggle.addEventListener('click',()=>{nav.hidden=!nav.hidden;toggle.setAttribute('aria-expanded',String(!nav.hidden));});}
if(toggle&&nav){nav.addEventListener('click',event=>{if(!mobile.matches)return;const link=event.target.closest('a');if(!link)return;nav.hidden=true;toggle.setAttribute('aria-expanded','false');if(link.matches('a[href*="#beyond-work"]'))document.querySelector('#beyond-work')?.focus({preventScroll:true});});}

function initTestimonials(){document.querySelectorAll('.testimonial-slider').forEach(slider=>{const slides=[...slider.querySelectorAll('[data-slide]')],dots=[...slider.querySelectorAll('[data-dot]')],controls=slider.querySelector('.testimonial-controls'),status=slider.querySelector('.testimonial-status');if(!slides.length)return;let index=0;function show(i){index=(i+slides.length)%slides.length;slides.forEach((s,j)=>s.hidden=j!==index);dots.forEach((d,j)=>{if(j===index)d.setAttribute('aria-current','true');else d.removeAttribute('aria-current');});status.textContent=(index+1)+' / '+slides.length;}controls.hidden=slides.length<2;status.hidden=false;slider.querySelector('[data-prev]').addEventListener('click',()=>show(index-1));slider.querySelector('[data-next]').addEventListener('click',()=>show(index+1));dots.forEach((d,j)=>d.addEventListener('click',()=>show(j)));slider.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();show(index+(e.key==='ArrowRight'?1:-1));}});show(Math.floor(Math.random()*slides.length));});}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initTestimonials);else initTestimonials();

function initContact(){const button=document.querySelector('.copy-email'),address=document.querySelector('#contact-address'),status=document.querySelector('.copy-status');if(!button||!address||!status)return;button.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(address.textContent.trim());status.textContent='Copied!';}catch{status.textContent='Please select and copy the email address.';}});}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initContact);else initContact();

function initTheme(){const button=document.querySelector('.theme-toggle'),root=document.documentElement;if(!button)return;function sync(){const light=root.dataset.theme==='light';const label=light?'Switch to dark mode':'Switch to light mode';button.setAttribute('aria-label',label);button.title=label;}sync();button.addEventListener('click',()=>{const next=root.dataset.theme==='light'?'dark':'light';root.dataset.theme=next;try{localStorage.setItem('amrutha-theme',next);}catch(e){}sync();});}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initTheme);else initTheme();

/* Beyond Work: progressive, accessible scroll storytelling. */
function initBeyondStory(){
 const page=document.querySelector('.beyond-page');
 if(!page||!('IntersectionObserver' in window))return;
 const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
 if(motion.matches)return;
 const targets=[...page.querySelectorAll(':scope > .eyebrow, :scope > h1, .beyond-section > .eyebrow, .beyond-section > h2, .travel-intro, .travel-stats > div, .beyond-section > .button, .volunteer-item, .beyond-section > p:not(.eyebrow)')];
 let observer;
 const frames=new Map();
 function count(el){
  const numbers=[...el.querySelectorAll('[data-story-count]')];
  numbers.forEach(number=>{
   if(number.dataset.counted)return;
   const label=number.textContent.trim(),match=label.match(/^(\d+)(\+?)$/);
   if(!match)return;
   const total=Number(match[1]),suffix=match[2];
   if(total<1)return;
   number.dataset.counted='true';
   number.setAttribute('aria-label',label);
   const start=performance.now();
   function tick(now){
    if(motion.matches){number.textContent=label;frames.delete(number);return;}
    const t=Math.min(1,(now-start)/950);
    number.textContent=String(Math.round(total*(1-Math.pow(1-t,3))))+suffix;
    if(t<1)frames.set(number,requestAnimationFrame(tick));else{number.textContent=label;frames.delete(number);}
   }
   frames.set(number,requestAnimationFrame(tick));
  });
 }
 function reveal(el){
  el.classList.remove('story-pending');
  el.classList.add('story-revealed');
  observer.unobserve(el);
  count(el);
 }
 observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting)reveal(entry.target);});
 },{threshold:0,rootMargin:'0px 0px -32px 0px'});
 targets.forEach(el=>{
  const r=el.getBoundingClientRect();
  if(r.top>=window.innerHeight){el.classList.add('story-pending');}
  if(el.matches('.volunteer-item,.travel-stats > div')){
   const i=[...el.parentElement.children].indexOf(el);
   el.style.setProperty('--story-delay',((i%2)*90)+'ms');
  }
  observer.observe(el);
 });
 function restore(){
  observer.disconnect();
  targets.forEach(el=>el.classList.remove('story-pending','story-revealed'));
  frames.forEach((id,number)=>{cancelAnimationFrame(id);number.textContent=number.getAttribute('aria-label');});
  frames.clear();
 }
 motion.addEventListener('change',e=>{if(e.matches)restore();});
 page.addEventListener('focusin',e=>{const el=e.target.closest('.story-pending');if(el)reveal(el);});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initBeyondStory);else initBeyondStory();

/* About: page-specific progress and progressive section reveals. */
function initAboutEditorial(){
 const page=document.querySelector('.about-page');if(!page)return;
 const progress=document.querySelector('.about-reading-progress span');
 let frame=0;
 function update(){frame=0;const max=document.documentElement.scrollHeight-window.innerHeight;const ratio=max>0?Math.max(0,Math.min(1,window.scrollY/max)):0;if(progress)progress.style.transform='scaleX('+ratio+')';}
 function schedule(){if(!frame)frame=requestAnimationFrame(update);}
 window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);schedule();
 const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
 if(motion.matches||!('IntersectionObserver' in window))return;
 const targets=[...page.querySelectorAll('[data-about-reveal]')];
 const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;entry.target.classList.remove('about-reveal-pending');entry.target.classList.add('about-reveal-visible');observer.unobserve(entry.target);});},{threshold:0});
 targets.forEach(el=>{if(el.getBoundingClientRect().top>=window.innerHeight){el.classList.add('about-reveal-pending');observer.observe(el);}});
 motion.addEventListener('change',e=>{if(e.matches){observer.disconnect();targets.forEach(el=>el.classList.remove('about-reveal-pending','about-reveal-visible'));}});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initAboutEditorial);else initAboutEditorial();

/* Skills: accessible category filtering. */
function initSkillLenses(){
 const page=document.querySelector('.skills-page');if(!page)return;
 const controls=page.querySelector('.skill-lenses'),status=page.querySelector('.skill-lens-status'),buttons=[...page.querySelectorAll('[data-skill-lens]')],cards=[...page.querySelectorAll('[data-skill-group]')];
 if(!controls||!buttons.length||!cards.length)return;
 controls.hidden=false;
 function select(lens){
  buttons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.skillLens===lens)));
  let matched=0;
  cards.forEach(card=>{const match=lens==='all'||card.dataset.skillGroup.split(' ').includes(lens);card.hidden=!match;if(match)matched++;});
  if(status)status.textContent=matched+' of '+cards.length+' skill categories displayed.';
 }
 buttons.forEach(button=>button.addEventListener('click',()=>select(button.dataset.skillLens)));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initSkillLenses);else initSkillLenses();

function initPortfolioCaseStudies(){
 const page=document.querySelector('.portfolio-page');
 if(!page)return;
 const dialog=page.querySelector('#portfolio-case-dialog');
 if(!dialog)return;
 const content=dialog.querySelector('[data-portfolio-dialog-content]'),closeButton=dialog.querySelector('[data-portfolio-dialog-close]');
 const templates=new Map([...page.querySelectorAll('template[data-case-study]')].map(template=>[template.dataset.caseStudy,template]));
 if(!content||!closeButton||!templates.size)return;
 let activeTrigger=null;
 function open(trigger){
  const template=templates.get(trigger.dataset.caseStudyTrigger);
  if(!template)return;
  activeTrigger=trigger;
  content.replaceChildren(template.content.cloneNode(true));
  dialog.showModal();
  document.documentElement.classList.add('portfolio-dialog-open');
  document.body.classList.add('portfolio-dialog-open');
  closeButton.focus();
 }
 function close(){if(dialog.open)dialog.close();}
 page.addEventListener('click',event=>{
  const trigger=event.target.closest('[data-case-study-trigger]');
  if(!trigger)return;
  event.preventDefault();
  open(trigger);
 });
 closeButton.addEventListener('click',close);
 dialog.addEventListener('click',event=>{if(event.target===dialog)close();});
 dialog.addEventListener('close',()=>{
  document.documentElement.classList.remove('portfolio-dialog-open');
  document.body.classList.remove('portfolio-dialog-open');
  content.replaceChildren();
  if(activeTrigger?.isConnected)activeTrigger.focus();
  activeTrigger=null;
 });
 const slug=window.location.hash.slice(1);
 const initialTrigger=[...page.querySelectorAll('[data-case-study-trigger]')].find(trigger=>trigger.id===slug);
 if(initialTrigger)open(initialTrigger);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initPortfolioCaseStudies);else initPortfolioCaseStudies();
