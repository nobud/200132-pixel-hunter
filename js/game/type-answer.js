const TypeAnswer = {
  WRONG: 0,
  FAST: 1,
  NORMAL: 2,
  SLOW: 3,
  UNKNOWN: 4
};

const strTypeAnswer = {};

const fillStrTypeAnswer = (typeAnswerStr) => {
  typeAnswerStr[TypeAnswer.WRONG] = `wrong`;
  typeAnswerStr[TypeAnswer.NORMAL] = `correct`;
  typeAnswerStr[TypeAnswer.FAST] = `fast`;
  typeAnswerStr[TypeAnswer.SLOW] = `slow`;
  typeAnswerStr[TypeAnswer.UNKNOWN] = `unknown`;
};
fillStrTypeAnswer(strTypeAnswer);

export {TypeAnswer, strTypeAnswer};
