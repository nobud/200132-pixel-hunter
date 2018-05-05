import ScreenAbstract from './screen-abstract';
import GreetingView from '../view/greeting-view';

class GreetingScreen extends ScreenAbstract {
  init() {
    this.setView();
    this.showView();
  }

  setView() {
    this.view = new GreetingView();
    this.initNextHandler();
  }
}

export default new GreetingScreen();
