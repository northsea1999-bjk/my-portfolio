(()=>{'use strict';
const stocks=window.HokutoStockData,select=document.querySelector('#chart-choice');
select.innerHTML=stocks.map(s=>`<option value="${s.id}">${s.name}</option>`).join('');
const requested=new URLSearchParams(location.hash.slice(1)).get('stock');if(stocks.some(s=>s.id===requested))select.value=requested;
function draw(){const s=stocks.find(s=>s.id===select.value);document.querySelector('#chart-price').innerHTML=`<strong>${s.price==null?'자료 없음':s.price.toLocaleString('ko-KR')+' <small>엔</small>'}</strong><span class="${s.change>0?'up':s.change<0?'down':'muted'}">${s.change==null?'가격 확인 필요':(s.change>0?'+':'')+s.change.toFixed(1)+'% · 전일 대비'}</span>`;document.querySelector('#standalone-chart').innerHTML=window.HokutoCharts.markup(s,'20');window.HokutoCharts.mount();history.replaceState(null,'','#stock='+s.id);}
select.addEventListener('change',draw);draw();
})();
