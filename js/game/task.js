import {EstimationTask} from './estimation-task';
import {TypeAnswer} from './type-answer';
import definition from '../data/definition';
import {Option} from './option';
import {Timer} from './timer';
import {createCustomEvent, evtTickTimer, evtRefreshTime} from '../util';

class Task {
  constructor(task) {
    this.type = task.type;
    this.text = task.text;
    this.options = task.options.map((option) => {
      return new Option(option);
    });
    this.time = definition.maxTimeForAnswer;
    this.estimator = new EstimationTask(task.type);
    this.isFinished = false;
    this.typeAnswer = TypeAnswer.UNKNOWN;
    window.addEventListener(evtTickTimer, () => {
      this.onTick();
    });
  }

  start() {
    this.timer = new Timer(definition.maxTimeForAnswer);
    this.timer.start();
  }

  onTick() {
    this.time = this.timer.value;
    createCustomEvent(evtRefreshTime, this.time);
  }

  getTime() {
    return definition.maxTimeForAnswer - this.time;
  }

  save(time) {
    this.setTypeAnswer(time);
    this.isFinished = true;
  }

  setTypeAnswer(time) {
    this.typeAnswer = this.estimator.getTypeAnswerTotal(this.options, time);
  }

  finish() {
    this.timer.stop();
    this.save(this.getTime());
  }

  expired() {
    this.save(this.getTime() + 1);
  }

}

export {Task};
