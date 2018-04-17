import {GameData} from './game-data';
import {Result} from './result';
import {evtAnsweredTask, evtExpiredTimer, evtBack, evtNext, createCustomEvent} from '../util';
import results from '../data/results';

const TypeStatusGame = {
  WAIT: 0,
  START: 1,
  FINISH: 2
};

class GameController {
  constructor(gameData) {
    this.data = gameData;
    this.initData();
    window.addEventListener(evtAnsweredTask, () => {
      this.onAnswerTask();
    });
    window.addEventListener(evtExpiredTimer, () => {
      this.onExpiredTimer();
    });
    window.addEventListener(evtBack, () => {
      this.onGoToBack();
    });
  }

  initData() {
    this.status = TypeStatusGame.WAIT;
    this._result = null;
    this.currentTaskIndex = -1;
  }

  completeTask(task) {
    this.saveCurrentAnswer(task.typeAnswer);
    if (this.data.isAnswerWrong(this.currentTaskIndex)) {
      this.loseLife();
    }
    createCustomEvent(evtNext);
  }

  onAnswerTask() {
    let task = this.getCurrentTask();
    task.finish();
    this.completeTask(task);
  }

  onExpiredTimer() {
    let task = this.getCurrentTask();
    task.expired();
    this.completeTask(task);
  }

  onGoToBack() {
    if (this.isStarted()) {
      // добавить диалоговое окно подтверждения выхода из игры
      // ...
      this.reset();
    }
  }

  loseLife() {
    if (this.data.getCountLives() > 0) {
      this.data.loseLife();
    } else {
      this.finish();
    }
  }

  reset() {
    this.data.reset();
    this.initData();
    this.status = TypeStatusGame.WAIT;
  }

  start() {
    this.status = TypeStatusGame.START;
  }

  finish() {
    this.status = TypeStatusGame.FINISH;
    this._result = this.calcResult();
    this.saveResult();
  }

  run() {
    if (!this.isLastTask()) {
      this.setNextTask();
      return this.getCurrentTask();
    } else {
      this.finish();
      return null;
    }
  }

  get result() {
    return this._result;
  }

  saveCurrentAnswer(answer) {
    this.data.saveAnswer(this.currentTaskIndex, answer);
  }

  isLastTask() {
    return this.currentTaskIndex === this.getTasksLength() - 1;
  }

  setNextTask() {
    this.currentTaskIndex++;
  }

  getCurrentTask() {
    return this.data.tasks[this.currentTaskIndex];
  }

  getTask(index) {
    return this.data.tasks[index];
  }

  getTasksLength() {
    return this.data.tasks.length;
  }

  getState() {
    return this.data.state;
  }

  isWaitig() {
    return this.status === TypeStatusGame.WAIT;
  }

  isStarted() {
    return this.status === TypeStatusGame.START;
  }

  isFinished() {
    return this.status === TypeStatusGame.FINISH;
  }

  calcResult() {
    return new Result(this.data.state.answers);
  }

  saveResult() {
    results.unshift(this.result);
  }

  static createGame(data) {
    return new GameController(new GameData(data));
  }
}

export {GameController};
