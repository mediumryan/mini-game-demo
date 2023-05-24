'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const game = document.querySelector('.game');
const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const popUp = document.querySelector('.pop-up');
const popUpMessage = document.querySelector('.pop-up__message');
const popUpRefresh = document.querySelector('.pop-up__refresh');

let started = false;
let score = 0;
let timer = undefined;

// 게임 버튼 핸들러
function handleGameBtn() {
  if(started) {
    stopGame();
  } else {
    startGame();
  }
  started = !started;
}

function startGame() {
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
}

function stopGame() {
  stopGameTimer();
  hideGameButton();
  showPopUp('Replay? 😐');
}

function showStopButton() {
  const icon = gameBtn.querySelector('.fa-play');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
}

function showTimerAndScore() {
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
     if(remainingTimeSec <= 0 ) {
       clearInterval(timer);
       return;
     }
    updateTimerText(--remainingTimeSec);
  }, 1000);
};

function stopGameTimer() {
  clearInterval(timer);
}

function hideGameButton() {
  gameBtn.style.visibility = 'hidden';
}

function showPopUp(text) {
  popUpMessage.innerText = text;
  popUp.classList.remove('pop-up__hide');
}

function updateTimerText(sec) {
  let minutes = Math.floor(sec / 60);
  let seconds = sec % 60;
  minutes = String(minutes).padStart(2,'0');
  seconds = String(seconds).padStart(2,'0');
  gameTimer.innerText = `${minutes}:${seconds}`;
}

gameBtn.addEventListener('click', handleGameBtn);

// 벌레, 당근을 생성 후 화면에 뿌려줌
function initGame() {
  field.innerHTML = '';
  gameScore.innerText = CARROT_COUNT;
  addItem('carrot', CARROT_COUNT, './../images/carrot.png');
  addItem('bug', BUG_COUNT, './../images/bug.png');
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;
  for(let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
