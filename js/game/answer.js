import {TypeAnswer, strTypeAnswer} from './type-answer';

class Answer {
  constructor(type = TypeAnswer.UNKNOWN) {
    this.type = type;
  }

  isWrong() {
    return this.type === TypeAnswer.WRONG;
  }

  isFast() {
    return this.type === TypeAnswer.FAST;
  }

  isSlow() {
    return this.type === TypeAnswer.SLOW;
  }

  isUnknown() {
    return this.type === TypeAnswer.UNKNOWN;
  }

  isNormal() {
    return this.type === TypeAnswer.NORMAL;
  }

  getTypeStr() {
    return strTypeAnswer[this.type];
  }
}

export {Answer};
