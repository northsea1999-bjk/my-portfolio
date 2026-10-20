/* Read-only presentation adapter. Production must supply existing DB results and
   derived calendar/price evidence; these are not new database columns. */
(function(root){'use strict';
  const P=typeof module==='object'&&module.exports?require('./display-policy.js'):root.HokutoDisplayPolicy;
  function cell(record,days,metric='stock',policy=P){
    if(policy.recordingStart[days]&&record.date<policy.recordingStart[days])return {kind:'before-start'};
    const result=record.returns?.[days];
    const value=result&&typeof result==='object'?result[metric]:metric==='stock'?result:null;
    if(Number.isFinite(value))return {kind:'value',value};
    const evidence=record.displayEvidence?.[days]||{};
    if(Number.isInteger(evidence.remainingTradingDays)&&evidence.remainingTradingDays>0)return {kind:'waiting',remaining:evidence.remainingTradingDays};
    if(evidence.remainingTradingDays===0&&evidence.priceMissing===true)return {kind:'missing-price'};
    // An absent return does not prove a missing price or an unfinished period.
    return {kind:'unverified'};
  }
  function fixtureRecords(events,stocks){
    return events.map(e=>{
      const record={...e,returns:{...e.returns},displayEvidence:{}};
      const evaluation=stocks.find(s=>s.id===e.stockId)?.evaluation;
      if(evaluation?.recordDate===e.date)record.returns[20]={stock:evaluation.stock,theme:evaluation.stock-evaluation.theme,market:evaluation.stock-evaluation.market};
      // All current fixture selections are on the fixture observation date.
      // No exchange calendar or historical elapsed-day count is fabricated.
      if(e.date===P.fixtureAsOf)for(const days of [1,5,20,40,60])record.displayEvidence[days]={remainingTradingDays:days};
      return record;
    });
  }
  const api={cell,fixtureRecords};
  if(typeof module==='object'&&module.exports)module.exports=api;else root.HokutoPerformanceDisplay=api;
})(typeof window==='undefined'?{}:window);
