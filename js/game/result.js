import definition from '../data/definition';

const Points = {
  RIGHT: 100,
  FAST: 50,
  SLOW: 50,
  LIFE: 50
};

const textWin = `Победа!`;
const textLoose = `Поражение`;
const textScoreFail = `FAIL`;

class Result {
  constructor(answers) {
    this.answers = answers;
    this.stats = this.calcStats();
    this.numberRemainingLives = this.calcNumberRemainingLives();
    this.score = this.calcScore();
  }

  calcStats() {
    const stats = this.answers.reduce((statsTmp, answer) => {
      statsTmp.normal += answer.isNormal() ? 1 : 0;
      statsTmp.fast += answer.isFast() ? 1 : 0;
      statsTmp.slow += answer.isSlow() ? 1 : 0;
      statsTmp.wrong += answer.isWrong() ? 1 : 0;
      return statsTmp;
    }, {normal: 0, fast: 0, slow: 0, wrong: 0});
    stats.right = stats.normal + stats.fast + stats.slow;
    return stats;
  }

  calcNumberRemainingLives() {
    const result = definition.maxLives - this.stats.wrong;
    return result < 0 ? 0 : result;
  }

  get scoreRight() {
    return Points.RIGHT;
  }

  get scoreFast() {
    return Points.FAST;
  }

  get scoreSlow() {
    return Points.SLOW;
  }

  get scoreLife() {
    return Points.LIFE;
  }

  get numberRight() {
    return this.stats.right;
  }

  get numberFast() {
    return this.stats.fast;
  }

  get numberSlow() {
    return this.stats.slow;
  }

  get scoreForLivesTotal() {
    return this.numberRemainingLives * this.scoreLife;
  }

  get scoreForRightTotal() {
    return this.numberRight * this.scoreRight;
  }

  get scoreForRightFastTotal() {
    return this.numberFast * this.scoreFast;
  }

  get scoreForRightSlowTotal() {
    return -(this.numberSlow * this.scoreSlow);
  }

  isFail() {
    return this.answers.length < definition.numberOfRequiredAnswers || this.answers.some((answer) => answer.isUnknown());
  }

  calcScore() {
    let numberPoints = -1;
    if (!this.isFail()) {
      numberPoints = this.scoreForRightTotal + this.scoreForRightFastTotal + this.scoreForRightSlowTotal + this.scoreForLivesTotal;
    }
    return numberPoints;
  }

  isScoreFail() {
    return this.score === -1;
  }

  get scoreDisplayed() {
    return this.isScoreFail() ? textScoreFail : this.score;
  }

  get gameStatusText() {
    return this.isScoreFail() ? textLoose : textWin;
  }
}

export {Result};
