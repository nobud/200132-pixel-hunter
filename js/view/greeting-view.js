import ViewAbstract from './view-abstract';
import {getLogo} from './logo/logo-template';
import getFooter from './footer/footer-template';

export default class GreetingView extends ViewAbstract {

  get next() {
    if (!this._next) {
      this._next = this.elementDOM.querySelector(`.greeting__continue`);
    }
    return this._next;
  }

  get htmlTemplate() {
    return this.getArticle();
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

  bindHandlers() {
    this.next.addEventListener(`click`, () => {
      this.onNextClick();
    });
  }

  onNextClick() {
  }
}
