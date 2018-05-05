import ScreenAbstract from './screen-abstract';
import {createCustomEvent, evtNext} from '../util/util';
import RulesView from '../view/rules-view';

class RulesScreen extends ScreenAbstract {
  init() {
    this.setView();
    this.showView();
  }

  initOtherHandlers() {
    this.view.onFormRulesSubmit = this.onFormRulesSubmit;
    this.view.onInputUserName = this.onInputUserName;
  }

  setView() {
    this.view = new RulesView();
    this.initBackHandler();
    this.initOtherHandlers();
  }

  onFormRulesSubmit() {
    createCustomEvent(evtNext, this.inputUserName.value.trim());
  }

  onInputUserName(evt) {
    this.btnSubmit.disabled = !evt.target.value.trim();
  }
}

export default new RulesScreen();
