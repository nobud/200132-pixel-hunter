import {getHeader} from './header/header-template';
import getFooter from './footer/footer-template';
import getStatsTemplate from './stats-result/stats-result-template';
import {AbstractView} from './abstract-view';

class StatsView extends AbstractView {
  constructor(results) {
    super();
    this.results = results;
  }

  get htmlTemplate() {
    return this.getArticle(this.results);
  }

  get back() {
    if (!this._back) {
      this._back = this.elementDOM.querySelector(`.header__back`);
    }
    return this._back;
  }

  onBackClick() {
  }

  bindHandlers() {
    this.back.addEventListener(`click`, () => {
      this.onBackClick();
    });
  }

  getResultMainSummary(result) {
    return result.isScoreFail() ? `
      <td class="result__total"></td>
      <td class="result__total result__total--final">${result.scoreDisplayed}</td>`
      : `
      <td class="result__points">×&nbsp;${result.scoreRight}</td>
      <td class="result__total">${result.scoreForRightTotal}</td>`;
  }

  getResultMain(result, index) {
    return `
    <tr>
      <td class="result__number">${index}.</td>
      <td colspan="2">
        <ul class="stats">
        ${getStatsTemplate(result.answers)}
        </ul>
      </td>
    ${this.getResultMainSummary(result)}
    </tr>`;
  }

  getResultDetailsForFast(result) {
    return result.numberFast > 0 ?
      `<tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${result.numberFast}&nbsp;<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">×&nbsp;${result.scoreFast}</td>
        <td class="result__total">${result.scoreForRightFastTotal}</td>
      </tr>`
      : ``;
  }

  getResultDetailsForLife(result) {
    return result.numberRemainingLives > 0 ?
      `<tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${result.numberRemainingLives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;${result.scoreLife}</td>
        <td class="result__total">${result.scoreForLivesTotal}</td>
      </tr>`
      : ``;
  }

  getResultDetailsForSlow(result) {
    return result.numberSlow > 0 ?
      `<tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${result.numberSlow}&nbsp;<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">×&nbsp;${result.scoreSlow}</td>
        <td class="result__total">${result.scoreForRightSlowTotal}</td>
      </tr>`
      : ``;
  }

  getResultDetailsSummary(result) {
    return `
    <tr>
      <td colspan="5" class="result__total  result__total--final">${result.scoreDisplayed}</td>
    </tr>`;
  }

  getResultDetails(result) {
    return result.isScoreFail() ? `` : `
    ${this.getResultDetailsForFast(result)}
    ${this.getResultDetailsForLife(result)}
    ${this.getResultDetailsForSlow(result)}
    ${this.getResultDetailsSummary(result)}`;
  }

  getResultOneGame(result, index) {
    return `
    <table class="result__table">
      ${this.getResultMain(result, index)}
      ${this.getResultDetails(result)}
    </table>`;
  }

  getTemplate(results) {
    return `
    <h1>${results[0].gameStatusText}</h1>
    ${results.map((result, i) => {
    return this.getResultOneGame(result, i + 1);
  }).join(``)}`;
  }

  getArticle(results) {
    return `
      ${getHeader()}
      <div class="result">
        ${this.getTemplate(results)}
      </div>
      ${getFooter()}`;
  }
}

export {StatsView};
