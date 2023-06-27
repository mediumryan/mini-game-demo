$(function () {
  const CARROT_SIZE = 80;
  const CARROT_COUNT = 5;
  const BUG_COUNT = 5;
  const GAME_DURATION_SEC = 5;

  const game = $(".game");
  const field = $(".game__field");
  const gameBtn = $(".game__button");
  const gameTimer = $(".game__timer");
  const gameScore = $(".game__score");

  const popUp = $(".pop-up");
  const popUpMessage = $(".pop-up__message");
  const popUpRefresh = $(".pop-up__refresh");

  const bgm = new Audio("./sound/bg.mp3");
  const soundWin = new Audio("./sound/game_win.mp3");
  const soundCarrot = new Audio("./sound/carrot_pull.mp3");
  const soundBug = new Audio("./sound/bug_pull.mp3");

  let started = false;
  let score = 0;
  let timer = undefined;

  field.on("click", onFieldClick);

  // 게임 버튼 핸들러
  function handleGameBtn() {
    if (started) {
      stopGame();
    } else {
      startGame();
    }
  }

  popUpRefresh.on("click", () => {
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
    gameTimer.css("visibility", "visible");
    gameScore.css("visibility", "visible");
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
    gameBtn.css("visibility", "visible");
  }

  function hideGameButton() {
    gameBtn.css("visibility", "hidden");
  }

  function showPopUp(text) {
    popUpMessage.text(text);
    popUp.removeClass("pop-up__hide");
  }

  function hidePopUp() {
    popUp.addClass("pop-up__hide");
  }

  function updateTimerText(sec) {
    let minutes = Math.floor(sec / 60);
    let seconds = sec % 60;
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    gameTimer.text(`${minutes}:${seconds}`);
  }

  gameBtn.on("click", handleGameBtn);

  // 벌레, 당근을 생성 후 화면에 뿌려줌
  function initGame() {
    bgm.play();
    field.html("");
    gameScore.text(CARROT_COUNT);
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
    gameScore.text(CARROT_COUNT - score);
  }

  function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = field.width - CARROT_SIZE - 24;
    const y2 = field.height - CARROT_SIZE - 24;
    for (let i = 0; i < count; i++) {
      const item = $("<img/>");
      item.attr("class", className);
      item.attr("src", imgPath);
      item.css("position", "absolute");
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.css("left", `${x}px`);
      item.css("top", `${y}px`);
      field.append(item);
    }
  }

  function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
});
