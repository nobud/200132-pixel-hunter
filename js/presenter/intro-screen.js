import {ScreenAbstract} from './screen-abstract';
import {IntroView} from '../view/intro-view.js';

class IntroScreen extends ScreenAbstract {

  setView() {
    this.view = new IntroView();
    this.initNextHandler();
  }

  init() {
    this.setView();
    this.showView();
  }
}

export default new IntroScreen();
