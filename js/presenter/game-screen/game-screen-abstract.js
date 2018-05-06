import ScreenAbstract from '../screen-abstract';
import GameView from '../../view/game-view';
import TypeValueToTypeImage from '../game-helper/adapt-types';
import {showConfirm, closeConfirm} from '../../view/confirm/confirm';
import {createCustomEvent, evtCancelGame, evtTimerStop, evtTimerContinue, evtStartBlinkTime, evtRefreshTime} from '../../util/util';

const DELAY_BLINK_TIMER = 200;

export default class GameScreenAbstract extends ScreenAbstract {

  initOtherHandlers() {
    this.view.onAnswerClick = this.onAnswerClick.bind(this);
    this.view.onCancelBackClick = this.onCancelBackClick.bind(this);
    this.view.onConfirmBackClick = this.onConfirmBackClick.bind(this);
    window.addEventListener(evtStartBlinkTime, () => {
      this.onStartBlinkTime();
    });
    window.addEventListener(evtRefreshTime, (evt) => {
      this.onRefreshTime(evt);
    });
  }

  init(task, state) {
    this.setView(task, state);
    this.showView();
  }

  setView(task, state) {
    this.view = new GameView(task, state);
    this.initBackHandler();
    this.initOtherHandlers();
  }

  getSelectedValue(valueOption) {
    return valueOption;
  }

  getTypeImage(value) {
    return TypeValueToTypeImage[value];
  }

  onBackElementClick() {
    createCustomEvent(evtTimerStop);
    showConfirm(this.modal);
  }

  onConfirmBackClick() {
    closeConfirm(this.view.modal);
    createCustomEvent(evtCancelGame);
  }

  onCancelBackClick() {
    closeConfirm(this.view.modal);
    createCustomEvent(evtTimerContinue);
  }

  onRefreshTime(evt) {
    this.view.gameTimer.textContent = evt.detail.data;
  }

  onStartBlinkTime() {
    const timer = this.view.gameTimer;
    let opacity = 1;
    setInterval(() => {
      opacity = !opacity;
      timer.style.opacity = +opacity;
    }, DELAY_BLINK_TIMER);
  }
}
