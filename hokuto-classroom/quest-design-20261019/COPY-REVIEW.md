# 문구표와 재검토 — 2026-10-20

## 원본과 승인 상태

**실행 문구의 유일한 원본은 ui-copy.js입니다.** copy(의미 있는 공통 키), entries(기존 고정 문구), templates(동적 HTML 문구와 자리표시자)를 한 파일에서 관리합니다. 이 문서는 검토용 색인이며 두 번째 실행 원본이 아닙니다.

사용자가 전달한 최종판을 시안에 반영했습니다. 새 문구·새 상태는 크기에 관계없이 범준 확인과 Claude 웹 재검토가 필요합니다. 해당 승인을 완료했다고 기록하지 않습니다. 이전 시안에서 이어받은 안내도 함께 검토합니다.

| 검토 대상 | 문구표 위치 | 적용 |
|---|---|---|
| 집중 정의·대상 | copy.focus.rule / sourceHelp | 작전실·전략실 |
| ★와 집중의 분리 | copy.focus.starTitle / outside / membership | 작전실·종목 목록·후보 |
| 집중 아님 | copy.focus.notFocus / notFocusHelp | 결정실의 중립 안내 |
| 선정 출처 | copy.focus.sourceABC / sourceD | 각 후보의 실제 레인 표시 |
| 날짜별 규칙 | copy.focus.current / legacy / historicalHelp | 두 성과 화면 |
| 1·2·3개월 및 대기 | copy.focus.month1~3 / pending / availableResults | 20·40·60거래일 및 추정 일정 |
| 집중 명단 변화 | copy.focus.dailyChanged / dailyFirst / dailyUnchanged | 알림홈 최상단 |
| 제목 버튼 | copy.titleKorean / titleOriginal | 지금 한국어 · 원문 보기 / 지금 원문 · 한국어 보기 |
| 번역 상태 | copy.titleQueued / titleRejected / titleAI | 대기·검사 탈락·AI 번역 |

## 호출 방식

- JS: `HokutoText.text(key)`, `HokutoText.tpl(key, ...values)`, `HokutoText.copy`.
- HTML: `data-copy` / `data-copy-attrs`. copy-dom.js가 화면 초기화 전에 채움. 메뉴 검색 속성과 접근성 이름도 같은 원본 사용.
- CSS의 글자 content도 문구표에서 CSS 변수로 주입. 이전 화면에 영향을 주지 않도록 필요한 기본 스타일만 시안 안에 복사.
- fixture의 원래 상태 문자열·판정 비교는 `raw(key)`로 보존. 번역된 표시 문구를 점수·분기·정렬 입력으로 사용하지 않음.
- 향후 일본어 문구는 `HokutoTranslations`의 대응 키로 추가 가능. 원문과 번역의 동적 자리표시자 개수·순서를 유지. 현재 일본어 화면은 만들지 않음.
- UI 고정 문구와 기사 콘텐츠는 구분. 현재 newsTitles에 들어 있는 원문·번역은 전환 시연용 가상 자료로 운영 이관 금지.

## 제목 버튼

- 한국어 페이지를 새로 열면 번역 기본. 이전 원문 보기 저장값은 초기 상태에 적용하지 않음.
- 같은 페이지에서 사용자가 누른 선택은 화면 이동 중 유지. 사무실에는 버튼 없음.
- 한국어 화면에서도 번역이 없으면 원문 유지. 최근 30~60분 번역 차례 대기와 검사 탈락을 구분. 약 3%는 전달받은 설명이며 개별 기사의 확률처럼 표시하지 않음.
- 언어 설정이 일본어인 경우 원문 기본으로 연결할 준비만 함. 일본어 공개는 12월 이후 별도 일정·검토.

기존 COPY-REVIEW의 ‘새로고침 후에도 원문 모드 유지’, ‘일부 문구만 통합’, ‘로봇 완료 후 디자인 반영’ 지침은 이 문서로 대체합니다.
