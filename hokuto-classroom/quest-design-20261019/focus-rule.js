const UI_focus_rule_js=typeof window==='undefined'?require('./ui-copy.js'):window.HokutoText;
const FMT_focus_rule_js=typeof window==='undefined'?require('./display-format.js'):window.HokutoFormat;
"use strict";

/* Synthetic presentation snapshots only. Never use this file to select live trades. */
(function (root) {
  'use strict';

  const P = typeof module==='object'&&module.exports ? require('./display-policy.js') : root.HokutoDisplayPolicy;
  // Six leading themes remain a separate classification. Grid is deliberately outside ★.
  const themes = [{
    id: 'chip',
    name: UI_focus_rule_js.raw("text_6a67a4abe6ac"),
    star: true,
    trend6m: -1,
    return20: 18,
    money: false,
    converted: false
  }, {
    id: 'bank',
    name: UI_focus_rule_js.raw("text_b37e5c9886f8"),
    star: true,
    trend6m: -1,
    return20: 17,
    money: true,
    converted: false
  }, {
    id: 'ai',
    name: UI_focus_rule_js.raw("text_93f810f519c8"),
    star: true,
    trend6m: 1,
    return20: 15,
    money: true,
    converted: true
  }, {
    id: 'auto',
    name: UI_focus_rule_js.raw("text_7eda854d170a"),
    star: true,
    trend6m: -1,
    return20: 14,
    money: false,
    converted: false
  }, {
    id: 'steel',
    name: UI_focus_rule_js.raw("text_e17928e4e046"),
    star: true,
    trend6m: -1,
    return20: 11,
    money: false,
    converted: false
  }, {
    id: 'parts',
    name: UI_focus_rule_js.raw("text_8ae98c1ea150"),
    star: true,
    trend6m: 1,
    return20: 9,
    money: false,
    converted: false
  }, {
    id: 'grid',
    name: UI_focus_rule_js.raw("text_4d775db48ccd"),
    star: false,
    trend6m: 1,
    return20: 8,
    money: true,
    converted: false
  }, {
    id: 'defense',
    name: UI_focus_rule_js.raw("text_122f77b14ea4"),
    star: false,
    trend6m: 1,
    return20: 5,
    money: false,
    converted: false
  }, {
    id: 'robot',
    name: UI_focus_rule_js.raw("text_3f97ae143f79"),
    star: false,
    trend6m: 1,
    return20: 4,
    money: false,
    converted: false
  }, {
    id: 'game',
    name: UI_focus_rule_js.raw("text_3405df6ecf3e"),
    star: false,
    trend6m: -1,
    return20: -2,
    money: false,
    converted: false
  }];
  // Already-selected illustrative snapshot, not a browser reimplementation of the engine.
  const focusIds = ['ai', 'parts', 'grid'];
  const events = [{
    id: 'focus-E',
    stockId: 'DEMO-E',
    themeId: 'ai',
    date: '2026-10-20',
    lanes: ['A', 'D'],
    focusAtSelection: true,
    starAtSelection: true,
    decision: null,
    returns: {
      1: null,
      5: null,
      20: null,
      40: null,
      60: null
    }
  }, {
    id: 'focus-D',
    stockId: 'DEMO-D',
    themeId: 'parts',
    date: '2026-10-20',
    lanes: ['B'],
    focusAtSelection: true,
    starAtSelection: true,
    decision: null,
    returns: {
      1: null,
      5: null,
      20: null,
      40: null,
      60: null
    }
  }, {
    id: 'focus-F',
    stockId: 'DEMO-F',
    themeId: 'grid',
    date: '2026-10-20',
    lanes: ['C'],
    focusAtSelection: true,
    starAtSelection: false,
    decision: null,
    returns: {
      1: null,
      5: null,
      20: null,
      40: null,
      60: null
    }
  }, {
    id: 'legacy-A',
    stockId: 'DEMO-A',
    themeId: 'chip',
    date: '2026-09-08',
    lanes: [],
    focusAtSelection: false,
    starAtSelection: null,
    decision: UI_focus_rule_js.raw("text_9bdf57df1323"),
    returns: {
      1: null,
      5: null,
      20: null,
      40: null,
      60: null
    }
  }, {
    id: 'legacy-B',
    stockId: 'DEMO-B',
    themeId: 'game',
    date: '2026-09-08',
    lanes: [],
    focusAtSelection: false,
    starAtSelection: null,
    decision: UI_focus_rule_js.raw("text_9bdf57df1323"),
    returns: {
      1: null,
      5: null,
      20: null,
      40: null,
      60: null
    }
  }];
  function dateGroup(date, selectedAt = null, policy = P.transition) {
    if(!/^\d{4}-\d{2}-\d{2}$/.test(date||'')||!Number.isFinite(Date.parse(date))||new Date(date).toISOString().slice(0,10)!==date)return 'unknown';
    if(date<policy.date)return 'legacy';
    if(date>=policy.nextDate)return 'focus';
    if(!selectedAt||!policy.confirmed)return 'transition';
    const clock=/^\d{2}:\d{2}(:\d{2})?$/.test(selectedAt);
    const value=clock?date+'T'+selectedAt+(selectedAt.length===5?':00':'')+policy.cutoverAt.slice(-6):selectedAt;
    if(!/(Z|[+-]\d{2}:\d{2})$/.test(value))return 'transition';
    const stamp=Date.parse(value),cutover=Date.parse(policy.cutoverAt);
    if(!Number.isFinite(stamp)||!Number.isFinite(cutover))return 'transition';
    const parts=new Intl.DateTimeFormat('en-CA',{timeZone:policy.timeZone,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(stamp);
    const localDate=['year','month','day'].map(k=>parts.find(p=>p.type===k).value).join('-');
    if(localDate!==date)return 'transition';
    return stamp<cutover?'legacy':'focus';
  }
  const periodFor = (e, policy=P.transition) => dateGroup(e.date,e.selectedAt,policy);
  const focusSnapshots = {'2026-10-20':focusIds}; // Synthetic theme snapshot, never current membership applied to history.
  const focusForEvent = e => {
    const ids=e.focusThemeIds??focusSnapshots[e.date];
    return Array.isArray(ids)?ids.includes(e.themeId):null;
  };
  const isFocusABC = e => periodFor(e)==='focus'&&focusForEvent(e)===true&&e.lanes.some(l=>['A','B','C'].includes(l));
  function entryKey(e){
    if(!e.stockId||!/^\d{4}-\d{2}-\d{2}$/.test(e.entryDate||'')||!Number.isFinite(e.entryPrice)||e.entryPrice<=0)return null;
    return JSON.stringify([periodFor(e),e.stockId,e.entryDate,e.entryPrice]);
  }
  function uniqueRows(data){
    const groups=new Map();
    data.forEach((e,index)=>{
      const identity=entryKey(e),key=identity||'unverified-'+index;
      if(groups.has(key)){
        const row=groups.get(key);row.lanes=[...new Set([...row.lanes,...e.lanes])];row.sourceRecords.push(e);
        row.sourceEventIds=[...new Set([...row.sourceEventIds,e.signalId||e.id].filter(Boolean))];
      } else groups.set(key,{...e,lanes:[...e.lanes],sourceRecords:[e],sourceEventIds:[e.signalId||e.id].filter(Boolean),entryVerified:!!identity});
    });
    const rows=[...groups.values()],days=new Map();
    for(const row of rows){
      if(!row.entryVerified)continue;
      const key=JSON.stringify([periodFor(row),row.stockId,row.entryDate]);
      if(!days.has(key))days.set(key,new Set());days.get(key).add(row.entryPrice);
    }
    for(const row of rows){
      const count=days.get(JSON.stringify([periodFor(row),row.stockId,row.entryDate]))?.size||0;
      row.sameDayDuplicate=row.entryVerified&&count>1?count:0;
    }
    return rows;
  }
  const signalRowsFor = (version='focus',scope='all',data=events) => data.filter(e=>periodFor(e)===version&&(scope==='all'||scope==='abc'&&isFocusABC(e)||scope==='d'&&e.lanes.includes('D')));
  const rowsFor = (version='focus',scope='all',data=events) => uniqueRows(signalRowsFor(version,scope,data));
  function laneCounts(version='focus',scope='all',data=events){
    const signals=new Map();
    for(const e of signalRowsFor(version,scope,data)){
      const id=e.signalId||e.id;if(!id||!Array.isArray(e.lanes))return null;
      if(!signals.has(id))signals.set(id,new Set());for(const lane of e.lanes)signals.get(id).add(lane);
    }
    const counts={total:signals.size,A:0,B:0,C:0,D:0,none:0};
    for(const lanes of signals.values()){
      for(const lane of ['A','B','C','D'])if(lanes.has(lane))counts[lane]++;
      if(lanes.size===0)counts.none++;
    }
    return counts;
  }
  const previousFocusIds = null; // No previous production snapshot was provided.
  const changeSummary = (current, previous) => previous == null ? {
    kind: 'initial',
    entered: [],
    exited: []
  } : {
    kind: current.some(x => !previous.includes(x)) || previous.some(x => !current.includes(x)) ? 'changed' : 'unchanged',
    entered: current.filter(x => !previous.includes(x)),
    exited: previous.filter(x => !current.includes(x))
  };
  const stockTheme = id => ({
    'DEMO-A': 'chip',
    'DEMO-B': 'game',
    'DEMO-C': 'defense',
    'DEMO-D': 'parts',
    'DEMO-E': 'ai',
    'DEMO-F': 'grid'
  })[id];
  const themeForStock = id => themes.find(t => t.id === stockTheme(id));
  const focusForStock = id => focusIds.includes(stockTheme(id));
  const api = {
    periodFor,
    focusForEvent,
    uniqueRows,
    signalRowsFor,
    laneCounts,
    dateGroup,
    themes,
    focusIds,
    previousFocusIds,
    changeSummary,
    events,
    isFocusABC,
    rowsFor,
    themeForStock,
    focusForStock
  };
  if (typeof module === 'object' && module.exports) module.exports = api;else root.HokutoFocus = api;
})(typeof window === 'undefined' ? {} : window);
