import {TypeAnswer} from '../presenter/game-helper/type-answer';
import {Answer} from '../model/answer';
import definition from '../definition';

const getTestAnswers = (typeAnswer, numberAnswers = definition.numberOfRequiredAnswers) => {
  const answers = [];
  while (answers.length < numberAnswers) {
    answers.push(new Answer(typeAnswer));
  }
  return answers;
};

const setTypes = (answers, types) => {
  types.forEach((item) => {
    answers[item.index].type = item.type;
  });
  return answers;
};

const getTestCurrentGameAnswers = (typeAnswer = TypeAnswer.UNKNOWN, numberAnswers = definition.numberOfRequiredAnswers) => {
  let answers = getTestAnswers(typeAnswer, numberAnswers);
  answers = setTypes(answers, [{index: 0, type: TypeAnswer.WRONG}, {index: 1, type: TypeAnswer.SLOW}, {index: 2, type: TypeAnswer.FAST}, {index: 3, type: TypeAnswer.NORMAL}]);
  return answers;
};

const getTestAllGamesAnswers = (typeAnswer = TypeAnswer.NORMAL, numberAnswers = definition.numberOfRequiredAnswers) => {
  const answersOfGames = [];
  let answers = getTestAnswers(typeAnswer, numberAnswers);
  answers = setTypes(answers, [{index: 0, type: TypeAnswer.FAST}, {index: 2, type: TypeAnswer.FAST}, {index: 5, type: TypeAnswer.FAST}, {index: 7, type: TypeAnswer.FAST}, {index: 9, type: TypeAnswer.FAST}]);
  answersOfGames.unshift(answers);

  answers = getTestAnswers(typeAnswer, numberAnswers);
  answers = setTypes(answers, [{index: 1, type: TypeAnswer.SLOW}, {index: 3, type: TypeAnswer.FAST}, {index: 4, type: TypeAnswer.SLOW}, {index: 7, type: TypeAnswer.WRONG}, {index: 9, type: TypeAnswer.UNKNOWN}]);
  answersOfGames.unshift(answers);

  answers = getTestAnswers(typeAnswer, numberAnswers);
  answers = setTypes(answers, [{index: 0, type: TypeAnswer.SLOW}, {index: 1, type: TypeAnswer.FAST}, {index: 3, type: TypeAnswer.SLOW}, {index: 5, type: TypeAnswer.WRONG}, {index: 9, type: TypeAnswer.WRONG}]);
  answersOfGames.unshift(answers);

  return answersOfGames;
};

export {getTestAllGamesAnswers, getTestCurrentGameAnswers, getTestAnswers};
