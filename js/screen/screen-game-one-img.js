import {ScreenGame} from './screen-game';

class ScreenGameOneImg extends ScreenGame {
  isAnswered(optionAnswers) {
    return [...optionAnswers].some((radio) => radio.checked);
  }

  onAnswerClick() {
    if (this.isAnswered(this.view.optionAnswers)) {
      this.setAnswer(this.view.optionAnswers);
      super.onAnswerClick();
    }
  }

  setAnswer(optionAnswers) {
    this.setSelectedValue(0, this.getTypeImage([...optionAnswers].find((radio) => radio.checked).value));
  }
}

export {ScreenGameOneImg};
