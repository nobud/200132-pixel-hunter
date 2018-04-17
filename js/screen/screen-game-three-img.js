import {ScreenGame, TypeValueToTypeImage} from './screen-game';

class ScreenGameThreeImg extends ScreenGame {
  // src=${option.srcImage}
  getOption(option, index) {
    return `
    <div class="game__option">
      <img alt="Option ${index + 1}" width=${this.widthOption} height=${this.heightOption}>
    </div>`;
  }

  isAnswered(evt) {
    return evt.target.closest(`.game__option`);
  }

  setAnswer(clickedOption) {
    const indexOption = this.getIndexOption(clickedOption);
    this.setSelectedValue(indexOption, TypeValueToTypeImage.photo);
  }

  onAnswerClick(evt) {
    const clickedOption = this.isAnswered(evt);
    if (clickedOption) {
      this.setAnswer(clickedOption);
      super.onAnswerClick();
    }
  }
}

export {ScreenGameThreeImg};
