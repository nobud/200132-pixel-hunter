import ViewAbstract from './view-abstract';
import getFooter from './footer/footer-template';

export default class IntroView extends ViewAbstract {
  get next() {
    if (!this._next) {
      this._next = this.elementDOM.querySelector(`.intro__asterisk`);
    }
    return this._next;
  }

  get htmlTemplate() {
    return this.getArticle();
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

  bindHandlers() {
    this.next.addEventListener(`click`, () => {
      this.onNextClick();
    });
  }

  onNextClick() {
  }
}
