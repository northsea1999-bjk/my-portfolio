/* Synthetic presentation snapshots only. Never use this file to select live trades. */
(function(root){
  'use strict';
  const ruleId='focus3-20261020';
  const previousRuleId='star6-through-20261019';
  // Six leading themes remain a separate classification. Grid is deliberately outside ★.
  const themes=[
    {id:'chip',name:'반도체 장비·검사',star:true,trend6m:-1,return20:18},
    {id:'ai',name:'AI 소프트웨어',star:true,trend6m:1,return20:15},
    {id:'parts',name:'전자부품',star:true,trend6m:1,return20:9},
    {id:'grid',name:'전력망',star:false,trend6m:1,return20:8},
    {id:'defense',name:'방산',star:true,trend6m:1,return20:5},
    {id:'game',name:'게임',star:true,trend6m:-1,return20:-2},
    {id:'robot',name:'산업용 로봇',star:true,trend6m:1,return20:4}
  ];
  // Already-selected illustrative snapshot, not a browser reimplementation of the engine.
  const focusIds=['ai','parts','grid'];
  const events=[
    {id:'focus-E',stockId:'DEMO-E',themeId:'ai',ruleId,date:'2026-10-20',lanes:['A','D'],focusAtSelection:true,starAtSelection:true,decision:null,returns:{1:null,2:null,3:null}},
    {id:'focus-D',stockId:'DEMO-D',themeId:'parts',ruleId,date:'2026-10-20',lanes:['B'],focusAtSelection:true,starAtSelection:true,decision:null,returns:{1:null,2:null,3:null}},
    {id:'focus-F',stockId:'DEMO-F',themeId:'grid',ruleId,date:'2026-10-20',lanes:['C'],focusAtSelection:true,starAtSelection:false,decision:null,returns:{1:null,2:null,3:null}},
    {id:'legacy-A',stockId:'DEMO-A',themeId:'chip',ruleId:previousRuleId,date:'2026-09-08',lanes:[],focusAtSelection:false,starAtSelection:null,decision:'매수대상',returns:{1:null,2:null,3:null}},
    {id:'legacy-B',stockId:'DEMO-B',themeId:'game',ruleId:previousRuleId,date:'2026-09-08',lanes:[],focusAtSelection:false,starAtSelection:null,decision:'매수대상',returns:{1:null,2:null,3:null}}
  ];
  const isFocusABC=e=>e.ruleId===ruleId&&e.focusAtSelection===true&&e.lanes.some(l=>['A','B','C'].includes(l));
  const rowsFor=(version='focus',scope='all',data=events)=>data.filter(e=>
    e.ruleId===(version==='legacy'?previousRuleId:ruleId)&&
    (scope==='all'||scope==='abc'&&isFocusABC(e)||scope==='d'&&e.lanes.includes('D')));
  const stockTheme=id=>({ 'DEMO-A':'chip','DEMO-B':'game','DEMO-C':'defense','DEMO-D':'parts','DEMO-E':'ai','DEMO-F':'grid' })[id];
  const themeForStock=id=>themes.find(t=>t.id===stockTheme(id));
  const focusForStock=id=>focusIds.includes(stockTheme(id));
  const api={ruleId,previousRuleId,themes,focusIds,events,isFocusABC,rowsFor,themeForStock,focusForStock};
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.HokutoFocus=api;
})(typeof window==='undefined'?{}:window);
