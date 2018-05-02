import {ScreenAbstract} from './screen-abstract';
import {IntroView} from '../view/intro-view.js';
import {showError, createCustomEvent, evtNext} from '../util/util';
import Loader from '../util/loader';

class IntroScreen extends ScreenAbstract {
  setView() {
    this.view = new IntroView();
    this.initNextHandler();
  }

  init() {
    this.setView();
    this.showView();
    this.startLoadData();
  }

  onNextElementClick() {
  }

  startLoadData() {
    Loader.loadData().
        then((data) => createCustomEvent(evtNext, data)).
        catch(showError);
  }
}

export default new IntroScreen();
