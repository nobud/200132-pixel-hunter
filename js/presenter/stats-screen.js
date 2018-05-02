import {ScreenAbstract} from './screen-abstract';
import {StatsView} from '../view/stats-view';
import dataResults from '../model/results';

class StatsScreen extends ScreenAbstract {

  setView(results) {
    this.view = new StatsView(results);
    this.initBackHandler();
  }

  init() {
    const results = this.loadStats();
    this.setView(results);
    this.showView();
  }

  loadStats() {
    // заглушка для получения статистики с сервера
    return dataResults;
  }
}

export default new StatsScreen();
