const TypeImage = {
  PHOTO: 0,
  PAINTING: 1,
  UNKNOWN: 2
};

const TypeValueToTypeImage = {
  paint: TypeImage.PAINTING,
  photo: TypeImage.PHOTO
};

class Option {
  constructor(option) {
    this.srcImage = option.srcImage;
    this.referenceType = option.refType;
    this.answeredType = TypeImage.UNKNOWN;
  }

  isAnswered() {
    return this.answeredType !== TypeImage.UNKNOWN;
  }

  isCorrect() {
    return this.referenceType === this.answeredType;
  }

}

export {TypeImage, TypeValueToTypeImage, Option};
