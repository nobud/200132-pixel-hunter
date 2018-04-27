import {AbstractView} from './abstract-view';
import definition from '../definition';
import {getGameHeader} from './header/header-template';
import getFooter from './footer/footer-template';
import getStatsTemplate from './stats-result/stats-result-template';
import {getNewSizeImage, evtRefreshTime} from '../util';

class GameView extends AbstractView {
  constructor(task, state) {
    super();
    this.task = task;
    this.state = state;
  }

  get htmlTemplate() {
    this.initParamsTemplate();
    return this.getArticle(this.task, this.state);
  }

  get gameTimer() {
    if (!this._gameTimer) {
      this._gameTimer = this.elementDOM.querySelector(`.game__timer`);
    }
    return this._gameTimer;
  }

  get back() {
    if (!this._back) {
      this._back = this.elementDOM.querySelector(`.header__back`);
    }
    return this._back;
  }

  get srcImages() {
    if (!this._srcImages) {
      this._srcImages = this.task.options.map((option) => {
        return option.srcImage;
      });
    }
    return this._srcImages;
  }

  get images() {
    if (!this._images) {
      this._images = [...this.elementDOM.querySelectorAll(`.game__option img`)];
    }
    return this._images;
  }

  get gameContent() {
    if (!this._gameContent) {
      this._gameContent = this.elementDOM.querySelector(`.game__content`);
    }
    return this._gameContent;
  }

  get gameOptions() {
    if (!this._gameOptions) {
      this._gameOptions = this.gameContent.querySelectorAll(`.game__option`);
    }
    return this._gameOptions;
  }

  get optionAnswers() {
    if (!this._optionAnswers) {
      this._optionAnswers = this.gameContent.querySelectorAll(`input[type="radio"]`);
    }
    return this._optionAnswers;
  }

  get optionsAnswers() {
    if (!this._optionsAnswers) {
      this._optionsAnswers = [];
      this._optionsAnswers.push(this.gameContent.querySelectorAll(`input[name="question1"]`));
      this._optionsAnswers.push(this.gameContent.querySelectorAll(`input[name="question2"]`));
    }
    return this._optionsAnswers;
  }

  getClickedGameOption(element) {
    return element.closest(`.game__option`);
  }

  resizeImage(imageDOM, imageLoaded) {
    let newSize = getNewSizeImage({width: imageLoaded.width, height: imageLoaded.height}, {width: this.widthOption, height: this.heightOption});
    imageDOM.style.width = newSize.width;
    imageDOM.style.height = newSize.height;
    return imageDOM;
  }

  onLoadImage(evt) {
    const imageLoaded = evt.target;
    const src = imageLoaded.src;
    const imageDOM = this.images[this.srcImages.indexOf(src)];
    this.resizeImage(imageDOM, imageLoaded);
    imageDOM.src = src;
  }

  initImages() {
    this.srcImages.forEach((srcImage) => {
      let image = new Image();
      image.addEventListener(`load`, this.onLoadImage.bind(this));
      image.src = srcImage;
    });
  }

  onAnswerClick() {

  }

  onRefreshTime(evt) {
    this.gameTimer.textContent = evt.detail.data;
  }

  bindHandlers() {
    this.initImages();

    this.back.addEventListener(`click`, () => {
      this.onBackClick();
    });

    this.gameContent.addEventListener(`click`, (evt) => {
      this.onAnswerClick(evt);
    });

    window.addEventListener(evtRefreshTime, (evt) => {
      this.onRefreshTime(evt);
    });
  }

  initParamsTemplate() {
    const inits = this.getInitParams();
    this.modificatorTemplate = inits.modificatorTemplate;
    this.widthOption = inits.width;
    this.heightOption = inits.height;
  }

  getInitParams() {
    let inits = {};
    switch (this.task.type) {
      case definition.TypeTask.ONE_IMG:
        inits.modificatorTemplate = `game__content--wide`;
        inits.width = 705;
        inits.height = 455;
        break;
      case definition.TypeTask.TWO_IMG:
        inits.modificatorTemplate = ``;
        inits.width = 468;
        inits.height = 458;
        break;
      case definition.TypeTask.THREE_IMG:
        inits.modificatorTemplate = `game__content--triple`;
        inits.width = 304;
        inits.height = 455;
        break;
    }
    return inits;
  }

  getOption(index) {
    if (this.task.type === definition.TypeTask.THREE_IMG) {
      return `
      <div class="game__option">
        <img alt="${index + 1}" width=${this.widthOption} height=${this.heightOption}>
      </div>`;
    } else {
      return `
      <div class="game__option">
        <img alt="${index + 1}" width=${this.widthOption} height=${this.heightOption}>
        <label class="game__answer  game__answer--photo">
          <input name="question${index + 1}" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input name="question${index + 1}" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>`;
    }
  }

  getTemplate(task) {
    return `<p class="game__task">${task.text}</p>
    <form class="game__content ${this.modificatorTemplate}">
     ${task.options.map((option, i) => this.getOption(i)).join(``)}
    </form>`;
  }

  getArticle(task, state) {
    return `
      ${getGameHeader(state, state.time)}
      <div class="game">
        ${this.getTemplate(task)}
        ${getStatsTemplate(state.answers)}
      </div>
      ${getFooter()}`;
  }

  getIndexGameOption(option) {
    return [...this.gameOptions].indexOf(option);
  }
}

export {GameView};
