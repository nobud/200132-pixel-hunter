import definition from './definition';
import {Answer} from './answer';
import {Task} from './task';

class GameModel {
  constructor(userName, tasks) {
    this.initState();
    this.initData(userName, tasks);
  }

  initData(userName, tasks) {
    this._user = userName;
    this.data = tasks;
    this.tasks = tasks.map((task) => {
      return new Task(task);
    });
  }

  initAnswers() {
    let answers = [];
    while (answers.length < definition.numberOfRequiredAnswers) {
      answers.push(new Answer());
    }
    return answers;
  }

  initState() {
    this.state = {};
    this.state.time = definition.maxTimeForAnswer;
    this.state.numberLives = definition.maxLives;
    this.state.answers = this.initAnswers();
    this.state.result = null;
  }

  get user() {
    return this._user;
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

  refreshTime(time) {
    this.state.time = time;
  }

  isAnswerWrong(index) {
    return this.state.answers[index].isWrong();
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
    this.initState();
    this.initData(this.user, this.data);
  }
}

export {GameModel};
