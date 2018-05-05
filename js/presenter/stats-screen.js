import {ScreenAbstract} from './screen-abstract';
import {StatsView} from '../view/stats-view';

class StatsScreen extends ScreenAbstract {

  setView(results) {
    this.view = new StatsView(results);
    this.initBackHandler();
  }

  init(results) {
    this.setView(results);
    this.showView();
  }
}

export default new StatsScreen();
