import {showElement, createCustomEvent, evtNext, evtBack} from '../util/util';

export default class ScreenAbstract {

  constructor() {
    if (new.target === ScreenAbstract) {
      throw new Error(`Can't instantiate abstract class`);
    }
  }

  initNextHandler() {
    this.view.onNextClick = this.onNextElementClick;
  }

  initBackHandler() {
    this.view.onBackClick = this.onBackElementClick;
  }

  showView() {
    showElement(this.view.elementDOM);
  }

  onNextElementClick() {
    createCustomEvent(evtNext);
  }

  onBackElementClick() {
    createCustomEvent(evtBack);
  }
}
