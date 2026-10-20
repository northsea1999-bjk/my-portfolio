# 호쿠토증권 문구 검토 — v9-final1020b

모든 자료는 가상입니다. 운영 반영의 증거가 아님. 실행 문구의 유일한 원본은 ui-copy.js입니다. 이 문서는 검토용 목록이며 새 문구 승인 완료를 뜻하지 않습니다.

## 1. 확정 요청 문구와 위치

| 위치 | 문구 |
|---|---|
| copy.focus.rule | 집중 3개 = 6개월 추세가 플러스인 테마 중, 최근 20거래일 수익이 큰 상위 3개 테마 |
| copy.focus.starHelp | ★ 6개 = 테마별 종목들의 최근 20거래일 수익 평균 상위 6개 테마 |
| copy.focus.title | 집중 테마 3개 |
| copy.focus.notFocus | 집중 테마가 아님 |
| copy.focus.notFocusHelp | ★ 테마이지만 집중 테마 3개에 속하지 않습니다. 나쁨·제외 판정이 아닙니다. |
| copy.focus.legacy / transition / current | 옛 규칙 / 전환일 / 집중 규칙 |
| copy.focus.homeScore | 집중 테마의 A·B·C 선정 종목 |
| entries.text_f2578f32a03b | 집중 테마 선정성적 |
| copy.focus.dailyExpand | 집중 테마 변화 |
| templates.focus_waiting | 결과 기다리는 중 (남은 거래일 N일) |
| copy.focus.beforeStart | 이 기간은 기록 시작 전 |
| copy.focus.missingPrice | 가격을 못 구함 |
| copy.focus.unverified | 확인 필요 |
| copy.focus.sample / sampleUnit | 표본 N건 |

‘집중 테마가 아님’은 중립 회색입니다. 집중 테마 변화와 종목의 선정 결과를 구분합니다. 후보 출처는 기록된 레인을 표시하며 테마 표시만으로 종목을 새로 선정하지 않습니다.

## 2. 날짜 안내의 단일 원본

- copy.focus.first40Estimate: ‘40일 첫 결과는 11/9 무렵(추정 · 확인 필요).’
- copy.focus.first20FocusEstimate: ‘집중 규칙의 20일 첫 결과는 11월 중순(추정).’
- copy.focus.estimateConflict: ‘40일 기록 시작 기준과 첫 결과 예상일은 서로 맞지 않아 확인 필요합니다.’

위 예상일은 ui-copy.js에서만 바꿉니다. 전환 경계 시각은 문구가 아니라 display-policy.js의 설정값이며 화면에 직접 쓰지 않습니다. 실제 기록 확인 전에는 확정으로 표시하지 않습니다.

## 3. 제목·한자·기존 안내

제목 버튼은 오늘·뉴스룸·테마뉴스·보유 네 곳에만 두고 새 페이지는 한국어로 시작합니다. ‘지금 한국어 · 원문 보기 / 지금 원문 · 한국어 보기’, 번역 차례 대기, 검사 탈락, AI 번역 표시는 유지합니다. 사무실에는 버튼이 없습니다.

시안의 일본어 가상 제목은 회사명 원문 외 한자가 없도록 표시 문구만 고쳤습니다. 실제 기사 원문이나 번역 엔진을 변경한 것이 아닙니다. 실제 일본어 원문 제목에 회사명 외 한자가 있을 때의 표시 방식은 범준 확인이 필요하며 자동 변환을 추가하지 않습니다.

가상 자료 및 ‘운영 반영의 증거가 아님’ 안내를 유지합니다. 새 문구·새 상태는 범준 확인과 Claude 웹 재검토 대상입니다.

## 4. 호출과 범위

JS는 copy·text·tpl, HTML은 data-copy·data-copy-attrs를 통해 같은 문구표를 사용합니다. 판정 비교에 쓰는 원래 값은 raw로 보존합니다. 번역된 표시 문구를 선정·점수·정렬 입력으로 쓰지 않습니다.

검색·수정 범위는 현행 화면, ui-copy.js, REVIEW.md, APPLY-20261020.md, COPY-REVIEW.md 및 이전 검토 기록의 테마 표현입니다. 이전 검토 기록은 현행 지침이 아닙니다.
