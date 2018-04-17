import {getElementFromTemplate} from '../util';
import definition from '../data/definition';
import {getGameHeader} from './header/header-template';
import initHeader from './header/header-init';
import getFooter from './footer/footer-template';
import getStatsTemplate from './stats-result/stats-result-template';
import {createCustomEvent, evtFinishedTask} from '../util';
import {TypeImage} from '../game/option';

const TypeValueToTypeImage = {
  paint: TypeImage.PAINTING,
  photo: TypeImage.PHOTO
};

class ScreenGame {
  constructor(task, state) {
    this.task = task;
    this.init();
    this.htmlTemplate = this.getArticle(task, state);
    this.elementDOM = getElementFromTemplate(this.htmlTemplate);
    this.initElementDOM();
  }

  init() {
    const inits = this.getInitParams(this.task);
    this.gameModificatorClass = inits.gameModificatorClass;
    this.widthOption = inits.width;
    this.heightOption = inits.height;
  }

  getInitParams(task) {
    let inits = {};
    switch (task.type) {
      case definition.TypeTask.ONE_IMG:
        inits.gameModificatorClass = `game__content--wide`;
        inits.width = 705;
        inits.height = 455;
        break;
      case definition.TypeTask.TWO_IMG:
        inits.gameModificatorClass = ``;
        inits.width = 468;
        inits.height = 458;
        break;
      case definition.TypeTask.THREE_IMG:
        inits.gameModificatorClass = `game__content--triple`;
        inits.width = 304;
        inits.height = 455;
        break;
    }
    return inits;
  }

  // src=${option.srcImage}
  getOption(option, index) {
    return `
    <div class="game__option">
      <img alt="Option ${index + 1}" width=${this.widthOption} height=${this.heightOption}>
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

  getTemplate(task) {
    return `<p class="game__task">${task.text}</p>
    <form class="game__content ${this.gameModificatorClass}">
     ${task.options.map((option, i) => this.getOption(option, i)).join(``)}
    </form>`;
  }

  getArticle(task, state) {
    return `
      ${getGameHeader(state, task.time)}
      <div class="game">
        ${this.getTemplate(task)}
        ${getStatsTemplate(state.answers)}
      </div>
      ${getFooter()}`;
  }

  onAnswerClick() {
    createCustomEvent(evtFinishedTask);
  }

  getSrcImages(options) {
    return options.map((option) => {
      return option.srcImage;
    });
  }

  getImages() {
    return [...this.elementDOM.querySelectorAll(`.game__option img`)];
  }

  getNewSizeImage(sizeElement, sizeContainer) {
    if (sizeElement.height > sizeElement.width) {
      sizeElement.height = sizeContainer.height;
      sizeElement.width = `auto`;
    } else {
      sizeElement.width = sizeContainer.width;
      sizeElement.height = `auto`;
    }

    return sizeElement;
  }

  onLoadImage(evt) {
    const src = evt.target.src;
    const image = this.images[this.srcImages.indexOf(src)];
    let newSizeImage = this.getNewSizeImage({width: evt.target.width, height: evt.target.height}, {width: this.widthOption, height: this.heightOption});
    image.style.width = newSizeImage.width;
    image.style.height = newSizeImage.height;
    image.src = src;
  }

  initImages(options) {
    const srcImages = this.getSrcImages(options);
    srcImages.forEach((srcImage) => {
      let image = new Image();
      image.addEventListener(`load`, this.onLoadImage.bind(this));
      image.src = srcImage;
    });
  }

  initElementDOM() {
    const back = this.elementDOM.querySelector(`.header__back`);
    initHeader(back);
    this.gameContent = this.elementDOM.querySelector(`.game__content`);
    this.optionsDOM = this.gameContent.querySelectorAll(`.game__option`);
    this.images = this.getImages();
    this.srcImages = this.getSrcImages(this.task.options);
    this.initImages(this.task.options);
    this.gameContent.addEventListener(`click`, this.onAnswerClick.bind(this));
  }

  getIndexOption(option) {
    return [...this.optionsDOM].indexOf(option);
  }

  setSelectedValue(index, value) {
    this.task.options[index].answeredType = value;
  }

  getTypeImage(value) {
    return TypeValueToTypeImage[value];
  }
}

export {ScreenGame, TypeValueToTypeImage};
