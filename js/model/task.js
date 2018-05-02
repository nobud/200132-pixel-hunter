import {EstimationTask} from '../presenter/game-helper/estimation-task';
import {TypeAnswer} from '../presenter/game-helper/type-answer';
import definition from './definition';
import {Option} from './option';

class Task {
  constructor(task) {
    this.type = task.type;
    this.text = task.text;
    this.options = task.options.map((option) => {
      return new Option(option);
    });
    this._time = 0;
    this.estimator = new EstimationTask(task.type);
    this.isFinished = false;
    this.typeAnswer = TypeAnswer.UNKNOWN;
  }

  set time(time) {
    this._time = definition.maxTimeForAnswer - time;
  }

  get time() {
    return this._time;
  }

  finish(time) {
    this.time = time;
    this.setTypeAnswer(this.time);
    this.isFinished = true;
  }

  setTypeAnswer(time) {
    this.typeAnswer = this.estimator.getTypeAnswerTotal(this.options, time);
  }

  saveAnswerValue(valueAnswer, indexOption) {
    this.options[indexOption].answeredType = valueAnswer;
  }

  saveAnswersValues(valuesAnswers) {
    if (valuesAnswers) {
      valuesAnswers.forEach((valueAnswer) => {
        this.saveAnswerValue(valueAnswer.value, valueAnswer.index);
      });
    }
  }
}

export {Task};
