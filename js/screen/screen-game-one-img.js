import {ScreenGame} from './screen-game';

class ScreenGameOneImg extends ScreenGame {
  isAnswered(optionAnswers) {
    return [...optionAnswers].some((radio) => radio.checked);
  }

  onAnswerClick() {
    let optionAnswers = this.gameContent.querySelectorAll(`input[type="radio"]`);
    if (this.isAnswered(optionAnswers)) {
      this.setAnswer(optionAnswers);
      super.onAnswerClick();
    }
  }

  setAnswer(optionAnswers) {
    this.setSelectedValue(0, this.getTypeImage([...optionAnswers].find((radio) => radio.checked).value));
  }
}

export {ScreenGameOneImg};
