const getStatsAnswersTemplate = (answers) => `
<div class="stats">
  <ul class="stats">
  ${answers.map((answer) => `\t<li class="stats__result stats__result--${answer.type}"></li>`)
      .join(`\n`)}
  </ul>
</div>`;

export default getStatsAnswersTemplate;
