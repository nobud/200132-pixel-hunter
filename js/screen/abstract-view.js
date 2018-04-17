import {getElementFromTemplate} from '../util';

class AbstractView {

  get htmlTemplate() {
    throw new Error(`You have to define template for view`);
  }

  render() {
    return getElementFromTemplate(this.htmlTemplate);
  }

  onBackClick() {
  }

  bindHandlers() {
  }

  get elementDOM() {
    if (!this._elementDOM) {
      this._elementDOM = this.render();
      this.bindHandlers();
    }
    return this._elementDOM;
  }
}

export {AbstractView};
