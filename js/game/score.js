import * as definition from './definition';

const Points = {
  RIGHT: 100,
  FAST: 50,
  SLOW: -50,
  LIFE: 50
};

const getPointsForLives = (numberRemainingLives) => numberRemainingLives * Points.LIFE;

const getPointsForSpeed = (answerSpeed) => {
  switch (answerSpeed) {
    case definition.TypeAnswer.FAST: {
      return Points.FAST;
    }
    case definition.TypeAnswer.SLOW: {
      return Points.SLOW;
    }
    default: {
      return 0;
    }
  }
};

const getPointsForAnswer = (answer) => {
  if (!answer.isRight) {
    return 0;
  }
  return Points.RIGHT + getPointsForSpeed(answer.type);
};

const calcScore = (answers, numberRemainingLives) => {
  if (answers.length < definition.numberOfRequiredAnswers) {
    return -1;
  }
  let numberPoints = 0;
  answers.forEach((answer) => {
    numberPoints += getPointsForAnswer(answer);
  });
  numberPoints += getPointsForLives(numberRemainingLives);
  return numberPoints;
};

export default calcScore;
