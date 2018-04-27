import definition from '../definition';
import {Answer} from './answer';
import {Task} from './task';

class GameModel {
  constructor(tasks) {
    this.initState();
    this.initData(tasks);
  }

  initData(tasks) {
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
  }

  saveAnswer(index, answer) {
    this.state.answers[index].type = answer;
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
    this.initData(this.data);
  }
}

export {GameModel};
