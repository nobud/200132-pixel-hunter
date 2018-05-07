import GameScreenAbstract from './game-screen-abstract';
import {createCustomEvent, evtAnsweredTask} from '../../util/util';

class GameScreenThreeImg extends GameScreenAbstract {
  isAnswered(evt) {
    return this.view.getClickedGameOption(evt.target);
  }

  getValue() {
    return this.typeChoose;
  }

  getAnswer(clickedOption) {
    const indexOption = this.view.getIndexGameOption(clickedOption);
    return [{
      value: this.getValue(),
      index: indexOption
    }];
  }

  init(task, state) {
    this.typeChoose = task.typeChooseThreeOfThree;
    super.init(task, state);
  }

  onAnswerClick(evt) {
    const clickedOption = this.isAnswered(evt);
    if (clickedOption) {
      createCustomEvent(evtAnsweredTask, this.getAnswer(clickedOption));
    }
  }
}

export default new GameScreenThreeImg();
