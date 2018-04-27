import {ScreenAbstract} from './screen-abstract';
import {GreetingView} from '../view/greeting-view';

class GreetingScreen extends ScreenAbstract {

  setView() {
    this.view = new GreetingView();
    this.initNextHandler();
  }

  init() {
    this.setView();
    this.showView();
  }
}

export default new GreetingScreen();
