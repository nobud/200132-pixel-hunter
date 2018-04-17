import definition from '../data/definition';
import {Answer} from './answer';
import {Task} from './task';

class GameData {
  constructor(tasks) {
    this.initState();
    this.initData(tasks);
  }

  saveAnswer(index, answer) {
    this.state.answers[index].type = answer;
  }

  isAnswerWrong(index) {
    return this.state.answers[index].isWrong();
  }

  getCountLives() {
    return this.state.numberLives;
  }

  loseLife() {
    this.state.numberLives--;
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
    this.state.numberLives = definition.maxLives;
    this.state.answers = this.initAnswers();
  }

  reset() {
    this.initState();
    this.initData(this.data);
  }
}

export {GameData};
