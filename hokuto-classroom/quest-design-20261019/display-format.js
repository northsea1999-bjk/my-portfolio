/* Shared presentation conventions; no price/return calculation. */
(function(root){'use strict';
  const locale='ko-KR';
  const colors={up:'#d94a59',down:'#3579ca',volumeUp:'#e8a5ad',volumeDown:'#aac6e7',textUp:'#b43c45',textDown:'#2c64a0'};
  const number=(n,digits)=>n==null?'—':Number(n).toLocaleString(locale,digits==null?{}:{minimumFractionDigits:digits,maximumFractionDigits:digits});
  const fixed=(n,digits)=>Number(n).toFixed(digits);
  const signed=(n,unit='%')=>n==null?'—':(n>0?'+':n<0?'−':'')+fixed(Math.abs(n),1)+unit;
  const date=(value,style='short')=>{
    if(value&&typeof value==='object'){if(style==='axis')return value.month+'/'+value.day;value=value.year+'-'+String(value.month).padStart(2,'0')+'-'+String(value.day).padStart(2,'0');}
    const s=String(value||'');if(!/^\d{4}-\d{2}-\d{2}$/.test(s))return s;
    if(style==='iso')return s;
    if(style==='month')return s.slice(0,7).replace('-','/');
    return s.slice(5).replace('-',style==='axis'?'/':style==='dash'?'-':'.');
  };
  const currency=(n,code='JPY')=>number(n)+' '+code;
  const api={locale,colors,number,fixed,signed,date,currency};
  if(typeof module==='object'&&module.exports)module.exports=api;else root.HokutoFormat=api;
  if(typeof document!=='undefined'){for(const [key,value] of Object.entries({'--up':colors.textUp,'--down':colors.textDown}))document.documentElement.style.setProperty(key,value);}
})(typeof window==='undefined'?{}:window);
