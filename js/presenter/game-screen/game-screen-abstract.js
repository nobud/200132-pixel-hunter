import {ScreenAbstract} from '../screen-abstract';
import {GameView} from '../../view/game-view';
import {TypeValueToTypeImage} from '../../model/option';

class GameScreenAbstract extends ScreenAbstract {

  initOtherHandlers() {
    this.view.onAnswerClick = this.onAnswerClick.bind(this);
  }

  setView(task, state) {
    this.view = new GameView(task, state);
    this.initBackHandler();
    this.initOtherHandlers();
  }

  getSelectedValue(valueOption) {
    return valueOption;
  }

  getTypeImage(value) {
    return TypeValueToTypeImage[value];
  }

  init(task, state) {
    this.setView(task, state);
    this.showView();
  }
}

export {GameScreenAbstract};
