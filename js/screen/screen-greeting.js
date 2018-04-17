import {AbstractScreen} from './abstract-screen';
import {ScreenGreetingView} from './screen-greeting-view';

class ScreenGreeting extends AbstractScreen {
  get view() {
    if (!this._view) {
      this._view = new ScreenGreetingView();
      this.initNextHandler();
    }
    return this._view;
  }
}

export {ScreenGreeting};
