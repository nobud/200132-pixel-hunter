import {AbstractScreen} from './abstract-screen';
import {ScreenIntroView} from './screen-intro-view.js';

class ScreenIntro extends AbstractScreen {
  get view() {
    if (!this._view) {
      this._view = new ScreenIntroView();
      this.initNextHandler();
    }
    return this._view;
  }
}

export {ScreenIntro};
