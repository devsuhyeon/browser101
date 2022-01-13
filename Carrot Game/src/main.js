'use strict';
import PopUp from './popup.js';
import Game from './game.js';

const gameFinishBanner = new PopUp();

const game = new Game(5, 5, 5);
game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case 'win':
      message = 'YOU WON😊';
      break;
    case 'lose':
      message = 'YOU LOST😭';
      break;
    case 'cancel':
      message = 'REPLAY?';
      break;
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});
