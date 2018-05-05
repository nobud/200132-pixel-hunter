import definition from './definition';
import Answer from './answer';
import Task from './task';

export default class GameModel {
  constructor(userName, tasks) {
    this.__initState();
    this.__initData(userName, tasks);
  }

  get user() {
    return this._user;
  }

  getAnswers() {
    return this.state.answers;
  }

  getCountLives() {
    return this.state.numberLives;
  }

  getTime() {
    return this.state.time;
  }

  refreshTime(time) {
    this.state.time = time;
  }

  getTask(index) {
    return this.tasks[index];
  }

  getState() {
    return this.state;
  }

  getTasksLength() {
    return this.tasks.length;
  }

  reset() {
    this.__initState();
    this.__initData(this.user, this.data);
  }

  saveAnswer(index, answer) {
    this.state.answers[index].type = answer;
  }

  saveResult(result) {
    this.state.result = result;
  }

  loseLife() {
    this.state.numberLives--;
  }

  isAnswerWrong(index) {
    return this.state.answers[index].isWrong();
  }

  __initAnswers() {
    let answers = [];
    while (answers.length < definition.NUMBER_OF_REQUIRED_ANSWERS) {
      answers.push(new Answer());
    }
    this.state.answers = answers;
  }

  __initData(userName, tasks) {
    this.data = tasks;
    this._user = userName;
    this.tasks = tasks.map((task) => {
      return new Task(task);
    });
  }

  __initState() {
    this.state = {};
    this.state.result = null;
    this.state.time = definition.MAX_TIME_FOR_ANSWER;
    this.state.numberLives = definition.MAX_LIVES;
    this.__initAnswers();
  }
}
