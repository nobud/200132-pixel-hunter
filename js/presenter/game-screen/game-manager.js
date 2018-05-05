import definition from '../../model/definition';
import {GameModel} from '../../model/game-model';
import {Result} from '../game-helper/result';
import {changeScreen, createCustomEvent, evtAnsweredTask, evtExpiredTimer,
  evtBack, evtNext, evtTickTimer, evtRefreshTime} from '../../util/util';
import {Timer} from '../game-helper/timer';
import screenGameOneImg from './game-screen-one-img';
import screenGameTwoImg from './game-screen-two-img';
import screenGameThreeImg from './game-screen-three-img';
import Loader from '../../util/loader';
import showError from '../../view/error/error-view';

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
    this.model = gameData;
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
    this.model.refreshTime(this.timer.value);
    createCustomEvent(evtRefreshTime, this.model.getTime());
  }

  onGoToBack() {
    if (this.isStarted()) {
      this.reset();
    }
  }

  openNextTask() {
    this.setNextTask();
    this.timer = new Timer(definition.maxTimeForAnswer);
    this.model.refreshTime(this.timer.value);
    this.timer.start();
    return this.getCurrentTask();
  }

  showTask() {
    const task = this.openNextTask();
    const state = this.getState();
    this.continueGame(task, state);
  }

  saveResultsAndShowStats(userName, answers) {
    Loader.saveResults(answers, userName).
        then(() => Loader.loadResults(userName)).
        then((data) => createCustomEvent(evtNext, data)).
        catch(showError);
  }

  completeTask(task) {
    this.saveCurrentAnswer(task.typeAnswer);
    if (this.model.isAnswerWrong(this.currentTaskIndex)) {
      this.loseLife();
    }
    if (this.isLastTask()) {
      this.goToFinishGameStatus();
    }

    if (this.isFinished()) {
      const result = this.completeGame();
      // сохранить результаты на сервер, скачать статистику игр с сервера и перейти на экран статистики
      this.saveResultsAndShowStats(this.model.user, result.answers);
    } else {
      this.showTask();
    }
  }

  continueGame(task, state) {
    changeScreen(this.getTypeGameScreen(task.type), task, state);
  }

  completeGame() {
    const result = this.calcResult();
    this.reset();
    return result;
  }

  loseLife() {
    if (this.model.getCountLives() > 0) {
      this.model.loseLife();
    } else {
      this.goToFinishGameStatus();
    }
  }

  reset() {
    this.model.reset();
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
    this.model.saveAnswer(this.currentTaskIndex, answer);
  }

  calcResult() {
    return new Result(this.model.user, this.model.getAnswers());
  }

  get result() {
    return this._result;
  }

  isLastTask() {
    return this.currentTaskIndex === this.model.getTasksLength() - 1;
  }

  setNextTask() {
    this.currentTaskIndex++;
  }

  getCurrentTask() {
    return this.model.getTask(this.currentTaskIndex);
  }

  getTask(index) {
    return this.model.getTask(index);
  }

  getState() {
    return this.model.getState();
  }

  getTypeGameScreen(typeTask) {
    return TypeTaskToTypeScreen[typeTask];
  }

  static createGameManager(userName, data) {
    return new GameManager(new GameModel(userName, data));
  }
}

export {GameManager};
