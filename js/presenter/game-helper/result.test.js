import assert from 'assert';
import definition from '../../model/definition';
import Result from './result';
import Answer from '../../model/answer';

let lengthAnswers;
let expected;
const testUser = `test`;

const getTestAnswers = (typeAnswer, numberAnswers = definition.NUMBER_OF_REQUIRED_ANSWERS) => {
  const answers = [];
  while (answers.length < numberAnswers) {
    answers.push(new Answer(typeAnswer));
  }
  return answers;
};

describe(`calc scores for game`, () => {
  it(`should return -1 when the count of answers < 10`, () => {
    lengthAnswers = definition.NUMBER_OF_REQUIRED_ANSWERS - 1;
    expected = -1;
    assert.equal(new Result(testUser, getTestAnswers(definition.TypeAnswer.NORMAL, lengthAnswers)).score, expected);
  });
  it(`should return -1 when the count of answers < 10 (0)`, () => {
    lengthAnswers = 0;
    expected = -1;
    assert.equal(new Result(testUser, getTestAnswers(definition.TypeAnswer.NORMAL, lengthAnswers)).score, expected);
  });
  it(`should return -1 when the answers < 10 (0)`, () => {
    expected = -1;
    const answers = getTestAnswers(definition.TypeAnswer.NORMAL);
    answers[0].type = definition.TypeAnswer.UNKNOWN;
    assert.equal(new Result(testUser, answers).score, expected);
  });
  it(`should return 1150 when all answers are correct and speed is normal for all and 3 lives are left`, () => {
    expected = 1150;
    assert.equal(new Result(testUser, getTestAnswers(definition.TypeAnswer.NORMAL)).score, expected);
  });
  it(`should return 1650 when all answers are correct and speed is fast for all and 3 lives are left`, () => {
    expected = 1650;
    assert.equal(new Result(testUser, getTestAnswers(definition.TypeAnswer.FAST)).score, expected);
  });
  it(`should return 650 when all answers are correct and speed is slow for all and 3 lives are left`, () => {
    expected = 650;
    assert.equal(new Result(testUser, getTestAnswers(definition.TypeAnswer.SLOW)).score, expected);
  });
  it(`should return 1150 when all answers are correct and include slow (1), fast (1), normal (8) speeds and 3 lives are left`, () => {
    expected = 1150;
    const answers = getTestAnswers(definition.TypeAnswer.NORMAL);
    answers[0].type = definition.TypeAnswer.SLOW;
    answers[1].type = definition.TypeAnswer.FAST;
    assert.equal(new Result(testUser, answers).score, expected);
  });
  it(`should return 1200 when all answers are correct and include slow (2), fast (3), normal (5) and 3 lives are left`, () => {
    expected = 1200;
    const answers = getTestAnswers(definition.TypeAnswer.NORMAL);
    answers[0].type = definition.TypeAnswer.SLOW;
    answers[1].type = definition.TypeAnswer.FAST;
    answers[2].type = definition.TypeAnswer.SLOW;
    answers[3].type = definition.TypeAnswer.FAST;
    answers[4].type = definition.TypeAnswer.FAST;
    assert.equal(new Result(testUser, answers).score, expected);
  });
  it(`should return 1000 when 1 answer is incorrect and for other answers speed is normal and 2 lives are left`, () => {
    expected = 1000;
    const answers = getTestAnswers(definition.TypeAnswer.NORMAL);
    answers[0].type = definition.TypeAnswer.WRONG;
    assert.equal(new Result(testUser, answers).score, expected);
  });
  it(`should return 700 when 3 answers are incorrect and for other answers speed is normal and 0 lives are left`, () => {
    expected = 700;
    const answers = getTestAnswers(definition.TypeAnswer.NORMAL);
    answers[0].type = definition.TypeAnswer.WRONG;
    answers[2].type = definition.TypeAnswer.WRONG;
    answers[5].type = definition.TypeAnswer.WRONG;
    assert.equal(new Result(testUser, answers).score, expected);
  });
  it(`should return -1 when >3 answers are incorrect`, () => {
    expected = -1;
    const answers = getTestAnswers(definition.TypeAnswer.NORMAL);
    answers[0].type = definition.TypeAnswer.WRONG;
    answers[2].type = definition.TypeAnswer.WRONG;
    answers[5].type = definition.TypeAnswer.WRONG;
    answers[9].type = definition.TypeAnswer.WRONG;
    assert.equal(new Result(testUser, answers).score, expected);
  });
});
