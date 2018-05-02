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
    return this.answeredType !== TypeImage.UNKNOWN;
  }

  isCorrect() {
    return this.referenceType === this.answeredType;
  }

}

export {TypeImage, TypeValueToTypeImage, Option};
