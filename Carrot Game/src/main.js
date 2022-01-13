'use strict';
import PopUp from './popup.js';
import Field from './field.js';
import * as sound from './sound.js';

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

let started = false;
let score = 0;
let timer = undefined;

const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  startGame();
});

const gameField = new Field(CARROT_COUNT, BUG_COUNT);
gameField.setClickListener(onItemClick);

function onItemClick(item) {
  if (!started) {
    return;
  }
  if (item === 'carrot') {
    score++;
    updateScoreBoard();
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (item === 'bug') {
    finishGame(false);
  } else {
    return;
  }
}

gameBtn.addEventListener('click', () => {
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
  sound.playBackgound();
}

function stopGame() {
  started = false;
  hideGameBtn();
  stopGameTimer();
  gameFinishBanner.showWithText('REPLAY?');
  sound.alertSound();
  sound.stopBackground();
}

function finishGame(win) {
  started = false;
  hideGameBtn();
  stopGameTimer();
  if (win) {
    sound.playWin();
  } else {
    sound.bugSound();
  }
  gameFinishBanner.showWithText(win ? 'YOU WON' : 'YOU LOST');
  sound.stopBackground();
}

function showStopBtn() {
  const icon = document.querySelector('.fas');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
  gameBtn.style.visibility = 'visible';
}

function hideGameBtn() {
  gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
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

function initGame() {
  score = 0;
  gameScore.innerText = CARROT_COUNT;
  gameField.init();
}

function updateScoreBoard() {
  gameScore.innerText = CARROT_COUNT - score;
}
