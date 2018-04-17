import {TypeScreen, ScreenDictionary} from './screen-dictionary';
import {GameController} from './game-controller';
import {evtNext, evtBack} from '../util';
import results from '../data/results';

const LevelGame = {
  INTRO: 0,
  GREETING: 1,
  RULES: 2,
  GAME: 3,
  STATS: 4
};

const LevelGameToTypeScreen = {
  [LevelGame.INTRO]: TypeScreen.INTRO,
  [LevelGame.GREETING]: TypeScreen.GREETING,
  [LevelGame.RULES]: TypeScreen.RULES,
  [LevelGame.STATS]: TypeScreen.STATS
};

class ScreenController {
  constructor(tasks) {
    this.startIndex = 0;
    this.currentIndex = this.startIndex;

    this.screenDictionary = new ScreenDictionary();
    this.game = GameController.createGame(tasks);
    this.back = LevelGame.GREETING;
    this.levels = [
      LevelGame.INTRO,
      LevelGame.GREETING,
      LevelGame.RULES,
      LevelGame.GAME,
      LevelGame.STATS
    ];
    window.addEventListener(evtNext, this.showNextScreen.bind(this));
    window.addEventListener(evtBack, this.showBackScreen.bind(this));
  }

  getLevel(index) {
    return this.levels[index];
  }

  getStartLevel() {
    return this.levels[this.startIndex];
  }

  getBackLevel() {
    return this.levels[this.levels.indexOf(this.back)];
  }

  isLastLevel(index) {
    return index === this.levels.length - 1;
  }

  getNextLevel() {
    const index = !this.isLastLevel(this.currentIndex) ? ++this.currentIndex : this.currentIndex;
    return this.levels[index];
  }

  getTypeScreen(level) {
    return LevelGameToTypeScreen[level];
  }

  getStartScreen() {
    return this.screenDictionary.getScreen(this.getTypeScreen(this.getStartLevel()));
  }

  getBackScreen() {
    this.currentIndex = this.levels.indexOf(this.getBackLevel());
    return this.screenDictionary.getScreen(this.getTypeScreen(this.getBackLevel()));
  }

  toContinueGame() {
    const task = this.game.run();
    if (task) {
      return this.screenDictionary.getScreen(task.type, task, this.game.getState());
    } else {
      return this.getNextScreen();
    }
  }

  goToNewLevel(data) {
    const level = this.getNextLevel();
    return this.screenDictionary.getScreen(this.getTypeScreen(level), data);
  }

  goToGameLevel() {
    this.getNextLevel();
    this.game.start();
    return this.toContinueGame();
  }

  getNextScreen() {
    let nextLevel = this.getLevel(this.currentIndex + 1);
    switch (nextLevel) {
      case LevelGame.STATS:
        if (this.game.isFinished()) {
          this.game.reset();
          return this.goToNewLevel(results);
        } else {
          return this.toContinueGame();
        }
      case LevelGame.GAME:
        return this.goToGameLevel();
      default:
        return this.goToNewLevel();
    }
  }

  showStartScreen() {
    let screen = this.getStartScreen();
    screen.showView();
  }

  showBackScreen() {
    let screen = this.getBackScreen();
    screen.showView();
  }

  showNextScreen() {
    let screen = this.getNextScreen();
    screen.showView();
  }
}

export {ScreenController};
