"use strict";

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const game = document.querySelector(".game");
const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");

const popUp = document.querySelector(".pop-up");
const popUpMessage = document.querySelector(".pop-up__message");
const popUpRefresh = document.querySelector(".pop-up__refresh");

const bgm = new Audio("./sound/bg.mp3");
const soundWin = new Audio("./sound/game_win.mp3");
const soundCarrot = new Audio("./sound/carrot_pull.mp3");
const soundBug = new Audio("./sound/bug_pull.mp3");

let started = false;
let score = 0;
let timer = undefined;

field.addEventListener("click", onFieldClick);

// 게임 버튼 핸들러
function handleGameBtn() {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
}

popUpRefresh.addEventListener("click", () => {
  score = 0;
  showGameButton();
  startGame();
  hidePopUp();
});

function startGame() {
  started = true;
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
}

function stopGame() {
  bgm.pause();
  started = false;
  stopGameTimer();
  hideGameButton();
  showPopUp("Replay? 😐");
}

function finishGame(win) {
  if (win) {
    bgm.pause();
    soundWin.play();
  } else {
    bgm.pause();
  }
  started = false;
  stopGameTimer();
  hideGameButton();
  showPopUp(win ? "YOU WON 🥳" : "YOU LOST 💩");
}

function showStopButton() {
  const icon = gameBtn.querySelector(".fa-solid");
  icon.classList.add("fa-stop");
  icon.classList.remove("fa-play");
}

function showTimerAndScore() {
  gameTimer.style.visibility = "visible";
  gameScore.style.visibility = "visible";
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      finishGame(CARROT_COUNT === score);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function showGameButton() {
  gameBtn.style.visibility = "visible";
}

function hideGameButton() {
  gameBtn.style.visibility = "hidden";
}

function showPopUp(text) {
  popUpMessage.innerText = text;
  popUp.classList.remove("pop-up__hide");
}

function hidePopUp() {
  popUp.classList.add("pop-up__hide");
}

function updateTimerText(sec) {
  let minutes = Math.floor(sec / 60);
  let seconds = sec % 60;
  minutes = String(minutes).padStart(2, "0");
  seconds = String(seconds).padStart(2, "0");
  gameTimer.innerText = `${minutes}:${seconds}`;
}

gameBtn.addEventListener("click", handleGameBtn);

// 벌레, 당근을 생성 후 화면에 뿌려줌
function initGame() {
  bgm.play();
  field.innerHTML = "";
  gameScore.innerText = CARROT_COUNT;
  addItem("carrot", CARROT_COUNT, "./images/carrot.png");
  addItem("bug", BUG_COUNT, "./images/bug.png");
}

function onFieldClick(e) {
  if (started == false) {
    return;
  }
  const target = e.target;
  if (target.matches(".carrot")) {
    soundCarrot.play();
    target.remove();
    score++;
    updateScoreBoard();
    if (score == CARROT_COUNT) {
      finishGame(true);
    }
  } else if (target.matches(".bug")) {
    soundBug.play();
    stopGameTimer();
    finishGame(false);
  }
}

function updateScoreBoard() {
  gameScore.innerText = CARROT_COUNT - score;
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE - 24;
  const y2 = fieldRect.height - CARROT_SIZE - 24;
  for (let i = 0; i < count; i++) {
    const item = document.createElement("img");
    item.setAttribute("class", className);
    item.setAttribute("src", imgPath);
    item.style.position = "absolute";
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
