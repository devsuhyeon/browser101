'use strict'

const gameField = document.querySelector('.game__field');
const fieldRect = gameField.getBoundingClientRect();
const fieldWidth = fieldRect.width;
const fieldHeight = fieldRect.height;
const CARROT_SIZE = 80;

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

function initGame() {
    const numOfCarrot = 5;
    const numOfBug = 5;
    createItem('carrot', numOfCarrot);
    createItem('bug', numOfBug);
}

initGame();
