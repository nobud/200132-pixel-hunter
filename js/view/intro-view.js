import {AbstractView} from './abstract-view';
import getFooter from './footer/footer-template';

class IntroView extends AbstractView {

  get htmlTemplate() {
    return this.getArticle();
  }

  get next() {
    if (!this._next) {
      this._next = this.elementDOM.querySelector(`.intro__asterisk`);
    }
    return this._next;
  }

  onNextClick() {
  }

  bindHandlers() {
    this.next.addEventListener(`click`, () => {
      this.onNextClick();
    });
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
}

export {IntroView};
