import {EstimationTask} from './estimation-task';
import {TypeAnswer} from './type-answer';
import definition from '../data/definition';
import {Option} from './option';

class Task {
  constructor(task) {
    this.type = task.type;
    this.text = task.text;
    this.options = task.options.map((option) => {
      return new Option(option);
    });
    this._time = definition.maxTimeForAnswer;
    this.estimator = new EstimationTask(task.type);
    this.isFinished = false;
    this.typeAnswer = TypeAnswer.UNKNOWN;
  }

  get time() {
    return definition.maxTimeForAnswer - this._time;
  }

  setTypeAnswer(time) {
    this.typeAnswer = this.estimator.getTypeAnswerTotal(this.options, time);
  }

  setTime() {
    const TEST_TIME = 15;
    this._time = TEST_TIME;
  }

  finish() {
    this.isFinished = true;
    this.setTime();
    this.setTypeAnswer(this.time);
  }
}

export {Task};
