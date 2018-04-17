import {getElementFromTemplate} from '../util';
import getFooter from './footer/footer-template';
import {getLogo} from './logo/logo-template';
import {Screen} from './screen';

class ScreenGreeting extends Screen {
  constructor() {
    super();
    this.htmlTemplate = this.getArticle();
    this.elementDOM = getElementFromTemplate(this.htmlTemplate);
    this.nextElement = this.elementDOM.querySelector(`.greeting__continue`);
    this.initElementDOM();
  }

  getTemplate() {
    return `
      <div class="greeting__logo">${getLogo()}</div>
      <h1 class="greeting__asterisk">*</h1>
      <div class="greeting__challenge">
        <h3>Лучшие художники-фотореалисты бросают&nbsp;тебе&nbsp;вызов!</h3>
        <p>Правила игры просты.<br>
          Нужно отличить рисунок&nbsp;от фотографии и сделать выбор.<br>
          Задача кажется тривиальной, но не думай, что все так просто.<br>
          Фотореализм обманчив и коварен.<br>
          Помни, главное — смотреть очень внимательно.</p>
      </div>
      <div class="greeting__continue"><span><img src="img/arrow_right.svg" width="64" height="64" alt="Next"></span></div>`;
  }

  getArticle() {
    return `
      <div class="greeting central--blur">
        ${this.getTemplate()}
      </div>
      ${getFooter()}`;
  }

  initElementDOM() {
    this.nextElement.addEventListener(`click`, this.onNextElementClick);
  }
}

export {ScreenGreeting};
