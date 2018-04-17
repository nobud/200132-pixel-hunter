import {createCustomEvent, evtNext} from '../util';

class Screen {
  onNextElementClick() {
    createCustomEvent(evtNext);
  }
}

export {Screen};
