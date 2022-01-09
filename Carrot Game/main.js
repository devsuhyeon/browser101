'use strict'

const gameField = document.querySelector('.game__field');
const fieldRect = gameField.getBoundingClientRect();
const fieldWidth = fieldRect.width;
const fieldHeight = fieldRect.height;

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

let started = false;
let score = 0;
let timer = undefined;

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;


gameBtn.addEventListener('click', () => {
    if (started) {
        stopGame(); 
    } else {
        startGame();
    }
    started = !started;
});

function startGame() {
    initGame();
    showStopBtn();
    showTimerAndScore();
}

function stopGame() {
}

function showStopBtn() {
    const icon = gameBtn.querySelector('.fa-play');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
}

function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function initGame() {
    gameField.innerHTML = '';
    gameScore.innerText = CARROT_COUNT;
    createItem('carrot', CARROT_COUNT);
    createItem('bug', BUG_COUNT);
}

function randomCoords() {
    const x = Math.floor(Math.random() * (fieldWidth - CARROT_SIZE));
    const y = Math.floor(Math.random() * (fieldHeight - CARROT_SIZE));
    return [x, y];
}

function createItem(itemType, count) {
    const imgPath = `img/${itemType}.png`;

    for (let i = 0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', itemType);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';

        const coords = randomCoords();
        item.style.left = `${coords[0]}px`;
        item.style.top = `${coords[1]}px`;

        gameField.append(item);
    }
}