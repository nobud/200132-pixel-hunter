import definition from './definition';

export default class Answer {
  constructor(type = definition.TypeAnswer.UNKNOWN) {
    this.type = type;
  }

  isWrong() {
    return this.type === definition.TypeAnswer.WRONG;
  }

  isFast() {
    return this.type === definition.TypeAnswer.FAST;
  }

  isSlow() {
    return this.type === definition.TypeAnswer.SLOW;
  }

  isUnknown() {
    return this.type === definition.TypeAnswer.UNKNOWN;
  }

  isNormal() {
    return this.type === definition.TypeAnswer.NORMAL;
  }
}
