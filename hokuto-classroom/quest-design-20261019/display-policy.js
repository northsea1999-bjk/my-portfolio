/* Presentation policy only. Verify the transition boundary from operating records.
   No selection-engine or database changes are made here. */
(function(root){'use strict';
  const policy=Object.freeze({
    transition:Object.freeze({date:'2026-10-20',nextDate:'2026-10-21',timeZone:'Asia/Tokyo',cutoverAt:'2026-10-20T17:45:00+09:00',confirmed:false}),
    recordingStart:Object.freeze({40:'2026-10-21'}),
    defaultPeriod:'transition',
    fixtureAsOf:'2026-10-20'
  });
  if(typeof module==='object'&&module.exports)module.exports=policy;else root.HokutoDisplayPolicy=policy;
})(typeof window==='undefined'?{}:window);
