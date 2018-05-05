import GameScreenAbstract from './game-screen-abstract';
import TypeValueToTypeImage from '../game-helper/adapt-types';
import {createCustomEvent, evtAnsweredTask} from '../../util/util';

class GameScreenThreeImg extends GameScreenAbstract {

  isAnswered(evt) {
    return this.view.getClickedGameOption(evt.target);
  }

  getAnswer(clickedOption) {
    const indexOption = this.view.getIndexGameOption(clickedOption);
    return [{
      value: TypeValueToTypeImage.photo,
      index: indexOption
    }];
  }

  onAnswerClick(evt) {
    const clickedOption = this.isAnswered(evt);
    if (clickedOption) {
      createCustomEvent(evtAnsweredTask, this.getAnswer(clickedOption));
    }
  }
}

export default new GameScreenThreeImg();
