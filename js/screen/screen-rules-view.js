import {getHeader} from './header/header-template';
import getFooter from './footer/footer-template';
import definition from '../data/definition';
import {AbstractView} from './abstract-view';

class ScreenRulesView extends AbstractView {

  get htmlTemplate() {
    return this.getArticle();
  }

  get formRules() {
    if (!this._formRules) {
      this._formRules = this.elementDOM.querySelector(`.rules__form`);
    }
    return this._formRules;
  }

  get btnSubmit() {
    if (!this._btnSubmit) {
      this._btnSubmit = this.formRules.querySelector(`.rules__button`);
    }
    return this._btnSubmit;
  }

  get back() {
    if (!this._back) {
      this._back = this.elementDOM.querySelector(`.header__back`);
    }
    return this._back;
  }

  get inputUserName() {
    if (!this._inputUserName) {
      this._inputUserName = this.formRules.querySelector(`.rules__input`);
    }
    return this._inputUserName;
  }

  onBackClick() {
  }

  onFormRulesSubmit() {
  }

  onInputUserName() {
  }

  bindHandlers() {
    this.back.addEventListener(`click`, () => {
      this.onBackClick();
    });
    this.formRules.addEventListener(`submit`, () => {
      this.onFormRulesSubmit();
    });
    this.inputUserName.addEventListener(`input`, (evt) => {
      this.onInputUserName(evt);
    });
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
}

export {ScreenRulesView};
