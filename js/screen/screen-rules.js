import {getElementFromTemplate} from '../util';
import {getHeader} from './header/header-template';
import initHeader from './header/header-init';
import getFooter from './footer/footer-template';
import definition from '../data/definition';
import {Screen} from './screen';

class ScreenRules extends Screen {
  constructor() {
    super();
    this.htmlTemplate = this.getArticle();
    this.elementDOM = getElementFromTemplate(this.htmlTemplate);
    this.btnSubmit = this.elementDOM.querySelector(`.rules__button`);
    this.initElementDOM();
  }

  getTemplate() {
    return `
    <h1 class="rules__title">Правила</h1>
        <p class="rules__description">Угадай ${definition.numberOfRequiredAnswers} раз для каждого изображения фото <img
          src="img/photo_icon.png" width="16" height="16"> или рисунок <img
          src="img/paint_icon.png" width="16" height="16" alt="">.<br>
          Фотографиями или рисунками могут быть оба изображения.<br>
          На каждую попытку отводится ${definition.maxTimeForAnswer} секунд.<br>
          Ошибиться можно не более ${definition.maxLives} раз.<br>
          <br>
          Готовы?
        </p>
        <form class="rules__form">
          <input class="rules__input" type="text" placeholder="Ваше Имя">
          <button class="rules__button  continue" type="submit" disabled>Go!</button>
        </form>`;
  }

  getArticle() {
    return `
    ${getHeader()}
      <div class="rules">
        ${this.getTemplate()}
      </div>
      ${getFooter()}`;
  }

  onFormRulesSubmit() {
    this.onNextElementClick();
  }

  onInputUserName(evt) {
    this.btnSubmit.disabled = !evt.target.value.trim();
  }

  initElementDOM() {
    const back = this.elementDOM.querySelector(`.header__back`);
    initHeader(back);
    const formRules = this.elementDOM.querySelector(`.rules__form`);
    const inputUserName = formRules.querySelector(`.rules__input`);
    formRules.addEventListener(`submit`, this.onFormRulesSubmit.bind(this));
    inputUserName.addEventListener(`input`, this.onInputUserName.bind(this));
  }
}

export {ScreenRules};
