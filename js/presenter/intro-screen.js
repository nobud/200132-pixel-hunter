import ScreenAbstract from './screen-abstract';
import IntroView from '../view/intro-view.js';
import {createCustomEvent, evtNext} from '../util/util';
import Loader from '../util/loader';
import loadImages from '../util/loader-image';
import showError from '../view/error/error-view';

class IntroScreen extends ScreenAbstract {
  init() {
    this.setView();
    this.showView();
    this.startLoadData();
  }

  setView() {
    this.view = new IntroView();
    this.initNextHandler();
  }

  startLoadData() {
    Loader.loadData().
        then((data) => loadImages(data)).
        then((data) => createCustomEvent(evtNext, data)).
        catch(showError);
  }

  onNextElementClick() {
  }
}

export default new IntroScreen();
