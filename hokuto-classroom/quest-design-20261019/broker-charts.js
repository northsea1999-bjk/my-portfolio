/* Display-only chart adapter. Does not calculate or change investment judgments. */
(()=>{'use strict';
const fmt=n=>n==null?'—':n.toLocaleString('ko-KR');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fixture=window.HokutoChartFixture;
const live=new Map();
const preferences=new Map();
let lastHomeStock='';
function settings(id,period){if(!preferences.has(id))preferences.set(id,{type:'candles',period:Number(period)||20,ma5:true,ma10:true,volume:true});return preferences.get(id);}
// Dates without prices are whitespace, never invented candles or zero prices.
function yearWindow(bars){
 const last=bars.at(-1).time,end=new Date(last+'T00:00:00Z');
 const priorYear=end.getUTCFullYear()-1,month=end.getUTCMonth(),day=Math.min(end.getUTCDate(),new Date(Date.UTC(priorYear,month+1,0)).getUTCDate());
 const start=new Date(Date.UTC(priorYear,month,day+1));
 const from=start.toISOString().slice(0,10),spaces=[];
 for(const day=new Date(start);day.toISOString().slice(0,10)<bars[0].time;day.setUTCDate(day.getUTCDate()+1))spaces.push({time:day.toISOString().slice(0,10)});
 return {from,to:last,spaces};
}
function markup(s,period='20'){
 if(!fixture[s.id]?.bars.length)return '<div class="chart-unavailable"><span aria-hidden="true">▧</span><strong>가격 자료가 아직 없습니다.</strong><p>자료가 들어오면 차트를 표시합니다. 빈 값을 0으로 그리지 않습니다.</p></div>';
 const c=settings(s.id,period);
 return `<section class="broker-chart" data-chart-stock="${esc(s.id)}" aria-label="${esc(s.name)} 가상 일봉 차트">
 <div class="chart-controls"><div class="chart-control-group" role="group" aria-label="차트 표시"><button data-chart-type="candles" aria-pressed="${c.type==='candles'}">캔들</button><button data-chart-type="line" aria-pressed="${c.type==='line'}">종가선</button></div><div class="chart-control-group" role="group" aria-label="차트 기간"><button data-chart-range="5" aria-pressed="${c.period===5}">5일</button><button data-chart-range="20" aria-pressed="${c.period===20}">20일</button><button data-chart-range="365" aria-pressed="${c.period===365}">1년</button></div><button class="chart-fit" data-chart-fit aria-label="차트 전체 맞춤">전체 맞춤</button><button class="chart-expand" data-chart-expand aria-pressed="false">크게 보기</button></div>
 <div class="chart-range-note" role="status" ${c.period===365?'':'hidden'}></div>
 <div class="chart-indicators"><span>일봉 · 엔</span><label class="ma5"><input type="checkbox" data-chart-indicator="ma5" ${c.ma5?'checked':''}>MA 5</label><label class="ma10"><input type="checkbox" data-chart-indicator="ma10" ${c.ma10?'checked':''}>MA 10</label><label><input type="checkbox" data-chart-indicator="volume" ${c.volume?'checked':''}>거래량</label><span class="chart-demo-label">가상 OHLCV</span></div>
 <div class="chart-quote" aria-live="off"></div><div class="broker-canvas" tabindex="0" role="group" aria-label="${esc(s.name)} 가격과 거래량. 좌우 화살표로 날짜 이동. 핀치 또는 휠로 확대."></div>
 <div class="chart-under"><div><button data-chart-step="-1" aria-label="이전 날짜 수치">←</button><button data-chart-step="1" aria-label="다음 날짜 수치">→</button><span>날짜별 수치</span></div><span>드래그 이동 · 휠/핀치 확대</span></div>
 <div class="chart-data-note">종가는 기존 시안과 동일합니다. 시가·고가·저가·거래량·일자는 디자인 검토용 가상 값입니다.</div>
 <details class="chart-data-table"><summary>일별 수치 보기</summary><div class="chart-table-scroll" tabindex="0" aria-label="일별 가상 가격과 거래량 표"><table><caption>${esc(s.name)} · 가상 OHLCV · 단위 엔 / 주</caption><thead><tr><th>날짜</th><th>시가</th><th>고가</th><th>저가</th><th>종가</th><th>거래량</th></tr></thead><tbody>${fixture[s.id].bars.map(d=>`<tr><th>${d.time.slice(5)}</th><td>${fmt(d.open)}</td><td>${fmt(d.high)}</td><td>${fmt(d.low)}</td><td>${fmt(d.close)}</td><td>${fmt(d.volume)}</td></tr>`).join('')}</tbody></table></div></details>
 <div class="chart-credit"><a href="https://www.tradingview.com/" target="_blank" rel="noopener">TradingView Lightweight Charts™</a><span>Copyright (с) 2025 TradingView, Inc.</span></div></section>`;
}
function average(bars,n){return bars.flatMap((d,i)=>i<n-1?[]:[{time:d.time,value:bars.slice(i-n+1,i+1).reduce((sum,x)=>sum+x.close,0)/n}]);}
function quote(el,d,settings){el.querySelector('.chart-quote').innerHTML=`<strong>${d.time.slice(5).replace('-','.')}</strong><span>시 <b>${fmt(d.open)}</b></span><span>고 <b>${fmt(d.high)}</b></span><span>저 <b>${fmt(d.low)}</b></span><span>종 <b class="${d.close>=d.open?'up':'down'}">${fmt(d.close)}</b></span><span class="quote-volume">량 <b>${fmt(d.volume)}</b></span>`;el.dataset.chartDate=d.time;}
function mountOne(el){
 const L=window.LightweightCharts,id=el.dataset.chartStock,bars=fixture[id].bars,c=settings(id),host=el.querySelector('.broker-canvas');
 if(!L){host.innerHTML='<p class="chart-load-error">차트를 불러오지 못했습니다. 아래 일별 수치 표에서 가격을 확인하세요.</p>';return;}
 const chart=L.createChart(host,{autoSize:true,layout:{background:{type:L.ColorType.Solid,color:'#ffffff'},textColor:'#52627a',fontSize:12,fontFamily:'Arial, sans-serif',attributionLogo:true,panes:{separatorColor:'#dce3ed',separatorHoverColor:'#b8c8dd',enableResize:true}},grid:{vertLines:{color:'#edf1f6'},horzLines:{color:'#edf1f6'}},crosshair:{mode:L.CrosshairMode.Normal,vertLine:{color:'#7586a0',width:1,style:2,labelBackgroundColor:'#243650'},horzLine:{color:'#7586a0',width:1,style:2,labelBackgroundColor:'#243650'}},rightPriceScale:{borderColor:'#dce3ed',minimumWidth:65,scaleMargins:{top:.13,bottom:.1}},timeScale:{lockVisibleTimeRangeOnResize:true,borderColor:'#dce3ed',rightOffset:1,barSpacing:21,minBarSpacing:4,timeVisible:false,secondsVisible:false,tickMarkFormatter:time=>typeof time==='object'?`${time.month}/${time.day}`:String(time).slice(5).replace('-','/')},localization:{locale:'ko-KR',priceFormatter:p=>fmt(Math.round(p))},handleScroll:{mouseWheel:false,pressedMouseMove:true,horzTouchDrag:true,vertTouchDrag:false},handleScale:{mouseWheel:true,pinch:true,axisPressedMouseMove:true}});
 const candle=chart.addSeries(L.CandlestickSeries,{upColor:'#d94a59',downColor:'#3579ca',borderVisible:false,wickUpColor:'#d94a59',wickDownColor:'#3579ca',priceFormat:{type:'price',precision:0,minMove:1},lastValueVisible:true,priceLineStyle:2});candle.setData(bars);
 const line=chart.addSeries(L.LineSeries,{color:'#2b63ae',lineWidth:2,visible:false,priceFormat:{type:'price',precision:0,minMove:1}});line.setData(bars.map(d=>({time:d.time,value:d.close})));
 const ma5=chart.addSeries(L.LineSeries,{color:'#1f8b77',lineWidth:2,priceLineVisible:false,lastValueVisible:false,crosshairMarkerVisible:false});ma5.setData(average(bars,5));
 const ma10=chart.addSeries(L.LineSeries,{color:'#b78327',lineWidth:2,priceLineVisible:false,lastValueVisible:false,crosshairMarkerVisible:false});ma10.setData(average(bars,10));
 const volume=chart.addSeries(L.HistogramSeries,{priceFormat:{type:'volume'},priceLineVisible:false,lastValueVisible:false},1);volume.setData(bars.map(d=>({time:d.time,value:d.volume,color:d.close>=d.open?'#e8a5ad':'#aac6e7'})));volume.priceScale().applyOptions({scaleMargins:{top:.15,bottom:0}});
 chart.panes()[1].setHeight(90);
 let index=bars.length-1;
 const update=()=>{candle.applyOptions({visible:c.type==='candles'});line.applyOptions({visible:c.type==='line'});ma5.applyOptions({visible:c.ma5});ma10.applyOptions({visible:c.ma10});volume.applyOptions({visible:c.volume});el.dataset.chartType=c.type;el.dataset.chartPeriod=c.period;el.querySelectorAll('[data-chart-type]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.chartType===c.type));el.querySelectorAll('[data-chart-range]').forEach(b=>b.setAttribute('aria-pressed',Number(b.dataset.chartRange)===c.period));};
 const year=yearWindow(bars);
 const fit=()=>{
   const annual=c.period===365,spaces=annual?year.spaces:[];
   candle.setData([...spaces,...bars]);line.setData([...spaces,...bars.map(d=>({time:d.time,value:d.close}))]);
   chart.timeScale().applyOptions({minBarSpacing:annual?.1:4,tickMarkFormatter:time=>{const t=typeof time==='object'?`${time.year}-${String(time.month).padStart(2,'0')}-${String(time.day).padStart(2,'0')}`:String(time);return annual?t.slice(0,7).replace('-','/'):t.slice(5).replace('-','/');}});
   if(annual)chart.timeScale().setVisibleRange({from:year.from,to:year.to});
   else chart.timeScale().setVisibleLogicalRange({from:bars.length-c.period-.6,to:bars.length+.2});
   const note=el.querySelector('.chart-range-note');note.hidden=!annual;
   note.innerHTML=annual?`<strong>1년 범위 · ${year.from} ~ ${year.to}</strong>현재 시안 자료: ${bars[0].time} ~ ${year.to}, ${bars.length}일. 앞선 빈 구간은 가격 자료가 없습니다.<button data-chart-range="20">보유한 20일 자료 확대</button>`:'';
   el.dataset.chartPeriod=c.period;el.dataset.rangeFrom=annual?year.from:bars[Math.max(0,bars.length-c.period)].time;el.dataset.rangeTo=year.to;
 };
 const select=(delta)=>{index=Math.min(bars.length-1,Math.max(0,index+delta));const d=bars[index];quote(el,d,c);chart.setCrosshairPosition(d.close,d.time,c.type==='candles'?candle:line);};
 chart.subscribeCrosshairMove(p=>{if(!p.time)return;const time=typeof p.time==='object'?`${p.time.year}-${String(p.time.month).padStart(2,'0')}-${String(p.time.day).padStart(2,'0')}`:String(p.time);const i=bars.findIndex(d=>d.time===time);if(i>=0){index=i;quote(el,bars[i],c);}});
 el.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
   if(b.dataset.chartType){c.type=b.dataset.chartType;update();}
   if(b.dataset.chartRange){c.period=Number(b.dataset.chartRange);update();fit();}
   if(b.hasAttribute('data-chart-fit'))fit();
   if(b.dataset.chartStep)select(Number(b.dataset.chartStep));
   if(b.hasAttribute('data-chart-expand')){const expanded=el.classList.toggle('expanded');el.setAttribute('role',expanded?'dialog':'region');if(expanded){el.setAttribute('aria-modal','true');}else{el.removeAttribute('aria-modal');}b.textContent=expanded?'원래 크기':'크게 보기';b.setAttribute('aria-pressed',expanded);document.body.classList.toggle('chart-expanded',expanded);requestAnimationFrame(()=>{chart.resize(host.clientWidth,host.clientHeight);chart.panes()[1].setHeight(expanded?120:90);fit();});}
 });
 el.addEventListener('change',e=>{if(e.target.dataset.chartIndicator){c[e.target.dataset.chartIndicator]=e.target.checked;update();}});
 host.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();select(e.key==='ArrowLeft'?-1:1);}});
 const observer=new ResizeObserver(()=>{if(host.clientWidth)chart.resize(host.clientWidth,host.clientHeight);});observer.observe(host);
 live.set(el,{chart,observer});quote(el,bars.at(-1),c);update();fit();el.dataset.chartReady='true';
}
function mount(){if(!document.querySelector('.broker-chart.expanded'))document.body.classList.remove('chart-expanded');for(const [el,x] of live){if(!el.isConnected){x.observer.disconnect();x.chart.remove();live.delete(el);}}document.querySelectorAll('.broker-chart').forEach(el=>{if(!live.has(el)&&el.getBoundingClientRect().width>0)mountOne(el);});}
function renderHome(stocks,state,onSelect){
 const host=document.querySelector('#home-chart');if(!host)return;
 host.hidden=state.view!=='home'||state.detail||!!state.query;
 if(host.hidden)return;
 const s=stocks.find(x=>x.id===state.stock)||stocks[0];
 if(lastHomeStock===s.id&&host.childElementCount){mount();return;}
 lastHomeStock=s.id;
 host.innerHTML=`<div class="desk-chart-head"><div class="chart-heading-label"><svg viewBox="0 0 32 32" aria-hidden="true"><use href="icons.svg#chart"></use></svg><div><span>CHART DESK</span><h2>가격 흐름을 자세히</h2></div></div><span class="desk-asof">10.16 종가 · 예시</span></div><div class="desk-stock-head"><div><label class="sr-only" for="chart-stock-select">차트 종목 선택</label><select id="chart-stock-select" aria-label="차트 종목 선택">${stocks.map(x=>`<option value="${esc(x.id)}" ${x.id===s.id?'selected':''}>${esc(x.name)}</option>`).join('')}</select><small>${esc(s.theme)} · ${esc(s.id)}</small></div><div class="desk-quote"><strong>${fmt(s.price)}${s.price==null?'':'<small>엔</small>'}</strong><span class="${s.change==null?'muted':s.change>0?'up':'down'}">${s.change==null?'자료 부족':(s.change>0?'+':'−')+Math.abs(s.change).toFixed(1)+'%'}<small> 전일 대비</small></span></div></div>${markup(s,state.period)}<button class="chart-analysis-link" data-stock="${esc(s.id)}">이 종목의 분석과 기록 보기 <span aria-hidden="true">→</span></button>`;
 host.querySelector('select').addEventListener('change',e=>onSelect(e.target.value));
}
document.addEventListener('keydown',e=>{
 const el=document.querySelector('.broker-chart.expanded');if(!el)return;
 if(e.key==='Escape'){e.preventDefault();el.querySelector('[data-chart-expand]').click();el.querySelector('[data-chart-expand]').focus();}
 if(e.key==='Tab'){
  const items=[...el.querySelectorAll('button,input,summary,a[href],[tabindex="0"]')].filter(x=>x.getClientRects().length);
  const first=items[0],last=items.at(-1);
  if(e.shiftKey&&(document.activeElement===first||!el.contains(document.activeElement))){e.preventDefault();last.focus();}
  else if(!e.shiftKey&&(document.activeElement===last||!el.contains(document.activeElement))){e.preventDefault();first.focus();}
 }
});
window.HokutoCharts={markup,mount,renderHome,yearWindow};
})();
