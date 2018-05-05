import definition from '../../model/definition';

const textWin = `Победа!`;
const textLoose = `Поражение`;
const textScoreFail = `FAIL`;

export default class Result {
  constructor(userName, answers) {
    this._user = userName;
    this._answers = answers;
    this._stats = this.__calcStats();
    this._numberRemainingLives = this.__calcNumberRemainingLives();
    this._score = this.__calcScore();
  }

  get answers() {
    return this._answers;
  }

  get stats() {
    return this._stats;
  }

  get user() {
    return this._user;
  }

  get numberRemainingLives() {
    return this._numberRemainingLives;
  }

  get score() {
    return this._score;
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
    return this.numberRemainingLives > 0 ? this.numberRemainingLives * definition.Points.LIFE : 0;
  }

  get scoreForRightTotal() {
    return this.numberRight * definition.Points.RIGHT;
  }

  get scoreForRightFastTotal() {
    return this.numberFast * definition.Points.FAST;
  }

  get scoreForRightSlowTotal() {
    return -(this.numberSlow * definition.Points.SLOW);
  }

  get scoreDisplayed() {
    return this.isScoreFail() ? textScoreFail : this._score;
  }

  get gameStatusText() {
    return this.isScoreFail() ? textLoose : textWin;
  }

  isScoreFail() {
    return this.score === -1;
  }

  __calcScore() {
    let numberPoints = -1;
    if (!this.__isFail()) {
      numberPoints = this.scoreForRightTotal + this.scoreForRightFastTotal + this.scoreForRightSlowTotal + this.scoreForLivesTotal;
    }
    return numberPoints;
  }

  __calcStats() {
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

  __calcNumberRemainingLives() {
    return definition.MAX_LIVES - this.stats.wrong;
  }

  __isFail() {
    return this.answers.length < definition.NUMBER_OF_REQUIRED_ANSWERS || this.answers.some((answer) => answer.isUnknown()) ||
      this.numberRemainingLives < 0;
  }
}
