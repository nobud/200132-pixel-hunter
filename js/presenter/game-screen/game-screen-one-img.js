import {GameScreenAbstract} from './game-screen-abstract';
import {createCustomEvent, evtAnsweredTask} from '../../util';

class GameScreenOneImg extends GameScreenAbstract {
  constructor() {
    super();
    this.indexOption = 0;
  }

  isAnswered(optionAnswers) {
    return [...optionAnswers].some((radio) => radio.checked);
  }

  onAnswerClick() {
    if (this.isAnswered(this.view.optionAnswers)) {
      createCustomEvent(evtAnsweredTask, this.getAnswer(this.view.optionAnswers));
    }
  }

  getAnswer(optionAnswers) {
    return [{
      value: this.getTypeImage([...optionAnswers].find((radio) => radio.checked).value),
      index: this.indexOption
    }];
  }
}

export default new GameScreenOneImg();
