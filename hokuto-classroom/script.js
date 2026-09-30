// 동작 수업: 캐릭터와 버튼을 누르면 아래의 학원용 예시 창이 열립니다.
// 운영 북두의 실시간 자료나 매매 판단에는 절대 연결되지 않습니다.
const actors = [
  ['newsroom', '윈터', 'sd-winter', '41%'],
  ['research', '준', 'sd-jun', '39%'], ['research', '시그마', 'sd-sigma', '69%'],
  ['manager', '하루', 'sd-haru', '39%'], ['manager', '코덱스', 'sd-codex', '68%'],
  ['boss', '사장', 'sd-boss', '39%'], ['boss', '윈터', 'sd-winter', '69%'],
  ['bnf', '그록', 'sd-grok', '45%'],
  ['trading', '리쿠', 'sd-riku', '35%'], ['trading', '시그마', 'sd-sigma', '70%']
];
const examples = {
  newsroom: '학원용 예시: 뉴스 한 건을 눌러 날짜와 출처를 확인하는 방입니다. 실제 기사는 가져오지 않습니다.',
  research: '학원용 예시: 업종을 살펴보는 방입니다. 실제 종목 점수나 주가는 없습니다.',
  manager: '학원용 예시: 후보를 정리하는 방입니다. 여기의 정보는 매수 추천이 아닙니다.',
  boss: '학원용 예시: 좋은 점과 반대 근거를 나란히 놓아 보는 방입니다.',
  bnf: '학원용 예시: 별도 전략을 공부하는 방입니다. 실제 신호를 표시하지 않습니다.',
  trading: '학원용 예시: 버튼과 팝업을 연습하는 방입니다. 실제 계좌나 보유 주식은 없습니다.'
};
const popup = document.querySelector('#example-popup');
const title = document.querySelector('#popup-title');
const message = document.querySelector('#popup-message');
function openExample(roomId, kind) {
  const room = document.getElementById(roomId);
  if (!room || !Object.hasOwn(examples, roomId)) return;
  title.textContent = room.querySelector('h3').textContent + (kind === 'brief' ? ' · 브리핑' : ' · 방 보기');
  message.textContent = examples[roomId];
  popup.showModal();
}
for (const [roomId, name, symbol, left] of actors) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'actor';
  button.style.setProperty('--left', left);
  button.setAttribute('aria-label', name + '에게 ' + document.querySelector('#' + roomId + ' h3').textContent + ' 안내 듣기');
  const sprite = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  sprite.setAttribute('viewBox', '0 0 32 48');
  sprite.setAttribute('aria-hidden', 'true');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('href', '#' + symbol);
  sprite.append(use);
  const label = document.createElement('span');
  label.textContent = name;
  button.append(sprite, label);
  button.addEventListener('click', () => openExample(roomId, 'brief'));
  document.querySelector('#' + roomId).append(button);
}
document.querySelectorAll('[data-room]').forEach(button => {
  button.addEventListener('click', () => openExample(button.dataset.room, button.dataset.kind));
});
// 주소 끝에 ?check를 붙이면 간단한 동작 시험을 실행합니다.
if (location.search === '?check') {
  if (document.querySelectorAll('.actor').length !== actors.length) throw Error('캐릭터가 빠졌습니다');
  for (const roomId of Object.keys(examples)) {
    if (document.querySelectorAll('#' + roomId + ' [data-room]').length !== 2) throw Error(roomId + ' 버튼이 빠졌습니다');
    openExample(roomId, 'brief');
    if (!popup.open || !message.textContent.includes('학원용 예시')) throw Error(roomId + ' 예시 창 오류');
    popup.close();
  }
  console.info('학원 화면 확인 완료');
}
