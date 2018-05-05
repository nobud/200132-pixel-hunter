import {TypeAnswer} from '../../model/type-answer';
import definition from '../../model/definition';

class EstimationTask {
  constructor(typeTask) {
    this.typeTask = typeTask;
  }

  isSomeAnswersUnknown(options) {
    return options.some((option) => !option.isAnswered());
  }

  isAllAnswersUnknown(options) {
    return options.every((option) => !option.isAnswered());
  }

  isAnswerTotalUnknown(options) {
    switch (this.typeTask) {
      case definition.TypeTask.ONE_IMG:
      case definition.TypeTask.TWO_IMG: {
        return this.isSomeAnswersUnknown(options);
      }
      case definition.TypeTask.THREE_IMG: {
        return this.isAllAnswersUnknown(options);
      }
      default: return true;
    }
  }

  isAllAnswersCorrect(options) {
    return options.every((option) => {
      return option.referenceType === option.answeredType;
    });
  }

  isAnswerCorrectExist(options) {
    return options.some((option) => {
      return option.referenceType === option.answeredType;
    });
  }

  isAnswerTotalCorrect(options) {
    switch (this.typeTask) {
      case definition.TypeTask.ONE_IMG:
      case definition.TypeTask.TWO_IMG: {
        return this.isAllAnswersCorrect(options);
      }
      case definition.TypeTask.THREE_IMG: {
        return this.isAnswerCorrectExist(options);
      }
      default: return true;
    }
  }

  getTypeSpeedAnswerTotal(time) {
    if (time < definition.rangeTimeNormalAnswer.min) {
      return TypeAnswer.FAST;
    }
    if (time > definition.rangeTimeNormalAnswer.max) {
      return TypeAnswer.SLOW;
    }
    return TypeAnswer.NORMAL;
  }

  getTypeAnswerTotal(options, time) {
    if (time > definition.maxTimeForAnswer) {
      return TypeAnswer.WRONG;
    }
    if (this.isAnswerTotalUnknown(options)) {
      return TypeAnswer.UNKNOWN;
    }
    if (this.isAnswerTotalCorrect(options)) {
      return this.getTypeSpeedAnswerTotal(time);
    }
    return TypeAnswer.WRONG;
  }
}

export {EstimationTask};
