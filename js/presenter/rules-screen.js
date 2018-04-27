import {ScreenAbstract} from './screen-abstract';
import {RulesView} from '../view/rules-view';

class RulesScreen extends ScreenAbstract {

  initOtherHandlers() {
    this.view.onFormRulesSubmit = this.onNextElementClick;
    this.view.onInputUserName = this.onInputUserName;
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
