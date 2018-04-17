import {AbstractScreen} from './abstract-screen';
import {createCustomEvent, evtAnsweredTask} from '../util';
import {ScreenGameView} from './screen-game-view';
import {TypeImage} from '../game/option';

const TypeValueToTypeImage = {
  paint: TypeImage.PAINTING,
  photo: TypeImage.PHOTO
};

class ScreenGame extends AbstractScreen {
  constructor(task, state) {
    super();
    this.task = task;
    this.state = state;
  }

  initOtherHandlers() {
    this.view.onAnswerClick = this.onAnswerClick.bind(this);
  }

  get view() {
    if (!this._view) {
      this._view = new ScreenGameView(this.task, this.state);
      this.initBackHandler();
      this.initOtherHandlers();
      this.task.start();
    }
    return this._view;
  }

  onAnswerClick() {
    createCustomEvent(evtAnsweredTask);
  }

  setSelectedValue(index, value) {
    this.task.options[index].answeredType = value;
  }

  getTypeImage(value) {
    return TypeValueToTypeImage[value];
  }
}

export {ScreenGame, TypeValueToTypeImage};
