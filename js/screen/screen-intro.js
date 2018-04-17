import getFooter from './footer/footer-template';
import {getElementFromTemplate} from '../util';
import {Screen} from './screen';

class ScreenIntro extends Screen {
  constructor() {
    super();
    this.htmlTemplate = this.getArticle();
    this.elementDOM = getElementFromTemplate(this.htmlTemplate);
    this.nextElement = this.elementDOM.querySelector(`.intro__asterisk`);
    this.initElementDOM();
  }

  getTemplate() {
    return `
      <div id="intro" class="intro">
        <h1 class="intro__asterisk">*</h1>
        <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
      </div>`;
  }

  getArticle() {
    return `
      <div id="main" class="central__content">
        ${this.getTemplate()}
      </div>
      ${getFooter()}`;
  }

  initElementDOM() {
    this.nextElement.addEventListener(`click`, this.onNextElementClick);
  }
}

export {ScreenIntro};
