const UI_focus_rule_js=typeof window==='undefined'?require('./ui-copy.js'):window.HokutoText;
const FMT_focus_rule_js=typeof window==='undefined'?require('./display-format.js'):window.HokutoFormat;
"use strict";

/* Synthetic presentation snapshots only. Never use this file to select live trades. */
(function (root) {
  'use strict';

  const ruleId = 'focus3-20261020';
  const previousRuleId = 'star6-through-20261019';
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
  const dateGroup = date => /^\d{4}-\d{2}-\d{2}$/.test(date || '') ? date >= '2026-10-20' ? 'focus' : 'legacy' : 'unknown';
  const isFocusABC = e => dateGroup(e.date) === 'focus' && e.focusAtSelection === true && e.lanes.some(l => ['A', 'B', 'C'].includes(l));
  const rowsFor = (version = 'focus', scope = 'all', data = events) => data.filter(e => dateGroup(e.date) === (version === 'legacy' ? 'legacy' : 'focus') && (scope === 'all' || scope === 'abc' && isFocusABC(e) || scope === 'd' && e.lanes.includes('D')));
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
    ruleId,
    previousRuleId,
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
