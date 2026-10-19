/* Public design fixture only. No private endpoints, live prices, account data or model calls. */
(() => {
  'use strict';
  const icons = {
    home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/>',
    wallet:'<rect x="3" y="6" width="18" height="14" rx="3"/><path d="M4 6V4h14v2m3 5h-5v5h5"/><path d="M17.5 13.5h.1"/>',
    compass:'<circle cx="12" cy="12" r="9"/><path d="m16 8-2.5 5.5L8 16l2.5-5.5Z"/>',
    chart:'<path d="M4 3v18h17M8 16l4-5 4 2 5-7"/>',
    grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    book:'<path d="M12 5c-3-2-6-2-9-1v15c3-1 6-1 9 1 3-2 6-2 9-1V4c-3-1-6-1-9 1Zm0 0v15"/>',
    file:'<path d="M14 3H5v18h14V8Zm0 0v5h5M8 12h8M8 16h6"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v6l4 2"/>'
  };
  const icon = name => `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${icons[name] || icons.file}</svg>`;
  const record = (date, price, status, summary, next, input, change, axes) => ({
    date, price, status, summary, next, input, change, axes,
    savedAt: `${date} 17:45`, inputAt: `${date} 15:00`,
    source: '가상 회사 발표 · 화면 동작을 위한 예시 문서'
  });
  const stocks = [
    {
      id:'DEMO-A',name:'호쿠토 반도체',short:'호',theme:'반도체 장비·검사',group:'held',badge:'주의',tone:'amber',decision:'결정실 미입력',timing:'보유 점검',price:8240,change:2.1,order:7,changed:true,update:'수주 발표 · 실적 전망은 확인 필요',color:'#e7f0ed',ink:'#648777',
      chart:[7600,7670,7550,7820,7760,7860,7790,7930,7880,8030,7960,8100,8050,7980,8090,8030,8140,8070,8070,8240],
      records:[
        record('2026-09-08',7643,'매수대상','기존 수주잔고를 확인했습니다. 새 계약이나 실적 전망 변경은 아직 없습니다.','다음 수주 발표에서 신규 계약과 납기 변화를 확인합니다.','수주잔고는 직전 분기 대비 8% 늘었다. 연간 이익 전망은 기존 수준을 유지한다.','첫 보존 기록입니다. 이전 기록은 없습니다.',['시장행동: 25일선 위','실적: 연간 전망 유지','촉매: 새로운 직접 사건 없음','반대근거: 신규 계약 규모 미확인']),
        record('2026-10-13',8070,'주의','추가 수주 논의가 알려졌지만 계약 체결과 금액은 확인되지 않았습니다.','회사 발표에서 계약 체결 여부와 금액을 확인합니다.','고객사와 신규 장비 공급을 협의 중이다. 계약 금액과 납기는 확정하지 않았다.','새 수주 가능성이 추가됐습니다. 아직 확정 계약으로 해석할 수 없습니다.',['시장행동: 25일선 위','실적: 새 전망 없음','촉매: 수주 협의 단계','반대근거: 금액·납기 미확정']),
        record('2026-10-16',8240,'주의','장비 공급 계약은 확인됐습니다. 이익 증가로 이어지는지는 다음 실적 설명에서 확인해야 합니다.','계약의 매출 반영 시점과 회사의 이익 전망 변경 여부를 확인합니다.','장비 공급 계약 42억 엔을 체결했다. 납품은 다음 회계연도에 시작한다. 연간 이익 전망의 변경 여부는 이번 발표에 포함하지 않았다.','계약 미확인 → 계약 체결 확인. 이익 전망은 여전히 미확인입니다.',['시장행동: 25일선 위','실적: 전망 변경 미확인','촉매: 공급 계약 확인','반대근거: 이익 기여 규모 미확인'])
      ],
      evaluation:{recordDate:'2026-09-08',start:'2026-09-09',end:'2026-10-09',stock:7.8,theme:4.2,market:2.1}
    },
    {
      id:'DEMO-B',name:'아오이 게임즈',short:'아',theme:'게임',group:'held',badge:'주의',tone:'amber',decision:'결정실 미입력',timing:'보유 점검',price:5860,change:-1.4,order:6,changed:true,update:'이익 전망 하향 · 다음 설명 확인',color:'#f1eaf4',ink:'#9a78a8',
      chart:[6240,6180,6260,6150,6220,6110,6140,6060,6110,6010,6070,5950,6030,5980,5990,5900,5980,5900,5943,5860],
      records:[
        record('2026-09-08',6004,'매수대상','회사의 이익 전망은 유지됐습니다. 신작 판매가 전망을 뒷받침하는지 관찰합니다.','분기 판매 수량을 확인합니다.','연간 영업이익 전망은 120억 엔이다. 다음 분기에 신작 2종을 출시할 계획이다.','첫 보존 기록입니다.',['시장행동: 중기 추세 유지','실적: 전망 유지','촉매: 신작 출시 예정','반대근거: 판매 실적 미확인']),
        record('2026-10-13',5943,'정상','신작 출시 일정은 유지됐습니다. 판매 수량은 아직 발표되지 않았습니다.','회사 실적 설명에서 판매 수량을 확인합니다.','신작 2종의 출시 일정을 유지한다. 판매 수량은 분기 실적 설명에서 공개할 예정이다.','출시 일정 유지 확인. 실적 추정치를 새로 올리지 않았습니다.',['시장행동: 추세 보통','실적: 기존 전망 유지','촉매: 출시 일정 유지','반대근거: 판매 수량 미공개']),
        record('2026-10-16',5860,'주의','회사가 이익 전망을 낮췄습니다. 판매 감소와 비용 증가 중 어떤 원인이 큰지 추가 설명이 필요합니다.','하향 사유와 신작 판매 수량을 다음 회사 설명에서 확인합니다.','연간 영업이익 전망을 120억 엔에서 108억 엔으로 낮춘다. 원인별 영향은 후속 실적 설명에서 공개한다.','이익 전망 유지 → 10% 하향. 보유 점검의 실적 경고가 새로 생겼습니다.',['시장행동: 25일선 아래','실적: 이익 전망 하향','촉매: 전망 수정 발표','반대근거: 하향 원인 미공개'])
      ],
      evaluation:{recordDate:'2026-09-08',start:'2026-09-09',end:'2026-10-09',stock:-2.4,theme:1.8,market:2.1}
    },
    {
      id:'DEMO-C',name:'미나토 중공업',short:'미',theme:'방산',group:'held',badge:'정상',tone:'teal',decision:'결정실 미입력',timing:'보유 점검',price:3420,change:.9,order:2,changed:false,update:'새로운 중요 변화 없음',color:'#eaf0fa',ink:'#6d8bbb',
      chart:[3190,3230,3200,3270,3240,3310,3280,3320,3300,3290,3350,3310,3360,3340,3370,3350,3400,3390,3390,3420],
      records:[
        record('2026-10-13',3390,'정상','기존 납품 일정을 유지하고 있습니다. 새 수주로 계산할 직접 발표는 없습니다.','예정된 납품 완료 발표를 확인합니다.','기존 계약의 납품 일정은 계획대로 진행 중이다. 신규 계약에 관한 발표는 없다.','첫 보존 기록입니다.',['시장행동: 중기 추세 유지','실적: 전망 유지','촉매: 새 직접 사건 없음','반대근거: 추가 수주 미확인']),
        record('2026-10-16',3420,'정상','기존 납품 일정이 유지됐습니다. 이번 자료에서는 보유 점검을 바꿀 새 사실을 찾지 못했습니다.','예정된 납품 완료 발표를 확인합니다.','기존 계약의 납품은 계획대로 진행 중이다. 연간 전망의 변경은 없다.','기존 납품 일정과 전망 유지. 판단 변화는 없습니다.',['시장행동: 중기 추세 유지','실적: 전망 유지','촉매: 새 직접 사건 없음','반대근거: 추가 수주 미확인'])
      ]
    },
    {
      id:'DEMO-D',name:'하루카 전자',short:'하',theme:'전자부품',group:'held',badge:'정상',tone:'teal',decision:'매수대상',timing:'보유 점검',price:4725,change:-.3,order:1,changed:false,update:'가격 갱신 · 보유 판단 유지',color:'#f8eedf',ink:'#b09665',
      chart:[4590,4560,4630,4600,4680,4640,4710,4670,4700,4720,4690,4760,4720,4700,4750,4710,4770,4750,4739,4725],
      records:[
        record('2026-10-13',4739,'정상','생산 계획과 실적 전망이 유지됐습니다. 보유 점검에서 새 경고는 없습니다.','다음 생산 계획의 변경 여부를 확인합니다.','분기 생산 계획과 연간 전망을 유지한다. 추가 증설 계획은 확정하지 않았다.','첫 보존 기록입니다.',['시장행동: 25일선 위','실적: 전망 유지','촉매: 계획 유지','반대근거: 증설 미확정']),
        record('2026-10-16',4725,'정상','가격은 소폭 내렸지만 보유 점검의 근거는 바뀌지 않았습니다. 가격 등락과 분석 판단을 나눠 봅니다.','다음 생산 계획의 변경 여부를 확인합니다.','분기 생산 계획과 연간 전망은 이전 발표와 같다. 추가 증설 여부는 아직 결정하지 않았다.','가격만 갱신됐습니다. 기존 판단과 다음 확인은 유지합니다.',['시장행동: 25일선 위','실적: 전망 유지','촉매: 새 직접 사건 없음','반대근거: 증설 미확정'])
      ]
    },
    {
      id:'DEMO-E',name:'세이운 소프트',short:'세',theme:'AI 소프트웨어',group:'candidate',badge:'매수대상',tone:'teal',decision:'매수대상',timing:'신호 없음 · 가격 확인 필요',price:6130,change:3.2,order:5,changed:true,update:'신규 후보 · 실적·시장 흐름 확인',color:'#e8effc',ink:'#688bc6',
      chart:[5330,5410,5350,5480,5440,5530,5490,5560,5610,5530,5650,5620,5730,5680,5810,5770,5880,5820,5940,6130],
      records:[
        record('2026-10-13',5940,'보류','계약 증가가 언급됐지만 실적 전망의 변경 여부는 확인되지 않았습니다.','회사 실적 전망과 종목의 가격 흐름을 함께 확인합니다.','법인 계약 건수가 전년 대비 15% 늘었다. 연간 실적 전망은 재검토 중이다.','첫 보존 기록입니다.',['시장행동: 추세 개선 중','실적: 전망 재검토 중','촉매: 계약 증가 발표','반대근거: 이익 전망 미확정']),
        record('2026-10-16',6130,'매수대상','회사 전망 상향과 가격 흐름 개선이 함께 확인돼 후보에 들어왔습니다. 진입 시점은 별도로 확인해야 합니다.','다음 가격 확인에서 기존 회복·돌파 조건의 충족 여부를 확인합니다.','법인 계약 증가를 반영해 연간 영업이익 전망을 60억 엔에서 66억 엔으로 높인다.','보류 → 매수대상. 실적 전망 상향이 추가됐지만 타이밍 신호는 없습니다.',['시장행동: 중기 추세 개선','실적: 이익 전망 10% 상향','촉매: 회사 전망 수정','반대근거: 진입 가격 미확인'])
      ]
    },
    {
      id:'DEMO-F',name:'키타 전력설비',short:'키',theme:'전력망',group:'candidate',badge:'보류',tone:'gray',decision:'보류',timing:'판정 보류',price:2980,change:-.6,order:3,changed:true,update:'업종 기사만 확인 · 직접 계약은 없음',color:'#eaf1e3',ink:'#8ca571',
      chart:[3020,3050,2990,3030,2980,3010,2970,3000,3040,3010,3020,2970,2980,3020,3000,2960,2990,3010,2998,2980],
      records:[
        record('2026-10-13',2998,'보류','전력망 투자가 늘어난다는 업종 기사만 있습니다. 이 회사의 계약으로 연결할 근거는 없습니다.','회사 이름과 계약 내용이 함께 확인되는 직접 자료를 기다립니다.','전력망 관련 설비 투자가 확대될 전망이다. 해당 기사는 특정 회사의 수주를 밝히지 않았다.','첫 보존 기록입니다.',['시장행동: 추세 보통','실적: 새 전망 없음','촉매: 업종 참고 기사','반대근거: 회사 직접 연결 없음']),
        record('2026-10-16',2980,'보류','업종 투자 소식은 이어졌지만 이 회사의 수주는 확인되지 않았습니다. 기존 보류를 유지합니다.','회사 이름과 계약 내용이 함께 확인되는 직접 자료를 기다립니다.','전력 설비 투자 계획이 추가 발표됐다. 공급 회사와 계약 금액은 공개하지 않았다.','기사 추가, 회사 직접 연결 없음. 보류 판단은 같습니다.',['시장행동: 추세 보통','실적: 새 전망 없음','촉매: 업종 참고 기사','반대근거: 회사 직접 연결 없음'])
      ]
    },
    {
      id:'DEMO-G',name:'유키 메디컬',short:'유',theme:'의약품',group:'candidate',badge:'자료 부족',tone:'gray',decision:'미입력',timing:'가격 확인 불가',price:null,change:null,order:4,changed:false,update:'가격·실적 자료를 아직 확인하지 못함',color:'#f5e9eb',ink:'#bb8e99',chart:[],
      records:[record('2026-10-16',null,'미입력','가격과 실적 자료가 부족해 판정을 표시하지 않습니다. 제외나 안전으로 해석할 수 없습니다.','가격 자료와 회사의 최신 실적 전망이 확보된 뒤 확인합니다.','분석에 필요한 가격과 최신 실적 전망 자료를 확보하지 못했다.','첫 보존 기록입니다. 비교할 이전 자료가 없습니다.',['시장행동: 자료 부족','실적: 자료 부족','촉매: 분석 미완료','반대근거: 판단 불가'])]
    }
  ];
  const signed = (n, unit='%') => n == null ? '확인 필요' : `${n > 0 ? '+' : n < 0 ? '−' : ''}${Math.abs(n).toFixed(1)}${unit}`;
  const priceText = n => n == null ? '확인 필요' : n.toLocaleString('ko-KR');
  const latest = s => s.records[s.records.length-1];
  const scoreDifference = (s,b='theme') => s.evaluation ? Math.round((s.evaluation.stock-s.evaluation[b])*10)/10 : null;
  if (typeof document === 'undefined') { if(typeof module!=='undefined') module.exports={stocks,latest,scoreDifference}; return; }
  const $ = (s, el=document) => el.querySelector(s);
  const $$ = (s, el=document) => [...el.querySelectorAll(s)];
  const esc = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const colorClass = n => n == null || n===0 ? 'muted' : n>0 ? 'up':'down';
  const selectedStock = () => stocks.find(s=>s.id===state.stock) || stocks[0];
  const badge = (text,tone='gray') => `<span class="pill ${tone}">${esc(text)}</span>`;
  const decisionLabel = s => s.decision.startsWith('결정실 ')?s.decision:'결정실 '+s.decision;
  const statusChips = s => s.group==='held'?`<span class="status-pair" role="group" aria-label="보유 점검과 결정실 판정">${badge('보유 점검 '+s.badge,s.tone)}${badge(decisionLabel(s),'gray')}</span>`:badge(s.badge,s.tone);
  const avatar = s => `<span class="stock-avatar" style="--avatar-bg:${s.color};--avatar-ink:${s.ink}">${s.short}</span>`;
  let state;
  let returnFocus;
  let listScroll=0;
  let originContext=history.state?.hokutoOrigin||null;
  let renderedHash='';
  if('scrollRestoration' in history)history.scrollRestoration='manual';
  const rooms=window.HokutoRooms.create({stocks,latest,esc,icon,badge,statusChips,avatar,signed,priceText,colorClass,route,selectStock,openDialog,bigChart,getState:()=>state,refresh:()=>render(),returnToOrigin});
  function readState(){
    const p=new URLSearchParams(location.hash.slice(1));
    const view=['home','scores','menu','room'].includes(p.get('view'))?p.get('view'):'home';
    const stock=stocks.some(s=>s.id===p.get('stock'))?p.get('stock'):'DEMO-B';
    const room=rooms.resolve(p.get('room')),from=rooms.resolve(p.get('from'));
    return {view,stock,filter:['all','held','candidate'].includes(p.get('filter'))?p.get('filter'):'all',tab:['overview','history','score'].includes(p.get('tab'))?p.get('tab'):'overview',date:p.get('date')||'',detail:p.get('detail')==='1',query:p.get('q')||'',sort:['change','name','return'].includes(p.get('sort'))?p.get('sort'):'change',benchmark:p.get('benchmark')==='market'?'market':'theme',round:p.get('round')==='past'?'past':'current',period:p.get('period')==='5'?'5':'20',room:rooms.catalog.some(m=>m.id===room)?room:'news',section:p.get('section')||'all',topic:p.get('topic')||'chip',item:p.get('item')||'',flowTopic:p.get('flowTopic')||'',menuQuery:p.get('menuQuery')||'',newsQuery:p.get('newsQuery')||'',newsCountry:p.get('newsCountry')||'all',newsMode:p.get('newsMode')==='analysis'?'analysis':'titles',headlinesExpanded:p.get('headlinesExpanded')==='true',from:rooms.catalog.some(m=>m.id===from)?from:''};
  }
  function route(patch,replace=false){
    const scroll=window.scrollY,previousView=state.view;
    const previousMeta=history.state||{hokutoIndex:0};
    history.replaceState({...previousMeta,hokutoScroll:scroll,hokutoOrigin:originContext},'',location.href);
    state={...state,...patch};
    if(patch.from===''&&!patch.detail)originContext=null;
    if(patch.filter && state.filter!=='all' && selectedStock().group!==state.filter){state.stock=stocks.filter(s=>s.group===state.filter).sort((a,b)=>b.order-a.order)[0].id;state.tab='overview';state.date='';}
    const p=new URLSearchParams();
    for(const [k,v] of Object.entries(state))if(v!=='' && v!==false)p.set(k==='query'?'q':k,k==='detail'?'1':v);
    const same=location.hash.slice(1)===p.toString();
    const keepScroll=replace||(patch.view===undefined&&patch.room===undefined)||(state.view==='home'&&previousView==='home'&&!patch.from);
    const meta={hokutoIndex:(previousMeta.hokutoIndex||0)+(replace||same?0:1),hokutoScroll:keepScroll?scroll:0,hokutoOrigin:originContext};
    history[replace||same?'replaceState':'pushState'](meta,'',`#${p}`);
    render();
    if(!keepScroll)window.scrollTo({top:0});
  }
  function returnToOrigin(){
    const origin=history.state?.hokutoOrigin||originContext;
    if(origin){originContext=null;route({...origin.state});requestAnimationFrame(()=>window.scrollTo({top:origin.scroll||0}));return;}
    if(state.from==='scores'){route({view:'scores',detail:false,from:''});return;}
    if(state.from){route({view:'room',room:state.from,detail:false,from:''});return;}
    route({view:'home',detail:false,from:''});requestAnimationFrame(()=>window.scrollTo({top:listScroll}));
  }
  function goBack(){
    if((history.state?.hokutoIndex||0)>0){history.back();return;}
    if(state.from){returnToOrigin();return;}
    route({view:state.view==='menu'?'home':'menu',detail:false,from:''});
  }
  function locationChanged(){
    if(location.hash===renderedHash)return;
    if($('#evidence-dialog').open)$('#evidence-dialog').close();
    state=readState();originContext=history.state?.hokutoOrigin||null;render();
    requestAnimationFrame(()=>window.scrollTo({top:history.state?.hokutoScroll||0}));
  }
  function chartPath(values,width,height,pad=6){
    if(!values.length)return '';
    const min=Math.min(...values),max=Math.max(...values),range=max-min||1;
    return values.map((n,i)=>`${i?'L':'M'}${(pad+i*(width-pad*2)/Math.max(1,values.length-1)).toFixed(1)},${(height-pad-(n-min)/range*(height-pad*2)).toFixed(1)}`).join(' ');
  }
  function spark(s){
    if(!s.chart.length)return '<span class="spark muted" aria-hidden="true">—</span>';
    const col=s.chart.at(-1)>=s.chart[0]?'#90b9a6':'#9cb7d1';
    return `<svg class="spark" viewBox="0 0 72 35" aria-label="${esc(s.name)} 최근 20거래일 가상 가격 흐름"><path d="${chartPath(s.chart,72,35,3)}" fill="none" stroke="${col}" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/></svg>`;
  }
  function bigChart(s,fillId='chart-fill'){
    if(window.HokutoCharts)return window.HokutoCharts.markup(s,state.period);
    if(!s.chart.length)return '<div class="chart-empty">가격 자료를 확인하지 못했습니다.</div>';
    const values=state.period==='5'?s.chart.slice(-5):s.chart;
    const path=chartPath(values,420,135,8);
    return `<div class="chart-head"><span>종가 흐름 · 가상 가격</span><div class="chart-periods" role="group" aria-label="차트 기간"><button data-period="5" aria-pressed="${state.period==='5'}">5거래일</button><button data-period="20" aria-pressed="${state.period==='20'}">20거래일</button></div></div><svg class="price-chart" viewBox="0 0 420 135" preserveAspectRatio="none" role="img" aria-label="${esc(s.name)} ${state.period}거래일 가상 가격 차트, 마지막 종가 ${priceText(s.price)}엔"><defs><linearGradient id="${fillId}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#83b5a0" stop-opacity=".2"/><stop offset="1" stop-color="#83b5a0" stop-opacity="0"/></linearGradient></defs><path d="M8 32h404M8 71h404M8 110h404" stroke="#eff3ef" stroke-dasharray="3 4"/><path d="${path}L412 135L8 135Z" fill="url(#${fillId})"/><path d="${path}" fill="none" stroke="#74a990" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg><div class="chart-dates"><span>${state.period==='5'?'5':'20'}거래일 전</span><span>중간</span><span>10.16 · 예시</span></div>`;
  }
  function renderList(){
    const q=state.query.trim().toLowerCase();
    let found=stocks.filter(s=>(state.filter==='all'||s.group===state.filter)&&(!q||`${s.name} ${s.id} ${s.theme}`.toLowerCase().includes(q)));
    found.sort(state.sort==='name'?(a,b)=>a.name.localeCompare(b.name,'ko'):state.sort==='return'?(a,b)=>(b.change??-Infinity)-(a.change??-Infinity):(a,b)=>b.order-a.order);
    $('#list-title').innerHTML=`${state.filter==='held'?'내 보유종목':state.filter==='candidate'?'새로 살펴볼 후보':'전체 종목'} <span>${found.length}</span>`;
    $('#stock-list').innerHTML=found.length?found.map(s=>`<button class="stock-row ${s.id===state.stock?'selected':''}" data-stock="${s.id}" aria-pressed="${s.id===state.stock}" aria-label="${s.name}, ${s.group==='held'?'보유 예시':'신규 후보 예시'}, ${s.group==='held'?'보유 점검 '+s.badge+', '+decisionLabel(s):s.badge}, 상세 보기"><span><span class="row-name">${avatar(s)}<span class="row-identity"><strong>${s.name}</strong><span class="row-meta"><span class="group-tag ${s.group}">${s.group==='held'?'보유':'후보'}</span><span>${s.theme}</span></span></span></span><span class="row-judgments">${statusChips(s)}</span><span class="row-update ${s.changed?'changed':''}"><i class="row-dot"></i>${s.update}</span></span>${spark(s)}<span class="row-price"><strong>${priceText(s.price)}${s.price==null?'':'<em> 엔</em>'}</strong><small class="${colorClass(s.change)}">${signed(s.change)}</small></span></button>`).join(''):`<div class="empty-list"><strong>일치하는 종목이 없어요.</strong>이름·코드·테마를 다시 확인해주세요.<br><button id="clear-search">검색과 필터 초기화</button></div>`;
    $$('#stock-filters button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.filter===state.filter));
    $('#stock-sort').value=state.sort;
    if(document.activeElement!==$('#stock-search'))$('#stock-search').value=state.query;
  }
  function renderBriefing(){
    $('#briefing').innerHTML=`<div class="daily-brief-title"><h2>먼저 확인할 변화</h2><span>브리핑 3건 · 가상</span></div><div class="daily-brief-body"><button class="priority-brief" data-alert-room="holdings" data-alert-item="DEMO-B"><span class="priority-label"><i></i>보유종목 · 새 경고</span><strong>아오이 게임즈<br>이익 전망이 10% 낮아졌어요.</strong><span class="priority-fact">연간 영업이익 <b>120 → 108억 엔</b></span><span class="priority-next">다음 확인 · 하향 원인과 신작 판매 수량</span><span class="priority-action">보유 경고 확인 <span aria-hidden="true">→</span></span></button><div class="brief-followups"><button class="followup-brief" data-alert-room="decision" data-alert-item="DEMO-E"><span class="followup-label">새 매수대상</span><strong>세이운 소프트</strong><span>보류 → 매수대상 · 진입 신호는 아직 없음</span><span class="followup-action">결정실에서 근거 보기 <b aria-hidden="true">→</b></span></button><button class="followup-brief" data-alert-room="news" data-alert-item="contract"><span class="followup-label">지난 뉴스의 변화</span><strong>호쿠토 반도체</strong><span>수주 협의 → 계약 확인 · 이익 영향 미확인</span><span class="followup-action">후속 뉴스 확인 <b aria-hidden="true">→</b></span></button></div></div>`;
  }
  function overview(s){
    const r=latest(s);
    return `<div class="body-title">${statusChips(s)}${s.group==='held'?'':'<span>결정실 기준</span>'}</div><p class="analysis-lead">${r.summary}</p><p class="analysis-context">${s.group==='held'?'보유 상태는 실적·테마·가격·뉴스를 별도로 점검한 결과입니다.':`진입 시점: ${s.timing}. 매수대상은 진입 시점을 확인할 대상입니다.`}</p><div class="chart-container">${bigChart(s)}</div><div class="evidence-grid">${r.axes.map(a=>{const [name,...value]=a.split(':');return `<div class="evidence-cell"><small>${name}</small><strong>${value.join(':').trim()}</strong></div>`;}).join('')}</div><div class="next-check"><span>${icon('clock')}</span><div><h3>다음에 확인할 것</h3><p>${r.next}</p><small>아직 확인하지 못한 내용은 결론으로 바꾸지 않습니다.</small></div></div><div class="evidence-heading"><h3>이 분석에 사용한 자료</h3><small>그날의 자료와 결과</small></div><button class="source-row" data-evidence="${r.date}"><span class="source-icon">${icon('file')}</span><span><strong>${s.name} · ${s.price==null?'자료 확보 상태':'회사 발표와 당시 가격'}</strong><small>${r.inputAt} · 가상 자료</small></span><span>↗</span></button><p class="source-note">원문 입력 부분·당시 숫자·분석 결과를 함께 엽니다.</p>`;
  }
  function historyView(s){
    const r=s.records.find(r=>r.date===state.date)||latest(s);
    return `<p class="record-intro">날짜를 고르면 그날의 판단과 입력 자료를 함께 봅니다.</p><div class="record-select" role="group" aria-label="분석 기록 날짜">${[...s.records].reverse().map(t=>`<button data-date="${t.date}" aria-pressed="${t.date===r.date}">${t.date.slice(5).replace('-','.')} ${t===latest(s)?'최신':''}</button>`).join('')}</div><div class="snapshot-banner"><strong>${r.date} 시점의 보존 기록 · 가상</strong>현재 자료로 다시 분석한 결과가 아닙니다.</div><div class="snapshot-head"><h3>그날의 판단</h3>${badge(r.status,r.status==='주의'?'amber':r.status==='정상'||r.status==='매수대상'?'teal':'gray')}</div><div class="snapshot-price">${priceText(r.price)}${r.price==null?'':'엔'}<small>당시 종가</small></div><p class="snapshot-summary">${r.summary}</p><div class="diff-box"><small>직전 기록과 달라진 점</small><p>${r.change}</p></div><div class="source-date-grid"><div><small>입력 자료 시각</small><strong>${r.inputAt}</strong></div><div><small>분석 보존 시각</small><strong>${r.savedAt}</strong></div></div><button class="record-evidence" data-evidence="${r.date}">당시 입력 자료와 분석 함께 보기 <span>↗</span></button><div class="next-check"><span>${icon('clock')}</span><div><h3>그날 남겨둔 다음 확인</h3><p>${r.next}</p></div></div>${s.evaluation&&r.date===s.evaluation.recordDate?'<button class="text-link" id="record-to-score">이 회차의 20거래일 성적 보기 <span>→</span></button>':''}<div class="timeline"><h3>이 종목을 따라온 기록</h3>${[...s.records].reverse().map(t=>`<div class="timeline-item"><span class="timeline-date">${t.date.slice(5).replace('-','.')}</span><p><strong>${t.status}</strong><br>${t.change}</p></div>`).join('')}</div>`;
  }
  function stockScore(s){
    const past=state.round==='past'&&s.evaluation;
    const e=past?s.evaluation:null;
    const benchmark=state.benchmark==='market'?'시장(1306 ETF)':'같은 테마';
    return `<p class="record-intro">판단한 회차와 평가가 시작된 날짜를 맞춰 봅니다.</p><label class="score-round-label">평가 회차<select id="score-round"><option value="current" ${!past?'selected':''}>10.16 최근 기록 · ${s.decision==='매수대상'?'평가 대기':'선정 평가 없음'}</option>${s.evaluation?`<option value="past" ${past?'selected':''}>09.08 과거 선정 · 20거래일 완료</option>`:''}</select></label><div class="benchmark-switch" role="group" aria-label="비교 기준"><button data-benchmark="theme" aria-pressed="${state.benchmark==='theme'}">같은 테마 대비</button><button data-benchmark="market" aria-pressed="${state.benchmark==='market'}">시장 대비</button></div>${e?`<div class="score-result"><small>20거래일 · ${benchmark} 대비</small><strong class="${colorClass(scoreDifference(s,state.benchmark))}">${signed(scoreDifference(s,state.benchmark),'')}<span>%p</span></strong><p>가상 평가 결과 · 실제 체결 수익 아님</p><div class="return-comparison"><div><span>종목 수익률</span><b class="${colorClass(e.stock)}">${signed(e.stock)}</b></div><div><span>${benchmark} 수익률</span><b>${signed(e[state.benchmark])}</b></div></div></div><div class="source-date-grid"><div><small>판단 기준일</small><strong>${e.recordDate}</strong></div><div><small>평가 시작 → 종료 · 예시</small><strong>${e.start.slice(5)} → ${e.end.slice(5)}</strong></div></div><button class="text-link" id="score-to-record">이 결과가 출발한 당시 분석 열기 <span>→</span></button>`:`<div class="result-pending"><strong>${s.price==null?'평가 시작 전':s.decision==='매수대상'?'20거래일 평가 대기':'이 회차의 선정 평가 없음'}</strong><p>${s.price==null?'가격과 판단 자료가 부족합니다.':s.decision==='매수대상'?'예시 기준일에 평가 기간이 아직 끝나지 않았습니다.':'이 날짜에는 매수대상 선정 기록이 없습니다. 이전 평가 회차가 있으면 위에서 선택할 수 있습니다.'}</p><span>결과가 없으므로 수익률을 0%로 채우지 않습니다.</span></div>`}<p class="metric-note">같은 테마 비교와 시장 비교는 기준이 다릅니다. 평가 시작일을 현재 판단일로 바꾸지 않습니다.</p><div class="account-result"><h3>실제 보유 손익</h3><p>이 시안에는 개인의 수량·평단·체결 자료가 없습니다.<br>실제 보유 손익은 위 선정성적과 별도로 표시할 영역입니다.</p></div>`;
  }
  function renderDetail(){
    const s=selectedStock();
    const names={overview:'현재 분석',history:'변화·기록',score:'성적표'};
    $('#stock-detail').innerHTML=`<div class="detail-top">${state.from?`<button class="return-room" id="return-room">← ${rooms.menu(state.from).name} 돌아가기</button>`:'<button class="mobile-back" id="back-list">← 종목 목록으로</button>'}<div class="detail-label">${badge(s.group==='held'?'보유 예시':'신규 후보 예시',s.group==='held'?'gray':'blue')}<span>일본 주식 · 가상 종목</span><span class="selected-label">선택한 종목</span></div><div class="detail-identity">${avatar(s)}<div><h2 id="detail-heading" tabindex="-1">${s.name}</h2><small>${s.id} · ${s.theme}</small></div></div><div class="detail-price-line"><div class="detail-price">${priceText(s.price)}${s.price==null?'':'<span>엔</span>'}</div><div class="day-return ${colorClass(s.change)}">${signed(s.change)}</div></div><div class="price-asof">최근 종가 · 2026.10.16 / 전일 대비 · 가상 가격</div></div><div class="detail-tabs" role="tablist" aria-label="종목 상세 메뉴">${Object.entries(names).map(([key,label])=>`<button role="tab" id="tab-${key}" aria-selected="${state.tab===key}" aria-controls="detail-body" tabindex="${state.tab===key?'0':'-1'}" data-tab="${key}">${label}</button>`).join('')}</div><div class="detail-body" id="detail-body" role="tabpanel" aria-labelledby="tab-${state.tab}">${state.tab==='history'?historyView(s):state.tab==='score'?stockScore(s):overview(s)}</div>`;
    document.title=`${state.detail?s.name+' · ':''}${state.view==='scores'?'성적표':'종목의 오늘'} · 호쿠토증권 디자인 v2.0`;
  }
  function renderScores(){
    const benchmark=state.benchmark==='market'?'시장(1306 ETF)':'같은 테마';
    const avg=state.benchmark==='market'?.6:-.3;
    $('#scores-view').innerHTML=`<div class="score-original-links"><span>종목별 성적표 시안</span><button data-room="performance">기존 성과기록 →</button><button data-room="selection">기존 선정성적 →</button></div><div class="scores-header"><div><h2>선정 이후, 실제로 어떻게 움직였을까</h2><p>종목을 누르면 평가 회차의 분석까지 거슬러 올라갑니다.</p></div><div class="benchmark-switch" role="group" aria-label="전체 성적표 비교 기준"><button data-benchmark="theme" aria-pressed="${state.benchmark==='theme'}">같은 테마 대비</button><button data-benchmark="market" aria-pressed="${state.benchmark==='market'}">시장 대비</button></div></div><div class="scorecards"><div class="scorecard"><small>완료 회차 · 20거래일 평균 초과수익</small><strong class="${colorClass(avg)}">${signed(avg,'%p')}</strong><p>${benchmark} 대비 · 가상 완료 2건 기준</p></div><div class="scorecard"><small>평가 완료</small><strong>2<span class="muted"> 건</span></strong><p>같은 평가 기간의 결과만 집계</p></div><div class="scorecard"><small>아직 집계하지 않는 항목</small><strong>5<span class="muted"> 건</span></strong><p>평가 대기 2 · 선정 평가 없음 2 · 자료 부족 1</p></div></div><div class="score-table-wrap" tabindex="0" aria-label="종목별 성적표, 좁은 화면에서는 가로로 이동"><table class="score-table"><thead><tr><th>종목 / 평가 회차</th><th>종목 수익률</th><th>${benchmark}</th><th>차이</th><th>상태</th></tr></thead><tbody>${stocks.map(s=>`<tr><td><button data-score-stock="${s.id}">${s.name}<small>${s.evaluation?'09.08 선정 · 과거 회차':'10.16 최근 기록'}</small></button></td><td class="${colorClass(s.evaluation?.stock)}">${s.evaluation?signed(s.evaluation.stock):'—'}</td><td>${s.evaluation?signed(s.evaluation[state.benchmark]):'—'}</td><td class="${colorClass(scoreDifference(s,state.benchmark))}">${s.evaluation?signed(scoreDifference(s,state.benchmark),'%p'):'—'}</td><td>${badge(s.evaluation?'20일 완료':s.price==null?'자료 부족':s.decision==='매수대상'?'평가 대기':'선정 평가 없음',s.evaluation?'teal':'gray')}</td></tr>`).join('')}</tbody></table></div><p class="metric-note">모든 성과는 화면 동작을 위한 가상 값입니다. 실제 계좌 손익이 아니며, 호쿠토의 실제 성능을 나타내지 않습니다.</p>`;
  }
  function render(){
    if(state.view==='menu'){location.replace('menu.html?v=3');return;}
    document.body.dataset.room=state.view==='room'?state.room:'';
    const scores=state.view==='scores';
    const explore=state.view==='menu'||state.view==='room';
    const focused=state.view==='home'&&state.detail&&!!state.from;
    document.body.classList.toggle('mobile-detail',state.detail&&!scores&&!explore);
    document.body.classList.toggle('explore-mode',explore);
    document.body.classList.toggle('news-mode',state.view==='room'&&state.room==='news');
    document.body.classList.toggle('focused-detail',focused);
    document.body.classList.toggle('home-overview',state.view==='home'&&!focused&&!state.query);
    $('#workspace-grid').hidden=scores||explore;$('#briefing').hidden=scores||explore||focused||!!state.query;$('#scores-view').hidden=!scores;
    $('#explore-view').hidden=!explore;
    $('#home-news').hidden=scores||explore||focused||!!state.query;
    $('#home-news').innerHTML=rooms.homeNews();
    $('#overview-column').hidden=focused;
    const active=explore?(state.view==='room'&&state.room==='holdings'?'held':state.view==='room'&&state.room==='decision'?'candidate':state.view==='room'&&state.room==='news'?'news':'menu'):scores?'scores':'home';
    $$('[data-nav]').forEach(b=>{b.classList.toggle('active',b.dataset.nav===active);if(b.closest('nav'))b.setAttribute('aria-current',b.dataset.nav===active?'page':'false');});
    ['all-menu','mobile-all-menu'].forEach(id=>{const b=$('#'+id);b.classList.toggle('active',active==='menu');if(active==='menu')b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});
    $('#page-heading h1').textContent=scores?'판단의 성적표':focused?'종목 분석':state.query?'종목 검색':state.filter==='held'?'내 주식의 오늘':state.filter==='candidate'?'새로 살펴볼 종목':'내 일본 주식의 중요한 변화';
    $('#page-heading p').textContent=scores?'그때의 판단과, 그 뒤의 결과를 함께.':focused?rooms.menu(state.from).name+'에서 이어 보는 분석과 당시 기록':state.query?'이름·코드·테마가 일치하는 종목을 찾습니다.':'뉴스를 훑고, 보유 변화를 확인하고, 새 후보를 검토합니다.';
    $('#page-heading .eyebrow').textContent=scores?'기록과 결과':focused?'한 회사의 근거와 기록':'호쿠토 핵심 브리핑';
    const journey=$('#journey-bar');journey.hidden=!(explore||scores);
    journey.innerHTML=`<button id="journey-back">← 이전 화면</button><span>${scores?'기록과 결과':state.view==='menu'?'전체 메뉴':rooms.menu(state.room).owner||'호쿠토'}</span>`;
    renderBriefing();renderList();renderDetail();if(scores)renderScores();
    if(explore)rooms.render();
    $$('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon));
    if(!explore)document.title=`${scores?'종목별 성적표':'알림 홈'} · 호쿠토증권 디자인 v2.0`;
    window.HokutoCharts?.renderHome(stocks,state,id=>route({stock:id},true));
    window.HokutoCharts?.mount();
    renderedHash=location.hash;
  }
  function selectStock(id,tab='overview',extra={}){
    if(!state.detail)listScroll=window.scrollY;
    const from=state.view==='room'?state.room:state.view==='scores'?'scores':'';
    if(from||!state.detail)originContext={state:{...state},scroll:window.scrollY};
    route({view:'home',stock:id,tab,detail:true,date:'',round:'current',from,...extra});
    if(extra.from||matchMedia('(max-width:760px)').matches)window.scrollTo({top:0});
    $('#announcer').textContent=`${stocks.find(s=>s.id===id).name}, ${tab==='history'?'변화와 기록':tab==='score'?'성적표':'현재 분석'}를 엽니다.`;
  }
  function openDialog(content){
    returnFocus=document.activeElement;
    $('#dialog-content').innerHTML=content;
    const d=$('#evidence-dialog');if(!d.open)d.showModal();
    $('#close-dialog')?.focus();
  }
  function showEvidence(date){
    const s=selectedStock(),r=s.records.find(r=>r.date===date);
    if(!r)return;
    openDialog(`<div class="dialog-header"><div><small>${s.name} · ${r.date} 보존 기록 · 가상</small><h2>그날 무엇을 보고 판단했나요?</h2></div><button class="close-dialog" id="close-dialog" aria-label="당시 자료 닫기">×</button></div><div class="dialog-body"><div class="snapshot-banner"><strong>이 날짜의 자료와 분석을 한 묶음으로 보존한 예시</strong>다른 날짜의 기사·가격으로 내용을 바꾸지 않았습니다.</div><h3>당시 분석 결과</h3>${badge(r.status,r.status==='주의'?'amber':'gray')}<p class="snapshot-summary">${r.summary}</p><h3>실제로 분석에 넣은 문장</h3><blockquote class="input-quote">${r.input}</blockquote><div class="input-data"><div><small>당시 종가</small><strong>${priceText(r.price)}${r.price==null?'':'엔'}</strong></div><div><small>자료 시각</small><strong>${r.inputAt}</strong></div><div><small>분석 보존 시각</small><strong>${r.savedAt}</strong></div><div><small>자료 출처</small><strong>가상 회사 발표 / 가상 가격</strong></div></div><h3>당시 사용한 근거</h3><div class="evidence-grid">${r.axes.map(a=>`<div class="evidence-cell"><strong>${a}</strong></div>`).join('')}</div><h3>그날 남겨둔 다음 확인</h3><p class="snapshot-summary">${r.next}</p><p class="dialog-caption">이 문서는 화면 시연용으로 작성한 가상 입력입니다. 실제 기사 링크나 운영 기록을 포함하지 않습니다.</p></div>`);
  }
  function showMenu(){
    route({view:'menu',detail:false,from:'',menuQuery:''});window.scrollTo({top:0});
  }
  document.addEventListener('click',ev=>{
    if(ev.target.closest('[data-home-link]')){ev.preventDefault();route({view:'home',filter:'all',detail:false,from:'',query:''});return;}
    if(ev.target.closest('.skip')){ev.preventDefault();$('#workspace').focus();$('#workspace').scrollIntoView();return;}
    const b=ev.target.closest('button');if(!b)return;
    if(rooms.onClick(b))return;
    if(b.dataset.nav){const n=b.dataset.nav;if(n==='held'||n==='candidate'||n==='news'){rooms.navigate(n==='held'?'holdings':n==='news'?'news':'decision');return;}route({view:n==='scores'?'scores':'home',filter:'all',detail:false,query:'',from:''});window.scrollTo({top:0});return;}
    if(b.id==='journey-back'){goBack();return;}
    if(b.dataset.stock){selectStock(b.dataset.stock);return;}
    if(b.dataset.open){selectStock(b.dataset.open,b.dataset.openTab||'overview');return;}
    if(b.dataset.filter){route({filter:b.dataset.filter,detail:false});return;}
    if(b.hasAttribute('data-headlines-expand')){route({headlinesExpanded:!state.headlinesExpanded},true);return;}
    if(b.dataset.tab){route({tab:b.dataset.tab,date:'',round:'current'});return;}
    if(b.dataset.period){route({period:b.dataset.period},true);return;}
    if(b.dataset.date){route({date:b.dataset.date});return;}
    if(b.dataset.evidence){showEvidence(b.dataset.evidence);return;}
    if(b.dataset.benchmark){route({benchmark:b.dataset.benchmark},true);return;}
    if(b.dataset.scoreStock){const s=stocks.find(s=>s.id===b.dataset.scoreStock);selectStock(s.id,'score',{round:s.evaluation?'past':'current'});return;}
    if(b.id==='clear-search'){route({query:'',filter:'all'});return;}
    if(b.id==='back-list'){returnToOrigin();return;}
    if(b.id==='type-button'){document.documentElement.classList.toggle('large-text');b.setAttribute('aria-pressed',document.documentElement.classList.contains('large-text'));return;}
    if(b.id==='record-to-score'){route({tab:'score',round:'past'});return;}
    if(b.id==='score-to-record'){route({tab:'history',date:selectedStock().evaluation.recordDate});return;}
    if(b.id==='all-menu'||b.id==='mobile-all-menu'){showMenu();return;}
    if(b.id==='close-dialog'){$('#evidence-dialog').close();return;}
  });
  $('#stock-search').addEventListener('input',e=>route({query:e.target.value,view:'home',detail:false,from:''},true));
  document.addEventListener('input',e=>{
    if(e.target.id!=='news-search'||e.isComposing)return;
    const value=e.target.value;
    const caret=e.target.selectionStart;
    route({newsQuery:value,item:''},true);
    const input=$('#news-search');input.focus({preventScroll:true});
    if(caret!=null)input.setSelectionRange?.(caret,caret);
  });
  document.addEventListener('change',e=>{if(e.target.id==='news-country')route({newsCountry:e.target.value,item:''},true);});
  document.addEventListener('input',e=>{if(e.target.id==='menu-search'){const value=e.target.value;route({menuQuery:value},true);const input=$('#menu-search');input.focus();}});
  $('#stock-sort').addEventListener('change',e=>route({sort:e.target.value},true));
  document.addEventListener('change',e=>{if(e.target.id==='score-round')route({round:e.target.value},true);});
  document.addEventListener('keydown',e=>{
    if(e.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)&&!$('#evidence-dialog').open){e.preventDefault();$('#stock-search').focus();}
    const tab=e.target.closest('[role=tab]');
    if(tab&&['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){
      e.preventDefault();const keys=['overview','history','score'];const i=keys.indexOf(tab.dataset.tab);const next=e.key==='Home'?0:e.key==='End'?2:(i+(e.key==='ArrowRight'?1:2))%3;
      route({tab:keys[next],date:'',round:'current'},true);$(`#tab-${keys[next]}`).focus();
    }
  });
  $('#evidence-dialog').addEventListener('click',e=>{if(e.target===e.currentTarget){const r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.currentTarget.close();}});
  $('#evidence-dialog').addEventListener('close',()=>{if(returnFocus?.isConnected)returnFocus.focus();});
  window.addEventListener('popstate',locationChanged);
  window.addEventListener('hashchange',locationChanged);
  history.replaceState({...history.state,hokutoIndex:history.state?.hokutoIndex||0},'',location.href);
  state=readState();render();
})();
