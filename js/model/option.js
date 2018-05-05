import definition from './definition';

export default class Option {
  constructor(option) {
    this.srcImage = option.srcImage;
    this.referenceType = option.refType;
    this.answeredType = definition.TypeImage.UNKNOWN;
    // ширина контейнера
    this.width = option.width;
    // высота контейнера
    this.height = option.height;
    // ширина img
    this.widthImg = option.widthImg;
    // высота img
    this.heightImg = option.heightImg;
  }

  isAnswered() {
    return this.answeredType !== definition.TypeImage.UNKNOWN;
  }

  isCorrect() {
    return this.referenceType === this.answeredType;
  }
}
