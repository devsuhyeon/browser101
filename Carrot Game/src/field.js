'use strict';

const carrotSound = new Audio('./sound/carrot_pull.mp3');
const CARROT_SIZE = 80;

export default class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.gameField = document.querySelector('.game__field');
    this.fieldRect = this.gameField.getBoundingClientRect();
    this.fieldWidth = this.fieldRect.width;
    this.fieldHeight = this.fieldRect.height;
    this.gameField.addEventListener('click', this.onClick);
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  init() {
    this.gameField.innerHTML = '';
    this.createItem('carrot', this.carrotCount);
    this.createItem('bug', this.bugCount);
  }

  createItem(itemType, count) {
    const imgPath = `img/${itemType}.png`;

    for (let i = 0; i < count; i++) {
      const item = document.createElement('img');
      item.setAttribute('class', itemType);
      item.setAttribute('src', imgPath);
      item.style.position = 'absolute';

      const coords = this.randomCoords();
      item.style.left = `${coords[0]}px`;
      item.style.top = `${coords[1]}px`;

      this.gameField.append(item);
    }
  }

  randomCoords() {
    const x = Math.floor(Math.random() * (this.fieldWidth - CARROT_SIZE));
    const y = Math.floor(Math.random() * (this.fieldHeight - CARROT_SIZE));
    return [x, y];
  }

  onClick = (event) => {
    const clickedItem = event.target;
    if (clickedItem.matches('.carrot')) {
      clickedItem.remove();
      playSound(carrotSound);
      this.onItemClick && this.onItemClick('carrot');
    } else if (clickedItem.matches('.bug')) {
      this.onItemClick && this.onItemClick('bug');
    }
  };
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}
