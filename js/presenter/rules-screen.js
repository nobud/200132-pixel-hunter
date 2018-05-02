import {ScreenAbstract} from './screen-abstract';
import {createCustomEvent, evtNext} from '../util/util';
import {RulesView} from '../view/rules-view';

class RulesScreen extends ScreenAbstract {

  initOtherHandlers() {
    this.view.onFormRulesSubmit = this.onFormRulesSubmit;
    this.view.onInputUserName = this.onInputUserName;
  }

  onFormRulesSubmit() {
    createCustomEvent(evtNext, this.inputUserName.value.trim());
  }

  onInputUserName(evt) {
    this.btnSubmit.disabled = !evt.target.value.trim();
  }

  setView() {
    this.view = new RulesView();
    this.initBackHandler();
    this.initOtherHandlers();
  }

  init() {
    this.setView();
    this.showView();
  }
}

export default new RulesScreen();
