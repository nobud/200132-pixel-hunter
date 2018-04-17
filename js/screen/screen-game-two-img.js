import {ScreenGame} from './screen-game';

class ScreenGameTwoImg extends ScreenGame {
  onAnswerClick() {
    if (this.isAnswered(this.view.optionsAnswers)) {
      this.setAnswer(this.view.optionsAnswers);
      super.onAnswerClick();
    }
  }

  isAnswered(optionsAnswers) {
    return optionsAnswers.every((option) => [...option].some((radio) => radio.checked));
  }

  setAnswer(optionsAnswers) {
    optionsAnswers.forEach((option, index) =>
      this.setSelectedValue(index, this.getTypeImage([...option].find((radio) => radio.checked).value)));
  }
}

export {ScreenGameTwoImg};
