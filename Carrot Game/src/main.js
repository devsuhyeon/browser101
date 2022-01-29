'use strict';
import PopUp from './popup.js';
import { GameBuilder, Reason } from './game.js';
import * as sound from './sound.js';

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
  .withGameDuration(5)
  .withCarrotCount(3)
  .withBugCount(3)
  .build();

game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case Reason.win:
      message = 'YOU WON😊';
      sound.playWin();
      break;
    case Reason.lose:
      message = 'YOU LOST😭';
      sound.playBug();
      break;
    case Reason.cancel:
      message = 'REPLAY?';
      sound.playAlert();
      break;
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});
