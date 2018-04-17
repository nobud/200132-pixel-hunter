import {AbstractScreen} from './abstract-screen';
import {ScreenStatsView} from './screen-stats-view';

class ScreenStats extends AbstractScreen {
  constructor(results) {
    super();
    this.results = results;
  }

  get view() {
    if (!this._view) {
      this._view = new ScreenStatsView(this.results);
      this.initBackHandler();
    }
    return this._view;
  }
}

export {ScreenStats};
