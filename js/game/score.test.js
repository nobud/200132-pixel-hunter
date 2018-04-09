import assert from 'assert';
import calcScore from './score';
import * as definition from './definition';

const fillTestAnswers = (testLength, typeSpeed = definition.TypeAnswer.NORMAL, isCorrect = true) => {
  const answers = [];
  while (answers.length < testLength) {
    answers.push({isRight: isCorrect, type: typeSpeed});
  }
  return answers;
};

let lengthAnswers;
let numberLives;
let expected;

describe(`calc scores for game`, () => {
  it(`should return -1 when the count of answers < 10`, () => {
    lengthAnswers = definition.numberOfRequiredAnswers - 1;
    numberLives = 3;
    expected = -1;
    assert.equal(calcScore(fillTestAnswers(lengthAnswers), numberLives), expected);
  });
  it(`should return -1 when the count of answers < 10 (0)`, () => {
    lengthAnswers = 0;
    numberLives = 3;
    expected = -1;
    assert.equal(calcScore(fillTestAnswers(lengthAnswers), numberLives), expected);
  });
  it(`should return 1150 when all answers are correct and speed is normal for all and 3 lives are left`, () => {
    lengthAnswers = definition.numberOfRequiredAnswers;
    numberLives = 3;
    expected = 1150;
    assert.equal(calcScore(fillTestAnswers(lengthAnswers), numberLives), expected);
  });
  it(`should return 1650 when all answers are correct and speed is fast for all and 3 lives are left`, () => {
    lengthAnswers = definition.numberOfRequiredAnswers;
    numberLives = 3;
    expected = 1650;
    assert.equal(calcScore(fillTestAnswers(lengthAnswers, definition.TypeAnswer.FAST), numberLives), expected);
  });
  it(`should return 650 when all answers are correct and speed is slow for all and 3 lives are left`, () => {
    lengthAnswers = definition.numberOfRequiredAnswers;
    numberLives = 3;
    expected = 650;
    assert.equal(calcScore(fillTestAnswers(lengthAnswers, definition.TypeAnswer.SLOW), numberLives), expected);
  });
  it(`should return 1150 when all answers are correct and include slow (1), fast (1), normal (8) speeds and 3 lives are left`, () => {
    lengthAnswers = definition.numberOfRequiredAnswers;
    numberLives = 3;
    expected = 1150;
    const answers = fillTestAnswers(lengthAnswers);
    answers[0].type = definition.TypeAnswer.SLOW;
    answers[1].type = definition.TypeAnswer.FAST;
    assert.equal(calcScore(answers, numberLives), expected);
  });
  it(`should return 1200 when all answers are correct and include slow (2), fast (3), normal (5) and 3 lives are left`, () => {
    lengthAnswers = definition.numberOfRequiredAnswers;
    numberLives = 3;
    expected = 1200;
    const answers = fillTestAnswers(lengthAnswers);
    answers[0].type = definition.TypeAnswer.SLOW;
    answers[1].type = definition.TypeAnswer.FAST;
    answers[2].type = definition.TypeAnswer.SLOW;
    answers[3].type = definition.TypeAnswer.FAST;
    answers[4].type = definition.TypeAnswer.FAST;
    assert.equal(calcScore(answers, numberLives), expected);
  });
  it(`should return 1000 when 1 answer is incorrect and for other answers speed is normal and 2 lives are left`, () => {
    lengthAnswers = definition.numberOfRequiredAnswers;
    numberLives = 2;
    expected = 1000;
    const answers = fillTestAnswers(lengthAnswers);
    answers[0].isRight = false;
    assert.equal(calcScore(answers, numberLives), expected);
  });
  it(`should return 700 when 3 answer is incorrect and for other answers speed is normal and 0 lives are left`, () => {
    lengthAnswers = definition.numberOfRequiredAnswers;
    numberLives = 0;
    expected = 700;
    const answers = fillTestAnswers(lengthAnswers);
    answers[0].isRight = false;
    answers[2].isRight = false;
    answers[5].isRight = false;
    assert.equal(calcScore(answers, numberLives), expected);
  });
});
