const UI_focus_views_js=typeof window==='undefined'?require('./ui-copy.js'):window.HokutoText;
const FMT_focus_views_js=typeof window==='undefined'?require('./display-format.js'):window.HokutoFormat;
"use strict";

/* Rendering for the requested rule. All new display copy lives in ui-copy.js. */
(function (root) {
  'use strict';

  function create(api) {
    const {
      stocks,
      esc,
      badge,
      signed,
      latest,
      openDialog,
      getState,
      route
    } = api;
    const F = root.HokutoFocus,
      T = root.HokutoText.copy.focus;
    const R = root.HokutoPerformanceDisplay;
    const records = api.resultRecords || R.fixtureRecords(F.events, stocks);
    const periodLabel = key => ({legacy:T.legacy,transition:T.transition,focus:T.current})[key] || T.unverified;
    const theme = id => F.themes.find(t => t.id === id);
    const stock = id => stocks.find(s => s.id === id);
    const chips = (values, current, key, label) => `<div class="focus-switch" role="group" aria-label="${label}">${values.map(([value, text]) => `<button type="button" data-${key}="${value}" aria-pressed="${current === value}">${text}</button>`).join('')}</div>`;
    const source = (id, lanes, event = null) => {
      const t = F.themeForStock(id),
        abc = lanes.filter(l => ['A', 'B', 'C'].includes(l));
      const focused = event ? F.focusForEvent(event) : F.focusForStock(id),
        outside = event ? event.starAtSelection === false : t && !t.star;
      const period = event ? F.periodFor(event) : 'focus';
      const label = event && period!=='focus' ? periodLabel(period)+(lanes.length?' · '+lanes.join('·'):'') : abc.length && focused===true ? T.sourceABC+' '+abc.join('·') : lanes.includes('D') ? T.sourceD : T.sourceUnknown;
      return `<div class="focus-source" aria-label="${T.candidateSource}">${badge(label,period==='focus'&&focused===true&&abc.length?'teal':period==='focus'&&lanes.includes('D')?'blue':'gray')}${focused===true&&outside?badge(T.outside,'amber'):''}</div>`;
    };
    function operations() {
      return `<section class="focus-hero"><div class="focus-heading"><div><span class="focus-kicker">02 · ${T.fixture}</span><h2>${T.title}</h2><p>${T.rule}</p></div><span class="focus-count">3<span> / A·B·C</span></span></div><div class="focus-theme-grid">${F.focusIds.map((id, n) => {
        const t = theme(id);
        return `<article class="focus-theme-card"><span class="focus-rank">0${n + 1}</span><h3>${t.name}</h3>${badge(T.title, 'teal')}${t.star ? badge('★', 'gray') : badge(T.outside, 'amber')}<dl><div><dt>${T.trend}</dt><dd>+ ${T.positive}</dd></div><div><dt>${T.return20}</dt><dd>${signed(t.return20)}</dd></div></dl></article>`;
      }).join('')}</div><p class="focus-route-note">${T.scope}</p></section><section class="room-paper room-reading"><div class="section-headline"><div><h2>${T.starTitle}</h2><p>${T.starHelp}</p></div></div><div class="star-theme-list">${F.themes.filter(t => t.star).map(t => `<div><strong>★ ${t.name}</strong>${F.focusIds.includes(t.id) ? badge(T.title, 'teal') : badge(T.notFocus, 'gray')}${t.money ? badge(T.money, 'amber') : ''}${t.converted ? badge(T.converted, 'teal') : ''}<small>${T.trend}: ${t.trend6m > 0 ? T.positive : T.negative}</small></div>`).join('')}</div><p class="metric-note">${T.noTradeSignal}</p></section><section class="room-paper room-reading"><h2>${T.money}</h2><div class="focus-inline-themes">${F.themes.filter(t => t.money).map(t => `<span>${t.name}${t.converted ? ` · ${T.converted}` : ''}</span>`).join('')}</div><p>${T.dScope}</p></section>`;
    }
    function nonFocusStars() {
      return `<section class="focus-neutral"><h3>${T.notFocus}</h3><p>${T.notFocusHelp}</p><div class="focus-inline-themes">${F.themes.filter(t => t.star && !F.focusIds.includes(t.id)).map(t => `<span>★ ${t.name}</span>`).join('')}</div></section>`;
    }
    function daily() {
      const changed = stocks.filter(s => s.changed),
        delta = F.changeSummary(F.focusIds, F.previousFocusIds);
      const dailyTitle = delta.kind === 'changed' ? T.dailyChanged : delta.kind === 'unchanged' ? T.dailyUnchanged : T.dailyFirst;
      return `<div class="daily-brief-title"><h2>${T.daily}</h2><span>${T.dailyLabel}</span></div><div class="focus-daily"><span class="focus-kicker">${T.title} → A·B·C</span><h3>${dailyTitle}</h3><p>${T.dailyHelp}</p><div class="focus-inline-themes">${F.focusIds.map(id => `<span>${theme(id).name}${!theme(id).star ? ` <b>${T.outside}</b>` : ''}</span>`).join('')}</div><details><summary>${T.dailyExpand}</summary><p>${T.rule}</p><p>${T.scope}</p><p>${delta.kind === 'initial' ? T.dailyInitial : delta.kind === 'changed' ? T.entered + ' ' + delta.entered.map(id => theme(id).name).join(', ') + ' / ' + T.exited + ' ' + delta.exited.map(id => theme(id).name).join(', ') : T.dailyUnchanged}</p></details><details><summary>${T.dailyOther}</summary><p class="metric-note">${T.dailyOtherHelp}</p>${changed.map(s => `<div class="focus-daily-item"><strong>${esc(s.name)}</strong><p>${esc(latest(s).change)}</p></div>`).join('')}</details></div>`;
    }
    function resultCell(e, days, metric) {
      const state=R.cell(e,days,metric);
      if(state.kind==='value')return signed(state.value,metric==='stock'?'%':'%p');
      const label=state.kind==='waiting'?UI_focus_views_js.tpl('focus_waiting',state.remaining):state.kind==='before-start'?T.beforeStart:state.kind==='missing-price'?T.missingPrice:T.unverified;
      return `<span class="focus-pending" data-result-state="${state.kind}">${label}</span>`;
    }
    function results(kind='selection',home=false) {
      const state=getState(),version=home?'focus':['legacy','transition','focus'].includes(state.ruleVersion)?state.ruleVersion:root.HokutoDisplayPolicy.defaultPeriod;
      const scope=home?'abc':version==='focus'?state.resultScope||'all':'all';
      const metric=kind==='performance'?'stock':state.resultMetric||'stock';
      const rows=F.rowsFor(version,scope,records),performance=kind==='performance';
      const laneTotals=F.laneCounts(version,scope,records);
      const laneLine=laneTotals?['A','B','C','D'].map(l=>l+' '+laneTotals[l]).join(' · ')+' · LANE_NONE '+laneTotals.none:T.unverified;
      const counts=days=>rows.filter(e=>R.cell(e,days,metric).kind==='value').length;
      const headings=[[20,T.month1],[40,T.month2],[60,T.month3]].map(([days,label])=>`<th>${label}<small>${T.sample} ${counts(days)}${T.sampleUnit}</small></th>`).join('');
      const explanation=version==='legacy'?T.periodLegacy:version==='transition'?T.periodTransition:T.periodFocus;
      const estimateGroups=version==='legacy'?[T.estimatesLegacy]:version==='focus'?[T.estimatesFocus]:[T.estimatesLegacy,T.estimatesFocus];
      const estimates=estimateGroups.map(group=>`<p class="metric-note"><strong>${group.basis}</strong> ${[group.first20,group.first40,group.first60,group.checkpoint].filter(Boolean).join(' ')}</p>`).join('');
      return `<section class="focus-results"><div class="focus-results-heading"><span class="focus-kicker">${T.fixture}</span><h2>${home?T.homeScore:performance?T.performance:T.selection}</h2><p>${home?T.homeScoreHelp:performance?T.performanceHelp:T.selectionHelp}</p></div>${home?'':chips([['legacy',T.legacy],['transition',T.transition],['focus',T.current]],version,'rule-version',T.version)}<p class="metric-note">${explanation}</p>${!home&&version==='focus'?chips([['all',T.allSources],['abc',T.abc],['d',T.d]],scope,'result-scope',T.source):''}${!performance?chips([['stock',T.stockReturn],['theme',T.themeExcess],['market',T.marketExcess]],metric,'result-metric',T.metric):''}<p class="focus-sample-note">${T.signalCount} ${laneTotals?laneTotals.total:T.unverified} · ${T.resultCount} ${rows.length} · ${T.smallSample}</p><p class="metric-note">${T.laneEventCounts}: ${laneLine}</p><div class="focus-table-scroll" tabindex="0" aria-label="${performance?T.performance:T.selection}"><table class="focus-result-table"><thead><tr><th>${T.stock}</th><th>${T.source}</th>${performance?`<th>${T.decision}</th>`:''}${headings}</tr></thead><tbody>${rows.map(e=>`<tr data-result-event="${e.id}"><td><button data-focus-event="${e.id}">${esc(stock(e.stockId).name)}</button><small>${FMT_focus_views_js.date(e.date,'iso')} · ${theme(e.themeId).name}</small><small>${e.entryVerified?T.entryDate+' '+FMT_focus_views_js.date(e.entryDate,'iso')+' · '+T.entryPrice+' '+FMT_focus_views_js.currency(e.entryPrice):T.entryUnverified}</small>${e.sameDayDuplicate?badge(UI_focus_views_js.tpl('same_day_duplicate',e.sameDayDuplicate),'gray'):''}${e.sourceEventIds.length>1?`<small>${T.sourceSignals} ${e.sourceEventIds.length}</small>`:''}</td><td>${source(e.stockId,e.lanes,e)}</td>${performance?`<td>${e.decision||T.noDecision}</td>`:''}${[20,40,60].map(days=>`<td>${resultCell(e,days,metric)}</td>`).join('')}</tr>`).join('')||`<tr><td colspan="${performance?6:5}">${T.empty}</td></tr>`}</tbody></table></div><p class="metric-note">${home?T.homeScoreNote:T.historicalHelp}</p><p class="metric-note">${T.dedupHelp}</p><p class="metric-note">${T.missingNote}</p><p class="metric-note">${T.markHelp}</p><details class="focus-archive"><summary>${T.shortTerm}</summary><div class="focus-table-scroll"><table class="focus-result-table"><thead><tr><th>${T.stock}</th><th>1${T.day}</th><th>5${T.day}</th></tr></thead><tbody>${rows.map(e=>`<tr><td>${esc(stock(e.stockId).name)}</td><td>${resultCell(e,1,metric)}</td><td>${resultCell(e,5,metric)}</td></tr>`).join('')}</tbody></table></div></details>${estimates}<p class="metric-note">${T.estimateCalendarNote}</p></section>`;
    }
    function eventDetail(id) {
      const e = records.find(x => x.id === id);
      if (!e) return;
      const s = stock(e.stockId),
        r = s.records.find(x => x.date === e.date);
      openDialog(UI_focus_views_js.tpl("template_063be1186831", e.date, periodLabel(F.periodFor(e)), esc(s.name), T.eventDetail, theme(e.themeId).name, source(s.id, e.lanes, e), T.decision, r ? esc(r.summary) : T.unlinked, r ? `<button class="room-text-link" data-local-record="${s.id}" data-record-date="${r.date}">${T.detail}</button>` : '', T.historicalHelp));
    }
    function onClick(b) {
      if (b.dataset.ruleVersion) {
        route({
          ruleVersion: b.dataset.ruleVersion,
          resultScope: 'all'
        }, true);
        return true;
      }
      if (b.dataset.resultScope) {
        route({
          resultScope: b.dataset.resultScope
        }, true);
        return true;
      }
      if (b.dataset.resultMetric) {
        route({
          resultMetric: b.dataset.resultMetric
        }, true);
        return true;
      }
      if (b.dataset.focusEvent) {
        eventDetail(b.dataset.focusEvent);
        return true;
      }
      return false;
    }
    return {
      operations,
      daily,
      results,
      source,
      onClick,
      nonFocusStars
    };
  }
  root.HokutoFocusViews = {
    create
  };
})(window);
