import {ScreenGame, TypeValueToTypeImage} from './screen-game';

class ScreenGameThreeImg extends ScreenGame {

  isAnswered(evt) {
    return this.view.getClickedGameOption(evt.target);
  }

  setAnswer(clickedOption) {
    const indexOption = this.view.getIndexGameOption(clickedOption);
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
