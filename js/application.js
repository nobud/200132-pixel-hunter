import {evtNext, evtBack, changeScreen} from './util/util';
import {GameManager} from './presenter/game-screen/game-manager';
import screenIntro from './presenter/intro-screen';
import screenGreeting from './presenter/greeting-screen';
import screenRules from './presenter/rules-screen';
import screenStats from './presenter/stats-screen';

const TypeScreen = {
  INTRO: screenIntro,
  GREETING: screenGreeting,
  RULES: screenRules,
  STATS: screenStats
};

const LevelGame = {
  INTRO: 0,
  GREETING: 1,
  RULES: 2,
  GAME: 3,
  STATS: 4
};

const LevelApplicationToTypeScreen = {
  [LevelGame.INTRO]: TypeScreen.INTRO,
  [LevelGame.GREETING]: TypeScreen.GREETING,
  [LevelGame.RULES]: TypeScreen.RULES,
  [LevelGame.STATS]: TypeScreen.STATS
};

class Application {
  constructor() {
    this.init();
    this.bindHandlers();
  }

  init() {
    this.currentIndexLevel = 0;
    this.initApplicationLevels();
  }

  bindHandlers() {
    window.addEventListener(evtNext, (evt) => {
      this.showNextScreen(evt);
    });
    window.addEventListener(evtBack, () => {
      this.showBackScreen();
    });
  }

  initApplicationLevels() {
    this.levels = [
      LevelGame.INTRO,
      LevelGame.GREETING,
      LevelGame.RULES,
      LevelGame.GAME,
      LevelGame.STATS
    ];
  }

  static getTypeScreen(level) {
    return LevelApplicationToTypeScreen[level];
  }

  isFinishLevel(index) {
    return index === this.levels.length - 1;
  }

  setNextLevel() {
    const indexLevel = !this.isFinishLevel(this.currentIndexLevel) ? ++this.currentIndexLevel : this.currentIndexLevel;
    return this.levels[indexLevel];
  }

  static showGame(userName, tasks) {
    GameManager.createGameManager(userName, tasks).start();
  }

  static showWelcome() {
    changeScreen(Application.getTypeScreen(LevelGame.INTRO));
    return new Application();
  }

  showBackScreen() {
    this.currentIndexLevel = this.levels.indexOf(LevelGame.GREETING);
    changeScreen(Application.getTypeScreen(LevelGame.GREETING));
  }

  showNextScreen(evt) {
    const level = this.setNextLevel();

    switch (level) {
      case LevelGame.GREETING: {
        this.serverData = evt.detail.data;
        changeScreen(Application.getTypeScreen(level));
        break;
      }
      case LevelGame.GAME: {
        const userName = evt.detail.data;
        Application.showGame(userName, this.serverData);
        break;
      }
      default: changeScreen(Application.getTypeScreen(level));
    }
  }
}

export {Application};
