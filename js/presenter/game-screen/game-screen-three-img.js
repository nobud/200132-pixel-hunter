import {GameScreenAbstract} from './game-screen-abstract';
import {TypeValueToTypeImage} from '../../model/option';
import {createCustomEvent, evtAnsweredTask} from '../../util';

class GameScreenThreeImg extends GameScreenAbstract {

  isAnswered(evt) {
    return this.view.getClickedGameOption(evt.target);
  }

  onAnswerClick(evt) {
    const clickedOption = this.isAnswered(evt);
    if (clickedOption) {
      createCustomEvent(evtAnsweredTask, this.getAnswer(clickedOption));
    }
  }

  getAnswer(clickedOption) {
    const indexOption = this.view.getIndexGameOption(clickedOption);
    return [{
      value: TypeValueToTypeImage.photo,
      index: indexOption
    }];
  }
}

export default new GameScreenThreeImg();
