(()=>{'use strict';
const initial=new URLSearchParams(location.search).get('palette');
let palette=initial==='classic'?'classic':'quest';
try{if(!initial)palette=sessionStorage.getItem('hokuto-quest-palette')==='classic'?'classic':'quest';}catch{}
const apply=value=>{palette=value==='classic'?'classic':'quest';document.documentElement.dataset.palette=palette;try{sessionStorage.setItem('hokuto-quest-palette',palette);}catch{}};
apply(palette);
window.addEventListener('message',e=>{if(e.origin===location.origin&&e.source===window.parent&&e.data?.type==='hokuto-palette')apply(e.data.value);});
})();
