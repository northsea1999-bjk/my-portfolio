/* Static document strings and CSS text are resolved from the same catalog. */
(()=>{'use strict';
 const ui=window.HokutoText;
 function hydrate(scope=document){
  scope.querySelectorAll('[data-copy]').forEach(el=>{const value=ui.text(el.dataset.copy);if(el.textContent!==value)el.textContent=value;});
  scope.querySelectorAll('[data-copy-attrs]').forEach(el=>{const attrs=JSON.parse(el.dataset.copyAttrs);for(const [attr,key] of Object.entries(attrs))el.setAttribute(attr,ui.text(key));});
 }
 hydrate();
 for(const key of Object.keys(ui.entries).filter(k=>k.startsWith('html_')))document.documentElement.style.setProperty('--'+key,JSON.stringify(ui.text(key)));
 window.HokutoCopyHydrate=hydrate;
})();
