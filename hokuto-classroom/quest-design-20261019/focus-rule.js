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
  function uniqueRows(data){
    const rows=new Map();
    for(const e of data){
      const key=[e.date,e.selectedAt||'',e.stockId].join('|');
      if(rows.has(key)){const prior=rows.get(key);prior.lanes=[...new Set([...prior.lanes,...e.lanes])];}
      else rows.set(key,{...e,lanes:[...e.lanes]});
    }
    return [...rows.values()];
  }
  const rowsFor = (version='focus',scope='all',data=events) => uniqueRows(data).filter(e=>periodFor(e)===version&&(scope==='all'||scope==='abc'&&isFocusABC(e)||scope==='d'&&e.lanes.includes('D')));
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
