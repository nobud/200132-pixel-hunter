import {AbstractScreen} from './abstract-screen';
import {ScreenRulesView} from './screen-rules-view';

class ScreenRules extends AbstractScreen {
  initOtherHandlers() {
    this.view.onFormRulesSubmit = this.onNextElementClick;
    this.view.onInputUserName = this.onInputUserName;
  }

  onInputUserName(evt) {
    this.btnSubmit.disabled = !evt.target.value.trim();
  }

  get view() {
    if (!this._view) {
      this._view = new ScreenRulesView();
      this.initBackHandler();
      this.initOtherHandlers();
    }
    return this._view;
  }
}

export {ScreenRules};
