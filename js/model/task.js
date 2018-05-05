import EstimationTask from '../presenter/game-helper/estimation-task';
import definition from './definition';
import Option from './option';

export default class Task {
  constructor(task) {
    this.type = task.type;
    this.text = task.text;
    this.options = task.options.map((option) => {
      return new Option(option);
    });
    this._time = 0;
    this.estimator = new EstimationTask(task.type);
    this.typeAnswer = definition.TypeAnswer.UNKNOWN;
  }

  get time() {
    return this._time;
  }

  set time(time) {
    this._time = definition.MAX_TIME_FOR_ANSWER - time;
  }

  finish(time) {
    this.time = time;
    this.setTypeAnswer(this.time);
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
