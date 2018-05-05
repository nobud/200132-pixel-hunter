import ScreenAbstract from './screen-abstract';
import StatsView from '../view/stats-view';

class StatsScreen extends ScreenAbstract {
  init(results) {
    this.setView(results);
    this.showView();
  }

  setView(results) {
    this.view = new StatsView(results);
    this.initBackHandler();
  }
}

export default new StatsScreen();
