/* Read-only presentation adapter. Mark existence and calendar/price evidence are
   read from existing records; they are not new database columns. */
(function(root){'use strict';
  const P=typeof module==='object'&&module.exports?require('./display-policy.js'):root.HokutoDisplayPolicy;
  function cell(record,days,metric='stock'){
    if(record.sourceRecords?.length>1){
      const states=record.sourceRecords.map(source=>cell(source,days,metric));
      return states.every(s=>JSON.stringify(s)===JSON.stringify(states[0]))?states[0]:{kind:'unverified'};
    }
    const evidence=record.displayEvidence?.[days]||{};
    const result=record.returns?.[days];
    const value=result&&typeof result==='object'?result[metric]:metric==='stock'?result:null;
    if(Number.isFinite(value))return evidence.markExists===false?{kind:'unverified'}:{kind:'value',value};
    if(evidence.markExists===false)return {kind:'before-start'};
    if(evidence.markExists!==true)return {kind:'unverified'};
    if(Number.isInteger(evidence.remainingTradingDays)&&evidence.remainingTradingDays>0)return {kind:'waiting',remaining:evidence.remainingTradingDays};
    if((evidence.remainingTradingDays===0||evidence.periodElapsed===true)&&evidence.priceMissing===true)return {kind:'missing-price'};
    return {kind:'unverified'};
  }
  function fixtureRecords(events,stocks){
    return events.map(e=>{
      const record={...e,returns:{...e.returns},displayEvidence:{}};
      const evaluation=stocks.find(s=>s.id===e.stockId)?.evaluation;
      if(evaluation?.recordDate===e.date)record.returns[20]={stock:evaluation.stock,theme:evaluation.stock-evaluation.theme,market:evaluation.stock-evaluation.market};
      // Fictional marks for demonstration only, including new 40-day marks on old signals.
      // Historical elapsed trading days and entry identity are deliberately not invented.
      for(const days of [1,5,20,40,60])record.displayEvidence[days]={markExists:true,...(e.date===P.fixtureAsOf?{remainingTradingDays:days}:{})};
      return record;
    });
  }
  const api={cell,fixtureRecords};
  if(typeof module==='object'&&module.exports)module.exports=api;else root.HokutoPerformanceDisplay=api;
})(typeof window==='undefined'?{}:window);
