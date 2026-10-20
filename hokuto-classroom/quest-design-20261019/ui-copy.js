/* Display copy only. Do not use this catalog as input to scoring or selection. */
(function(root){
  'use strict';
  const copy=Object.freeze({
    focus:Object.freeze({
      title:'집중 3개',rule:'6개월 추세가 플러스인 테마 중 20일 수익률 상위 3개 · ★ 밖 테마도 포함',
      scope:'집중 3개 → 레인 A·B·C / 레인 D는 기존의 넓은 명단 유지',
      fixture:'10.20 규칙 적용 · 테마와 선정 종목은 가상 예시',
      starTitle:'★ 주도 6개',starHelp:'기존 주도 테마 목록을 유지합니다. A·B·C 대상은 위의 집중 3개입니다.',
      outside:'★ 밖 집중',inside:'★ 주도 · 집중',trend:'6개월 추세',positive:'플러스',negative:'마이너스',return20:'20일 수익률',
      candidateSource:'선정 출처',sourceABC:'집중 →',sourceD:'레인 D · 넓은 명단',sourceUnknown:'선정 출처 미확인',
      sourceHelp:'A·B·C는 집중 3개에서, D는 기존의 넓은 명단에서 찾습니다. 여러 레인에 선정돼도 같은 회차의 종목은 한 번만 셉니다.',
      version:'규칙 버전',current:'집중3 · 10/20~',legacy:'★6 · ~10/19',allSources:'전체 출처',abc:'집중 → A·B·C',d:'레인 D',
      performance:'성과기록',performanceHelp:'선정 당시의 판단·근거와 이후 결과를 규칙별로 돌아봅니다.',
      selection:'선정성적',selectionHelp:'선정 당시 규칙과 출처를 기준으로 1·2·3개월 성적을 비교합니다.',
      homeScore:'집중 3개에서 선정된 종목',homeScoreHelp:'10/20 이후 집중 테마에서 A·B·C로 선정된 종목만 표시합니다.',
      historicalHelp:'과거 기록은 당시 규칙으로 유지합니다. 오늘의 집중 명단으로 과거 성적을 다시 분류하지 않습니다.',
      homeScoreNote:'레인 D에만 선정된 종목은 제외합니다. A·B·C와 D 중복 선정은 한 번만 표시합니다.',
      cohort:'선정 종목',completed:'평가 완료',firstReview:'첫 1개월 평가',firstReviewDate:'11/20 이후',
      pending:'평가 대기',missing:'자료 없음',noDecision:'판정 자료 미연결',month:'개월',stock:'종목 / 선정일',source:'선정 출처',decision:'당시 판단',
      stockReturn:'종목 수익률',themeExcess:'테마 대비',marketExcess:'시장 대비',metric:'성과 기준',
      missingNote:'새 규칙은 평가 기간이 지나지 않았습니다. 과거 20거래일 성적을 1개월 성적으로 바꾸거나, 없는 값을 0%로 채우지 않습니다.',
      archived:'기존 20거래일 성적 · 과거 기록',archivedHelp:'별도로 보존한 예시입니다. 위 1·2·3개월 칸과 합산하지 않습니다.',
      detail:'당시 기록 보기',eventDetail:'선정 회차 기록',unlinked:'10/20 선정 시점의 분석·가격 자료는 아직 연결되지 않았습니다. 10/16 자료를 오늘의 판단으로 바꾸지 않습니다.',
      empty:'해당 규칙·출처의 선정 기록이 없습니다.',
      daily:'하루 변화',dailyFirst:'집중 3개 적용 시작',dailyLabel:'10/20 · 새 규칙',dailyHelp:'오늘부터 이 3개 테마가 A·B·C 대상입니다.',
      dailyInitial:'첫 적용일이므로 이전 집중 명단과의 교체 건수는 표시하지 않습니다.',dailyExpand:'집중 명단과 변경 내용',
      dailyOther:'종목·뉴스 변화 함께 보기',dailyOtherHelp:'아래 내용은 10/13 → 10/16 가상 자료 비교입니다.',
      opsLead:'★ 주도 6개를 유지하며 집중 3개를 A·B·C의 테마 대상으로 사용합니다.',strategyLead:'집중 3개에서 나온 A·B·C와 기존 넓은 명단의 D를 출처별로 확인합니다.',
      membership:'집중 테마',noTradeSignal:'테마·후보 선정은 매수 신호가 아닙니다.',
      reviewMenu:'판단 뒤의 결과와 기록',performanceMenuHelp:'판단·근거와 이후 결과',selectionMenuHelp:'규칙별 1·2·3개월 성적'
    }),
    brandSubtitle:'SECURITIES',
    titleKorean:'제목: 한국어',
    titleOriginal:'제목: 일본어 원문',
    titleShowOriginal:'제목을 일본어 원문으로 보기',
    titleShowKorean:'제목을 한국어로 보기',
    titleJapaneseDemo:'일본어 예시',
    titleUnavailable:'일본어 원문 없음 · 기존 제목',
    titleDemoNotice:'일본어 제목도 전환 시연을 위해 만든 가상 문구입니다.',
    titleChangedKorean:'제목을 한국어로 표시합니다.',
    titleChangedOriginal:'일본어 예시 제목을 표시합니다. 일본어 원문이 없는 항목은 기존 제목을 유지합니다.'
  });
  // Synthetic display examples, not retrieved Japanese source articles.
  // Production must replace these with existing original/translated fields.
  const demoJapaneseTitles=Object.freeze({
    contract:'ホクト半導体、42億円の装置供給契約を締結',
    game:'アオイゲームズ、通期営業利益予想を120億円から108億円へ下方修正',
    ai:'セイウンソフト、法人契約の増加を受け利益予想を上方修正',
    parts:'ハルカ電子、四半期の生産計画と通期見通しを据え置き'
  });
  const selectTitle=(id,fallback,mode)=>({
    text:mode==='original'&&demoJapaneseTitles[id]?demoJapaneseTitles[id]:fallback,
    lang:mode==='original'&&demoJapaneseTitles[id]?'ja':'ko',
    note:mode==='original'?(demoJapaneseTitles[id]?copy.titleJapaneseDemo:copy.titleUnavailable):''
  });
  const api=Object.freeze({copy,demoJapaneseTitles,selectTitle});
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.HokutoText=api;
})(typeof window==='undefined'?{}:window);
