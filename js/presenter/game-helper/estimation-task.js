import definition from '../../model/definition';

export default class EstimationTask {
  constructor(typeTask) {
    this.typeTask = typeTask;
  }

  getTypeAnswerTotal(options, time) {
    if (time > definition.MAX_TIME_FOR_ANSWER) {
      return definition.TypeAnswer.WRONG;
    }
    if (this.__isAnswerTotalUnknown(options)) {
      return definition.TypeAnswer.UNKNOWN;
    }
    if (this.__isAnswerTotalCorrect(options)) {
      return this.__getTypeSpeedAnswerTotal(time);
    }
    return definition.TypeAnswer.WRONG;
  }

  __isAnswerTotalCorrect(options) {
    switch (this.typeTask) {
      case definition.TypeTask.ONE_IMG:
      case definition.TypeTask.TWO_IMG: {
        return this.__isAllAnswersCorrect(options);
      }
      case definition.TypeTask.THREE_IMG: {
        return this.__isAnswerCorrectExist(options);
      }
      default: return true;
    }
  }

  __isAnswerTotalUnknown(options) {
    switch (this.typeTask) {
      case definition.TypeTask.ONE_IMG:
      case definition.TypeTask.TWO_IMG: {
        return this.__isSomeAnswersUnknown(options);
      }
      case definition.TypeTask.THREE_IMG: {
        return this.__isAllAnswersUnknown(options);
      }
      default: return true;
    }
  }

  __getTypeSpeedAnswerTotal(time) {
    if (time < definition.RangeTimeNormalAnswer.MIN) {
      return definition.TypeAnswer.FAST;
    }
    if (time > definition.RangeTimeNormalAnswer.MAX) {
      return definition.TypeAnswer.SLOW;
    }
    return definition.TypeAnswer.NORMAL;
  }

  __isAllAnswersCorrect(options) {
    return options.every((option) => {
      return option.referenceType === option.answeredType;
    });
  }

  __isAnswerCorrectExist(options) {
    return options.some((option) => {
      return option.referenceType === option.answeredType;
    });
  }

  __isSomeAnswersUnknown(options) {
    return options.some((option) => !option.isAnswered());
  }

  __isAllAnswersUnknown(options) {
    return options.every((option) => !option.isAnswered());
  }
}
