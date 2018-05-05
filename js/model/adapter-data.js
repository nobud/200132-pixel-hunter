import Result from '../presenter/game-helper/result';
import Answer from '../model/answer';

const COUNT_LAST_RESULTS = 10;

const adaptOptions = (answers) => answers.map((answer) => {
  return {
    'srcImage': answer.image.url,
    'refType': answer.type,
    // ширина контейнера
    'width': answer.image.width,
    // высота контейнера
    'height': answer.image.height,
  };
});

const adaptData = (tasks) => tasks.map((task) => {
  return {
    'type': task.type,
    'text': task.question,
    'options': adaptOptions(task.answers),
  };
});

const adaptResultStats = (user, stats) => {
  const results = stats.map((stat) => {
    const answers = stat.map((answer) => new Answer(answer.type));
    const result = new Result(user, answers);
    return result;
  });
  const countResults = Math.min(results.length, COUNT_LAST_RESULTS);
  return results.reverse().slice(0, countResults);
};

export {adaptData, adaptResultStats};


