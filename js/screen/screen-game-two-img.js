import {ScreenGame} from './screen-game';

class ScreenGameTwoImg extends ScreenGame {
  onAnswerClick() {
    let optionsAnswers = [];
    optionsAnswers.push(this.gameContent.querySelectorAll(`input[name="question1"]`));
    optionsAnswers.push(this.gameContent.querySelectorAll(`input[name="question2"]`));
    if (this.isAnswered(optionsAnswers)) {
      this.setAnswer(optionsAnswers);
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
