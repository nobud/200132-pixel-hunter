import {getTestAllGamesAnswers} from './test-data';
import {Result} from '../game/result';

const getAllGamesResults = (allGamesAnswers) => {
  const results = [];
  allGamesAnswers.forEach((answersOneGame) => {
    results.push(new Result(answersOneGame));
  });
  return results;
};

export default getAllGamesResults(getTestAllGamesAnswers());
