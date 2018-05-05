import definition from '../../model/definition';

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
  constructor(userName, answers) {
    this._user = userName;
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
    return definition.maxLives - this.stats.wrong;
  }

  get user() {
    return this._user;
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
    return this.numberRemainingLives > 0 ? this.numberRemainingLives * this.scoreLife : 0;
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
    return this.answers.length < definition.numberOfRequiredAnswers || this.answers.some((answer) => answer.isUnknown()) ||
      this.numberRemainingLives < 0;
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
