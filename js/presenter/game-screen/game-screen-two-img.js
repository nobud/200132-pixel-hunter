import GameScreenAbstract from './game-screen-abstract';
import {createCustomEvent, evtAnsweredTask} from '../../util/util';

class GameScreenTwoImg extends GameScreenAbstract {
  isAnswered(optionsAnswers) {
    return optionsAnswers.every((option) => [...option].some((radio) => radio.checked));
  }

  getAnswer(optionsAnswers) {
    return optionsAnswers.map((option, indexOption) => {
      return {
        value: this.getTypeImage([...option].find((radio) => radio.checked).value),
        index: indexOption
      };
    });
  }

  onAnswerClick() {
    if (this.isAnswered(this.view.optionsAnswers)) {
      createCustomEvent(evtAnsweredTask, this.getAnswer(this.view.optionsAnswers));
    }
  }
}

export default new GameScreenTwoImg();
