(()=>{'use strict';
const frame=document.querySelector('#home-frame'),select=document.querySelector('#palette-select');
const query=new URLSearchParams(location.search);select.value=query.get('palette')==='classic'?'classic':'quest';
const apply=()=>{frame.contentWindow.postMessage({type:'hokuto-palette',value:select.value},location.origin);const u=new URL(location.href);u.searchParams.set('palette',select.value);history.replaceState(null,'',u);};
frame.addEventListener('load',apply);select.addEventListener('change',apply);
document.querySelectorAll('[data-device]').forEach(button=>button.addEventListener('click',()=>{const mobile=button.dataset.device==='mobile';document.body.classList.toggle('mobile',mobile);document.querySelector('#width-control').hidden=!mobile;document.querySelectorAll('[data-device]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));}));
document.querySelector('#preview-width').addEventListener('change',e=>{const w=Number(e.target.value);if([360,390,430].includes(w))document.body.style.setProperty('--phone-width',w+'px');});
})();
