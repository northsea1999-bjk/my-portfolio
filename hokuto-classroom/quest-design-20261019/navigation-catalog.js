const UI_navigation_catalog_js=typeof window==='undefined'?require('./ui-copy.js'):window.HokutoText;
const FMT_navigation_catalog_js=typeof window==='undefined'?require('./display-format.js'):window.HokutoFormat;
"use strict";

/* Original menu destinations; the private operating address stays in this browser. */
(() => {
  'use strict';

  const catalog = [{
    id: 'meeting',
    name: UI_navigation_catalog_js.text("text_e3a3ddff0f06"),
    short: UI_navigation_catalog_js.text("text_f793583bbeba"),
    owner: UI_navigation_catalog_js.text("text_dd3551615472"),
    group: 'original',
    icon: 'compass',
    copy: UI_navigation_catalog_js.text("text_598c2b992583"),
    lead: UI_navigation_catalog_js.text("text_0d1eec7f9a0d"),
    path: 'hokuto_main.html#room1',
    scope: 'office',
    brief: UI_navigation_catalog_js.text("text_4e92a934f177"),
    tone: 'teal',
    preview: true,
    related: ['ops', 'research']
  }, {
    id: 'strategy',
    name: UI_navigation_catalog_js.text("text_a90ca7f2e365"),
    short: UI_navigation_catalog_js.text("text_c7cc780c94aa"),
    owner: UI_navigation_catalog_js.text("text_4c6f4a72ab36"),
    group: 'original',
    icon: 'folder',
    copy: UI_navigation_catalog_js.text("text_0f92d2965c9f"),
    lead: UI_navigation_catalog_js.text("text_95fec99f4d72"),
    path: 'hokuto_main.html#room2',
    scope: 'office',
    brief: UI_navigation_catalog_js.text("text_24d37264b9c4"),
    tone: 'blue',
    preview: true,
    related: ['recommend', 'ops']
  }, {
    id: 'news',
    name: UI_navigation_catalog_js.text("text_dfb124b74b62"),
    alias: UI_navigation_catalog_js.text("text_96514292048c"),
    group: 'original',
    icon: 'news',
    copy: UI_navigation_catalog_js.text("text_0dd45156a414"),
    lead: UI_navigation_catalog_js.text("text_73cc62f109da"),
    path: 'news_board.html',
    tone: 'teal',
    preview: true,
    related: ['themes', 'research', 'decision']
  }, {
    id: 'themes',
    name: UI_navigation_catalog_js.text("text_c656581fdeb6"),
    group: 'original',
    icon: 'layers',
    copy: UI_navigation_catalog_js.text("text_f39699921847"),
    lead: UI_navigation_catalog_js.text("text_5684b8b7cd19"),
    path: 'theme_news.html',
    tone: 'blue',
    preview: true,
    related: ['news', 'research']
  }, {
    id: 'research',
    name: UI_navigation_catalog_js.text("text_31cc4681b317"),
    legacy: UI_navigation_catalog_js.text("text_6c7ab9af0783"),
    alias: UI_navigation_catalog_js.text("text_9e02879cd4f4"),
    group: 'original',
    icon: 'compass',
    copy: UI_navigation_catalog_js.text("text_8bdbcc23f0be"),
    lead: UI_navigation_catalog_js.text("text_8a7a6d40b1b3"),
    path: 'research_new.html',
    tone: 'teal',
    preview: true,
    related: ['meeting', 'themes']
  }, {
    id: 'recommend',
    name: UI_navigation_catalog_js.text("text_92e026b1baca"),
    short: UI_navigation_catalog_js.text("text_75a6b16bd959"),
    owner: UI_navigation_catalog_js.text("text_4c6f4a72ab36"),
    legacy: UI_navigation_catalog_js.text("text_2d915fa28e0a"),
    alias: UI_navigation_catalog_js.text("text_a491cbf47a88"),
    group: 'original',
    icon: 'check',
    copy: UI_navigation_catalog_js.text("text_0d84182fe731"),
    lead: UI_navigation_catalog_js.text("text_817f2434e05a"),
    path: 'recommend.html',
    tone: 'blue',
    preview: true,
    related: ['strategy', 'decision']
  }, {
    id: 'ops',
    name: UI_navigation_catalog_js.text("text_890dcf1d8f68"),
    short: UI_navigation_catalog_js.text("text_afae0fe1bacc"),
    owner: UI_navigation_catalog_js.text("text_dd3551615472"),
    alias: UI_navigation_catalog_js.text("text_4037391d6a9f"),
    group: 'original',
    icon: 'layers',
    copy: UI_navigation_catalog_js.text("text_9a363a8b818b"),
    lead: UI_navigation_catalog_js.text("text_61f5e9ebb410"),
    path: 'hokuto_today.html',
    tone: 'teal',
    preview: true,
    related: ['meeting', 'strategy']
  }, {
    id: 'decision',
    name: UI_navigation_catalog_js.text("text_dd88b18634c6"),
    group: 'original',
    icon: 'check',
    copy: UI_navigation_catalog_js.text("text_5badafcadae4"),
    lead: UI_navigation_catalog_js.text("text_60cfaa0bb6c6"),
    path: 'decision_room.html',
    tone: 'teal',
    preview: true,
    related: ['recommend', 'performance']
  }, {
    id: 'park',
    name: UI_navigation_catalog_js.text("text_76a1aefeddaa"),
    alias: UI_navigation_catalog_js.text("text_acec36ad2c51"),
    group: 'original',
    icon: 'swap',
    copy: UI_navigation_catalog_js.text("text_2a8a77549b19"),
    lead: UI_navigation_catalog_js.text("text_cf64ceaec4e7"),
    path: 'hokuto_fun.html',
    tone: 'amber',
    preview: true,
    related: ['research', 'news', 'decision']
  }, {
    id: 'signals',
    name: UI_navigation_catalog_js.text("text_d98087ec7474"),
    alias: UI_navigation_catalog_js.text("text_1e4efe8a7c34"),
    group: 'original',
    icon: 'pulse',
    copy: UI_navigation_catalog_js.text("text_95a473f557ef"),
    lead: UI_navigation_catalog_js.text("text_26f361247654"),
    path: 'bnf_signal.html',
    tone: 'violet',
    preview: true,
    related: ['tradingGuide']
  }, {
    id: 'holdings',
    name: UI_navigation_catalog_js.text("text_85ffa900fb6b"),
    legacy: UI_navigation_catalog_js.text("text_27a6e4fde375"),
    alias: UI_navigation_catalog_js.text("text_6ab27595e04b"),
    group: 'original',
    icon: 'wallet',
    copy: UI_navigation_catalog_js.text("text_54a02c587064"),
    lead: UI_navigation_catalog_js.text("text_9ec57d46173d"),
    path: 'holdings_room.html',
    tone: 'teal',
    preview: true,
    related: ['news', 'performance']
  }, {
    id: 'newbuy',
    name: UI_navigation_catalog_js.text("text_c293a16231a7"),
    short: UI_navigation_catalog_js.text("text_c293a16231a7"),
    legacy: UI_navigation_catalog_js.text("text_b156006a7a87"),
    alias: UI_navigation_catalog_js.text("text_ddc36b2d260d"),
    group: 'original',
    icon: 'chart',
    copy: UI_navigation_catalog_js.text("text_316a573dca02"),
    lead: UI_navigation_catalog_js.text("text_5f44b82638c4"),
    path: 'newbuy_room.html',
    tone: 'blue',
    preview: true,
    related: ['decision', 'performance']
  }, {
    id: 'performance',
    name: UI_navigation_catalog_js.text("text_9f8bd408eb48"),
    alias: UI_navigation_catalog_js.text("text_4883ef8b09bb"),
    group: 'original',
    icon: 'book',
    copy: UI_navigation_catalog_js.text("text_7e83a869062b"),
    lead: UI_navigation_catalog_js.text("text_e5217097aa6e"),
    path: 'performance_room.html',
    tone: 'teal',
    preview: false,
    related: ['selection', 'records']
  }, {
    id: 'selection',
    name: UI_navigation_catalog_js.text("text_607cdd7d0722"),
    alias: UI_navigation_catalog_js.text("text_84cf86b292c2"),
    group: 'original',
    icon: 'chart',
    copy: UI_navigation_catalog_js.text("text_738db5800414"),
    lead: UI_navigation_catalog_js.text("text_3c83ffa4cd3b"),
    path: 'selection_results.html',
    tone: 'blue',
    preview: false,
    related: ['performance', 'scores']
  }, {
    id: 'tradingGuide',
    name: UI_navigation_catalog_js.text("text_2547ef5be9a7"),
    legacy: UI_navigation_catalog_js.text("text_79b94a2376e0"),
    alias: UI_navigation_catalog_js.text("text_f4a5c70fe63c"),
    group: 'original',
    icon: 'file',
    copy: UI_navigation_catalog_js.text("text_a3faeda4ad0a"),
    lead: UI_navigation_catalog_js.text("text_22276de8cf56"),
    path: 'trading_logic.html',
    tone: 'amber',
    preview: false,
    related: ['ops', 'signals']
  }, {
    id: 'today',
    name: UI_navigation_catalog_js.text("text_6ec2a46e83a0"),
    group: 'entry',
    icon: 'home',
    copy: UI_navigation_catalog_js.text("text_fde6c841070b"),
    lead: UI_navigation_catalog_js.text("text_57b926a25f88"),
    path: 'ko/today.html',
    tone: 'teal',
    preview: false,
    related: ['holdings', 'decision', 'news']
  }, {
    id: 'office',
    name: UI_navigation_catalog_js.text("text_1455ff1b575b"),
    alias: UI_navigation_catalog_js.text("text_1acc5f7407dc"),
    group: 'entry',
    icon: 'home',
    copy: UI_navigation_catalog_js.text("text_101ca4447de3"),
    lead: UI_navigation_catalog_js.text("text_41b667742876"),
    path: 'hokuto_main.html',
    tone: 'amber',
    preview: false,
    related: ['today', 'news', 'decision']
  }, {
    id: 'records',
    name: UI_navigation_catalog_js.text("text_425c682a8ba8"),
    alias: UI_navigation_catalog_js.text("text_c8625dba37ee"),
    group: 'preview',
    icon: 'book',
    copy: UI_navigation_catalog_js.text("text_4f4aeafb61ae"),
    lead: UI_navigation_catalog_js.text("text_cbc2ca185653"),
    tone: 'teal',
    preview: true,
    related: ['scores', 'performance', 'selection']
  }, {
    id: 'scores',
    name: UI_navigation_catalog_js.text("text_038ae9c26a52"),
    group: 'preview',
    icon: 'chart',
    copy: UI_navigation_catalog_js.text("text_1116fed00ac6"),
    lead: UI_navigation_catalog_js.text("text_709266285269"),
    tone: 'blue',
    preview: true,
    related: ['records', 'performance', 'selection']
  }];
  const workflow = ['meeting', 'ops', 'strategy', 'recommend', 'decision', 'newbuy'];
  const sections = [{
    id: 'check',
    title: UI_navigation_catalog_js.text("text_e347f41db7d6"),
    copy: UI_navigation_catalog_js.text("text_a90fb5dbf9f5"),
    icon: 'wallet',
    items: ['holdings', 'news', 'themes']
  }, {
    id: 'review',
    title: UI_navigation_catalog_js.text("text_67160c37a550"),
    copy: UI_navigation_catalog_js.text("text_0576c5f99ca6"),
    icon: 'book',
    items: ['park', 'performance', 'selection']
  }, {
    id: 'reference',
    title: UI_navigation_catalog_js.text("text_39a5acc97cde"),
    copy: UI_navigation_catalog_js.text("text_e2fca252fcf0"),
    icon: 'layers',
    items: ['research', 'signals', 'tradingGuide']
  }];
  const aliases = {
    manager: 'strategy',
    trading: 'newbuy',
    space: 'office',
    themeLab: 'research'
  };
  const resolve = id => aliases[id] || id;
  function normaliseBase(value) {
    let url;
    try {
      url = new URL(String(value).trim());
    } catch {
      throw new Error(UI_navigation_catalog_js.text("text_fd11e898c3d9"));
    }
    if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) throw new Error(UI_navigation_catalog_js.text("text_feea103171a2"));
    const match = url.pathname.match(/^(.*\/hokuto)(?:\/|$)/);
    if (!match) throw new Error(UI_navigation_catalog_js.text("text_c6e3def0de43"));
    const korean = /^\/ko(?:\/|$)/.test(url.pathname.slice(match[1].length));
    url.pathname = match[1] + (korean ? '/ko/' : '/');
    url.search = '';
    url.hash = '';
    return url.href;
  }
  function destination(id, base) {
    const item = catalog.find(m => m.id === resolve(id));
    if (!item?.path) throw new Error(UI_navigation_catalog_js.text("text_a21ef27c397a"));
    const address = new URL(normaliseBase(base));
    if ((item.group === 'entry' || item.scope === 'office') && address.pathname.endsWith('/ko/')) address.pathname = address.pathname.slice(0, -3);
    return new URL(item.path, address).href;
  }
  const api = {
    catalog,
    sections,
    workflow,
    resolve,
    normaliseBase,
    destination
  };
  if (typeof window !== 'undefined') window.HokutoLinks = api;
  if (typeof module !== 'undefined') module.exports = api;
})();
