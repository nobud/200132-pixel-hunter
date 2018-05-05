import definition from '../../model/definition';
import GameModel from '../../model/game-model';
import Result from '../game-helper/result';
import {changeScreen, createCustomEvent, evtAnsweredTask, evtExpiredTimer,
  evtBack, evtNext, evtTickTimer, evtRefreshTime, evtTimerStop, evtTimerContinue, evtStartBlinkTime} from '../../util/util';
import Timer from '../game-helper/timer';
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

export default class GameManager {
  constructor(gameData) {
    this.model = gameData;
    this.__initParam();
    window.addEventListener(evtAnsweredTask, (evt) => {
      this.onAnswerTask(evt);
    });
    window.addEventListener(evtExpiredTimer, () => {
      this.onExpiredTimer();
    });
    window.addEventListener(evtTimerStop, () => {
      this.onStopTimer();
    });
    window.addEventListener(evtTimerContinue, () => {
      this.onContinueTimer();
    });
    window.addEventListener(evtTickTimer, () => {
      this.onTick();
    });
    window.addEventListener(evtBack, () => {
      this.onGoToBack();
    });
  }

  get result() {
    return this._result;
  }

  start() {
    this.status = TypeStatusGame.START;
    this.__showTask();
  }

  __initParam() {
    this.status = TypeStatusGame.WAIT;
    this._result = null;
    this.currentTaskIndex = -1;
  }

  __getState() {
    return this.model.getState();
  }

  __getTypeGameScreen(typeTask) {
    return TypeTaskToTypeScreen[typeTask];
  }


  __goToFinishGameStatus() {
    this.status = TypeStatusGame.FINISH;
  }

  __isStarted() {
    return this.status === TypeStatusGame.START;
  }

  __isFinished() {
    return this.status === TypeStatusGame.FINISH;
  }

  __loseLife() {
    if (this.model.getCountLives() > 0) {
      this.model.loseLife();
    } else {
      this.__goToFinishGameStatus();
    }
  }

  __saveCurrentAnswer(answer) {
    this.model.saveAnswer(this.currentTaskIndex, answer);
  }

  __isLastTask() {
    return this.currentTaskIndex === this.model.getTasksLength() - 1;
  }

  __setNextTask() {
    this.currentTaskIndex++;
  }

  __getCurrentTask() {
    return this.model.getTask(this.currentTaskIndex);
  }

  __showTask() {
    const task = this.__openNextTask();
    const state = this.__getState();
    this.__continueGame(task, state);
  }

  __openNextTask() {
    this.__setNextTask();
    this.timer = new Timer(definition.MAX_TIME_FOR_ANSWER);
    this.model.refreshTime(this.timer.value);
    this.isTimerBlink = false;
    this.timer.start();
    return this.__getCurrentTask();
  }

  __completeTask(task) {
    this.__saveCurrentAnswer(task.typeAnswer);
    if (this.model.isAnswerWrong(this.currentTaskIndex)) {
      this.__loseLife();
    }
    if (this.__isLastTask()) {
      this.__goToFinishGameStatus();
    }

    if (this.__isFinished()) {
      const result = this.__completeGame();
      // сохранить результаты на сервер, скачать статистику игр с сервера и перейти на экран статистики
      this.__saveResultsAndShowStats(this.model.user, result.answers);
    } else {
      this.__showTask();
    }
  }

  __continueGame(task, state) {
    changeScreen(this.__getTypeGameScreen(task.type), task, state);
  }

  __completeGame() {
    const result = this.__calcResult();
    this.__reset();
    return result;
  }

  __reset() {
    this.model.reset();
    this.__initParam();
    this.status = TypeStatusGame.WAIT;
  }

  __calcResult() {
    return new Result(this.model.user, this.model.getAnswers());
  }

  __saveResultsAndShowStats(userName, answers) {
    Loader.saveResults(answers, userName).
        then(() => Loader.loadResults(userName)).
        then((data) => createCustomEvent(evtNext, data)).
        catch(showError);
  }

  onAnswerTask(evt) {
    this.timer.stop();
    let task = this.__getCurrentTask();
    if (task) {
      task.saveAnswersValues(evt.detail.data);
      task.finish(this.timer.value);
      this.__completeTask(task);
    } else {
      throw new Error(`Не найдено текущее задание`);
    }
  }

  onExpiredTimer() {
    let task = this.__getCurrentTask();
    const timeTaskExpired = -1;
    task.finish(timeTaskExpired);
    this.__completeTask(task);
  }

  onStopTimer() {
    this.timer.stop();
  }

  onContinueTimer() {
    this.timer.start();
  }

  onTick() {
    const time = this.timer.value;
    this.model.refreshTime(time);

    if (!this.isTimerBlink && time <= definition.TIME_BLINK_TIMER) {
      this.isTimerBlink = true;
      createCustomEvent(evtStartBlinkTime);
    }
    createCustomEvent(evtRefreshTime, time);
  }

  onGoToBack() {
    if (this.__isStarted()) {
      this.__reset();
    }
  }

  static createGameManager(userName, data) {
    return new GameManager(new GameModel(userName, data));
  }
}
