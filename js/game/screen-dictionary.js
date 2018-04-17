import {ScreenIntro} from '../screen/screen-intro';
import {ScreenGreeting} from '../screen/screen-greeting';
import {ScreenRules} from '../screen/screen-rules';
import {ScreenGameOneImg} from '../screen/screen-game-one-img';
import {ScreenGameTwoImg} from '../screen/screen-game-two-img';
import {ScreenGameThreeImg} from '../screen/screen-game-three-img';
import {ScreenStats} from '../screen/screen-stats';
import definition from '../data/definition';

const TypeScreen = {
  INTRO: 3,
  GREETING: 4,
  RULES: 5,
  GAME_ONE_IMG: definition.TypeTask.ONE_IMG,
  GAME_TWO_IMG: definition.TypeTask.TWO_IMG,
  GAME_THREE_IMG: definition.TypeTask.THREE_IMG,
  STATS: 6
};

const fillScreen = () => {
  const screen = {};
  screen[TypeScreen.INTRO] = ScreenIntro;
  screen[TypeScreen.GREETING] = ScreenGreeting;
  screen[TypeScreen.RULES] = ScreenRules;
  screen[TypeScreen.GAME_ONE_IMG] = ScreenGameOneImg;
  screen[TypeScreen.GAME_TWO_IMG] = ScreenGameTwoImg;
  screen[TypeScreen.GAME_THREE_IMG] = ScreenGameThreeImg;
  screen[TypeScreen.STATS] = ScreenStats;
  return screen;
};

class ScreenDictionary {
  constructor() {
    this.screen = fillScreen();
  }

  getScreen(typeScreen, data, state) {
    return new this.screen[typeScreen](data, state);
  }
}

export {ScreenDictionary, TypeScreen};
