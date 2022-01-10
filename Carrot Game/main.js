"use strict";

const gameField = document.querySelector(".game__field");
const fieldRect = gameField.getBoundingClientRect();
const fieldWidth = fieldRect.width;
const fieldHeight = fieldRect.height;

const gameBtn = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");

const popUp = document.querySelector(".pop-up");
const popUpMessage = document.querySelector(".pop-up__message");
const popUpReplay = document.querySelector(".pop-up__replay");

const alertSound = new Audio("./sound/alert.wav");
const bgSound = new Audio("./sound/bg.mp3");
const bugSound = new Audio("./sound/bug_pull.mp3");
const carrotSound = new Audio("./sound/carrot_pull.mp3");
const gameWinSound = new Audio("./sound/game_win.mp3");

let started = false;
let score = 0;
let timer = undefined;

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

gameField.addEventListener("click", onFieldClick);
popUpReplay.addEventListener("click", () => {
  hidePopUp();
  startGame();
});

gameBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

function startGame() {
  started = true;
  initGame();
  showStopBtn();
  showTimerAndScore();
  startGameTimer();
  playSound(bgSound);
}

function stopGame() {
  started = false;
  hideGameBtn();
  stopGameTimer();
  showPopUpWithText("REPLAY?");
  playSound(alertSound);
  stopSound(bgSound);
}

function finishGame(win) {
  started = false;
  hideGameBtn();
  stopGameTimer();
  if (win) {
    playSound(gameWinSound);
  } else {
    playSound(bugSound);
  }
  showPopUpWithText(win ? "YOU WON" : "YOU LOST");
  stopSound(bgSound);
}

function showStopBtn() {
  const icon = document.querySelector(".fas");
  icon.classList.add("fa-stop");
  icon.classList.remove("fa-play");
  gameBtn.style.visibility = "visible";
}

function hideGameBtn() {
  gameBtn.style.visibility = "hidden";
}

function showTimerAndScore() {
  gameTimer.style.visibility = "visible";
  gameScore.style.visibility = "visible";
}

function startGameTimer() {
  let remaingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remaingTimeSec);
  timer = setInterval(() => {
    if (remaingTimeSec <= 0) {
      clearInterval(timer);
      finishGame(CARROT_COUNT === score);
      return;
    }
    updateTimerText(--remaingTimeSec);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerText = `${minutes} : ${seconds}`;
}

function showPopUpWithText(text) {
  popUpMessage.innerText = text;
  popUp.classList.remove("pop-up--hide");
}

function hidePopUp() {
  popUp.classList.add("pop-up--hide");
}

function initGame() {
  score = 0;
  gameField.innerHTML = "";
  gameScore.innerText = CARROT_COUNT;
  createItem("carrot", CARROT_COUNT);
  createItem("bug", BUG_COUNT);
}

function onFieldClick(event) {
  if (!started) {
    return;
  }
  const clickedItem = event.target;
  if (clickedItem.matches(".carrot")) {
    clickedItem.remove();
    score++;
    updateScoreBoard();
    playSound(carrotSound);
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (clickedItem.matches(".bug")) {
    finishGame(false);
  } else {
    return;
  }
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}

function updateScoreBoard() {
  gameScore.innerText = CARROT_COUNT - score;
}

function randomCoords() {
  const x = Math.floor(Math.random() * (fieldWidth - CARROT_SIZE));
  const y = Math.floor(Math.random() * (fieldHeight - CARROT_SIZE));
  return [x, y];
}

function createItem(itemType, count) {
  const imgPath = `img/${itemType}.png`;

  for (let i = 0; i < count; i++) {
    const item = document.createElement("img");
    item.setAttribute("class", itemType);
    item.setAttribute("src", imgPath);
    item.style.position = "absolute";

    const coords = randomCoords();
    item.style.left = `${coords[0]}px`;
    item.style.top = `${coords[1]}px`;

    gameField.append(item);
  }
}
