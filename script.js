const container = document.getElementById('game_container');
const start = document.getElementById('start_btn');
const timer = document.getElementById('timer');
const counter = document.getElementById('counter');
const restart = document.getElementById('restart_btn');
const modal = document.querySelector('.modal');
const modalP = document.querySelector('.modal_p');

// 전역변수
var counterNum = 10;
var failCounter = 2;

// 재시작 버튼 핸들러
function handleRestart() {
  restart.addEventListener('click', ()=> {
  modal.style.display = 'none';
  handleStartBtn();
  });
}
// 게임 실패 시 모달창 핸들러
function fail(timer) {
  clearInterval(timer);
  modalP.innerText = 'You Lost 💩';
  modal.style.display = 'flex';
  handleRestart();
}

// 카운터 핸들러
function minusCount() {
  if(counterNum > 0) {
    counterNum--;
    counter.innerHTML = counterNum;
  }
  if(counterNum == 0) {
    modal.style.display = 'flex';
    handleRestart();
  }
}
// 벌레 당근 위치 무작위 지정
function getRandomPosition(element) {
  // 컨테이터 넓이, 높이 구하기
  const containerRect = container.getBoundingClientRect();
  const x = containerRect.width;
  const y = containerRect.height;
  // 넓이범위 : 0 ~ 넓이 최대값
  const randomX = Math.floor(Math.random() * x*0.90);
  // 높이범위 : 높이/2 ~ 높이 최대값
  const randomY = Math.floor(Math.random() * y*0.45);
  // 컨테이너 내부에 당근,벌레 위치 임의 설정
  element.style.transform = `translate(${randomX}px, ${randomY}px)`;
}
// 벌레 만들기
function makeBug() {
  const bug = document.createElement('img');
  bug.classList.add('bug');
  bug.src = './../images/bug.png';
  container.appendChild(bug);
  getRandomPosition(bug);
  // 벌레 클릭 시 게임 오버
  bug.addEventListener('click', (e) => {
    console.dir(e.target)
    if(failCounter > 0) {
      failCounter--;
    }
  })
}
// 당근 만들기
function makeCarrot() {
  const carrot = document.createElement('img');
  carrot.classList.add('carrot');
  carrot.src = './../images/carrot.png';
  container.appendChild(carrot);
  getRandomPosition(carrot);
  // 당근 클릭 성공 시 당근 제거 및 카운트 감소
  carrot.addEventListener('click',(e) => {
    minusCount();
    e.target.remove();
  })
}
// 시작버튼 핸들러
modal.style.display = 'none';
function handleStartBtn() {
  var time = 10;
  // 만일 화면에 벌레가 있다면, 모든 벌레와 당근을 제거(화면 초기화)
  const bugs = document.querySelectorAll('.bug');
  const carrots = document.querySelectorAll('.carrot');
  bugs.forEach(bug => bug.remove());
  carrots.forEach(carrot => carrot.remove());
  // 당근, 벌레 각 10개씩 화면에 무작위 배치
  for(i=0;i<10;i++) {
    makeCarrot();
    makeBug();
  }
  // 카운터 10, 경고 2로 지정
  failCounter = 2;
  counterNum = 10;
  counter.innerHTML = counterNum;
  // 타이머 숫자 00:10 시작
  timer.innerText = `00:${time}`;
  // 타이머 1초씩 감소
  const handleTimer = setInterval(() => {
    time--
    time = String(time).padStart(2, '0');
    timer.innerText = `00:${time}`;
    if(time < 1) {
      // ** 타이머가 숫자가 00:00이 되면 실패 모달 띄우기 **
      fail(handleTimer);
    }
    // 당근 모두 클릭 성공했을 시, 타이머 중지.
    if(counterNum == 0) {
      clearInterval(handleTimer);
    }
    // 경고 카운터가 0 이하일 경우 게임 실패.
    if(failCounter == 0) {
      fail(handleTimer);
    }
  }, 1000);
}
// ** 시작 버튼을 누르면 **
start.addEventListener('click', handleStartBtn);
