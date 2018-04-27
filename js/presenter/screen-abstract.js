import {showElement, createCustomEvent, evtNext, evtBack} from '../util';

class ScreenAbstract {

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

export {ScreenAbstract};
