import {evtNext, evtBack, changeScreen} from './util';
import {GameManager} from './presenter/game-screen/game-manager';
import screenIntro from './presenter/intro-screen';
import screenGreeting from './presenter/greeting-screen';
import screenRules from './presenter/rules-screen';
import screenStats from './presenter/stats-screen';
import {tasks as dataTasks} from './data/data';

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

  static loadData() {
    // заглушка для получения данных, загруженных с сервера
    return dataTasks;
  }

  static initGameScreen(tasks) {
    GameManager.createGameManager(tasks).start();
  }

  bindHandlers() {
    window.addEventListener(evtNext, () => {
      this.showNextScreen();
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

  getLevel(index) {
    return this.levels[index];
  }

  isFinishLevel(index) {
    return index === this.levels.length - 1;
  }

  setNextLevel() {
    const indexLevel = !this.isFinishLevel(this.currentIndexLevel) ? ++this.currentIndexLevel : this.currentIndexLevel;
    return this.levels[indexLevel];
  }

  static showWelcome() {
    changeScreen(Application.getTypeScreen(LevelGame.INTRO));
    return new Application();
  }

  static showGame() {
    Application.initGameScreen(Application.loadData());
  }

  static showStats() {
    changeScreen(Application.getTypeScreen(LevelGame.STATS));
  }

  showBackScreen() {
    this.currentIndexLevel = this.levels.indexOf(LevelGame.GREETING);
    changeScreen(Application.getTypeScreen(LevelGame.GREETING));
  }

  showNextScreen() {
    const level = this.setNextLevel();
    if (level === LevelGame.GAME) {
      Application.showGame();
    } else {
      changeScreen(Application.getTypeScreen(level));
    }
  }
}

export {Application};
