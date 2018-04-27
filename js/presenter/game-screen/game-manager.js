import definition from '../../definition';
import {GameModel} from '../../model/game-model';
import {Result} from '../game-helper/result';
import {changeScreen, createCustomEvent, evtAnsweredTask, evtExpiredTimer, evtBack, evtTickTimer, evtRefreshTime} from '../../util';
import results from '../../data/results';
import {Timer} from '../game-helper/timer';
import {Application} from '../../application';
import screenGameOneImg from './game-screen-one-img';
import screenGameTwoImg from './game-screen-two-img';
import screenGameThreeImg from './game-screen-three-img';

const TypeTaskToTypeScreen = {
  [definition.TypeTask.ONE_IMG]: screenGameOneImg,
  [definition.TypeTask.TWO_IMG]: screenGameTwoImg,
  [definition.TypeTask.THREE_IMG]: screenGameThreeImg
};

const TypeStatusGame = {
  WAIT: 0,
  START: 1,
  FINISH: 2
};

class GameManager {
  constructor(gameData) {
    this.data = gameData;
    this.initParam();
    window.addEventListener(evtAnsweredTask, (evt) => {
      this.onAnswerTask(evt);
    });
    window.addEventListener(evtExpiredTimer, () => {
      this.onExpiredTimer();
    });
    window.addEventListener(evtBack, () => {
      this.onGoToBack();
    });
    window.addEventListener(evtTickTimer, () => {
      this.onTick();
    });
  }

  initParam() {
    this.status = TypeStatusGame.WAIT;
    this._result = null;
    this.currentTaskIndex = -1;
  }

  onAnswerTask(evt) {
    this.timer.stop();
    let task = this.getCurrentTask();
    task.saveAnswersValues(evt.detail.data);
    task.finish(this.timer.value);
    this.completeTask(task);
  }

  onExpiredTimer() {
    let task = this.getCurrentTask();
    const timeTaskExpired = -1;
    task.finish(timeTaskExpired);
    this.completeTask(task);
  }

  onTick() {
    this.data.refreshTime(this.timer.value);
    createCustomEvent(evtRefreshTime, this.data.getTime());
  }

  onGoToBack() {
    if (this.isStarted()) {
      // добавить диалоговое окно подтверждения выхода из игры
      // ...
      this.reset();
    }
  }

  openNextTask() {
    this.setNextTask();
    this.timer = new Timer(definition.maxTimeForAnswer);
    this.data.refreshTime(this.timer.value);
    this.timer.start();
    return this.getCurrentTask();
  }

  showTask() {
    const task = this.openNextTask();
    const state = this.getState();
    this.continueGame(task, state);
  }

  completeTask(task) {
    this.saveCurrentAnswer(task.typeAnswer);
    if (this.data.isAnswerWrong(this.currentTaskIndex)) {
      this.loseLife();
    }
    if (this.isLastTask()) {
      this.goToFinishGameStatus();
    }
    if (this.isFinished()) {
      this.completeGame();
      Application.showStats();
      // createCustomEvent(evtNext);
    } else {
      this.showTask();
    }
  }

  continueGame(task, state) {
    changeScreen(this.getTypeGameScreen(task.type), task, state);
  }

  completeGame() {
    this._result = this.calcResult();
    this.saveResult();
    this.reset();
  }

  loseLife() {
    if (this.data.getCountLives() > 0) {
      this.data.loseLife();
    } else {
      this.goToFinishGameStatus();
    }
  }

  reset() {
    this.data.reset();
    this.initParam();
    this.status = TypeStatusGame.WAIT;
  }

  start() {
    this.status = TypeStatusGame.START;
    this.showTask();
  }

  goToFinishGameStatus() {
    this.status = TypeStatusGame.FINISH;
  }

  isStarted() {
    return this.status === TypeStatusGame.START;
  }

  isFinished() {
    return this.status === TypeStatusGame.FINISH;
  }

  saveCurrentAnswer(answer) {
    this.data.saveAnswer(this.currentTaskIndex, answer);
  }

  calcResult() {
    return new Result(this.data.getAnswers());
  }

  get result() {
    return this._result;
  }

  saveResult() {
    results.unshift(this.result);
  }

  isLastTask() {
    return this.currentTaskIndex === this.data.getTasksLength() - 1;
  }

  setNextTask() {
    this.currentTaskIndex++;
  }

  getCurrentTask() {
    return this.data.getTask(this.currentTaskIndex);
  }

  getTask(index) {
    return this.data.getTask(index);
  }

  getState() {
    return this.data.getState();
  }

  getTypeGameScreen(typeTask) {
    return TypeTaskToTypeScreen[typeTask];
  }

  static createGameManager(data) {
    return new GameManager(new GameModel(data));
  }
}

export {GameManager};
