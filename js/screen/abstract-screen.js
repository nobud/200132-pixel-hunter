import {showScreen, createCustomEvent, evtNext, evtBack} from '../util';

class AbstractScreen {

  initNextHandler() {
    this.view.onNextClick = this.onNextElementClick;
  }

  initBackHandler() {
    this.view.onBackClick = this.onBackElementClick;
  }

  get view() {
    throw new Error(`You have to define view`);
  }

  showView() {
    showScreen(this.view.elementDOM);
  }

  onNextElementClick() {
    createCustomEvent(evtNext);
  }

  onBackElementClick() {
    createCustomEvent(evtBack);
  }
}

export {AbstractScreen};
