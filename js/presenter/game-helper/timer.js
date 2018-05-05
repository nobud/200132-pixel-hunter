import {createCustomEvent, evtExpiredTimer, evtTickTimer} from '../../util/util';
import getCounter from './counter';

export default class Timer {
  constructor(time) {
    this.counter = getCounter(time);
    this.interval = 1000;
  }

  get value() {
    if (this.counter) {
      return this.counter.getValue();
    }
    return null;
  }

  start() {
    if (this.counter) {
      this.refresh();
    }
  }

  stop() {
    clearTimeout(this.id);
  }

  tick() {
    this.counter = this.counter.tick();
    createCustomEvent(evtTickTimer);
  }

  refresh() {
    this.id = setTimeout(this.onTimeout.bind(this), this.interval);
  }

  onTimeout() {
    this.tick();
    if (this.value > 0) {
      this.refresh();
    } else {
      createCustomEvent(evtExpiredTimer);
    }
  }
}
