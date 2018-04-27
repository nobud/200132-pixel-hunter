import {getSmallLogo} from '../logo/logo-template';
import definition from '../../definition';

const getBackTemplate = () => `
  <div class="header__back">
    <button class="back">
      <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
      ${getSmallLogo()}
    </button>
  </div>`;

const getHeader = () => {
  const headerTemplate = `
    <header class="header">
      ${getBackTemplate()}
    </header>`;
  return headerTemplate;
};

const getGameHeader = (state) => {
  const emptyHeartTemplate = `<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`;
  const fullHeartTemplate = `<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`;
  const headerGameTemplate = `
  <h1 class="game__timer">${state.time}</h1>
  <div class="game__lives">
    ${new Array(definition.maxLives - state.numberLives)
      .fill(emptyHeartTemplate)
      .join(` `)}
    ${new Array(state.numberLives)
      .fill(fullHeartTemplate)
      .join(` `)}
  </div>`;

  const headerTemplate = `
    <header class="header">
      ${getBackTemplate()}
      ${headerGameTemplate}
    </header>`;
  return headerTemplate;
};

export {getHeader, getGameHeader};
