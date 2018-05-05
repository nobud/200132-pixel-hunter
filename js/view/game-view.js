import ViewAbstract from './view-abstract';
import definition from '../model/definition';
import {getGameHeader} from './header/header-template';
import getFooter from './footer/footer-template';
import {confirmTemplate} from './confirm/confirm';
import getStatsTemplate from './stats-result/stats-result-template';
import {evtRefreshTime} from '../util/util';

export default class GameView extends ViewAbstract {
  constructor(task, state) {
    super();
    this.task = task;
    this.state = state;
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

  get modal() {
    if (!this._modal) {
      this._modal = this.elementDOM.querySelector(`.confirm`);
    }
    return this._modal;
  }

  get confirmBack() {
    if (!this._confirmBack) {
      this._confirmBack = this.elementDOM.querySelector(`.confirm__ok`);
    }
    return this._confirmBack;
  }

  get cancelBack() {
    if (!this._cancelBack) {
      this._cancelBack = this.elementDOM.querySelector(`.confirm__cancel`);
    }
    return this._cancelBack;
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

  get htmlTemplate() {
    this.initParamsTemplate();
    return this.getArticle(this.task, this.state);
  }

  getClickedGameOption(element) {
    return element.closest(`.game__option`);
  }

  resizeImage(imgDOM, newSize) {
    imgDOM.width = newSize.width;
    imgDOM.height = newSize.height;
    return imgDOM;
  }

  initImages() {
    this.task.options.forEach((option, it) => {
      const imgDOM = this.images[it];
      this.resizeImage(imgDOM, {width: option.widthImg, height: option.heightImg});
      imgDOM.src = option.srcImage;
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
      ${getFooter()}
      ${confirmTemplate}`;
  }

  getIndexGameOption(option) {
    return [...this.gameOptions].indexOf(option);
  }

  bindHandlers() {
    this.initImages();
    this.back.addEventListener(`click`, () => {
      this.onBackClick();
    });
    this.gameContent.addEventListener(`click`, (evt) => {
      this.onAnswerClick(evt);
    });
    this.confirmBack.addEventListener(`click`, () => {
      this.onConfirmBackClick();
    });
    this.cancelBack.addEventListener(`click`, () => {
      this.onCancelBackClick();
    });
    window.addEventListener(evtRefreshTime, () => {
      this.onRefreshTime();
    });
  }

  onConfirmBackClick() {
  }

  onCancelBackClick() {
  }

  onAnswerClick() {
  }

  onRefreshTime() {
  }

  onStartBlinkTime() {
  }

}
