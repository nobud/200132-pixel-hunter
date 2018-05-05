const evtNext = `toNext`;
const evtBack = `toBack`;
const evtAnsweredTask = `answeredTask`;
const evtExpiredTimer = `expiredTimer`;
const evtTickTimer = `tickTimer`;
const evtRefreshTime = `refreshTime`;

const getElementFromTemplate = (templateContent) => {
  const tag = `div`;
  const element = document.createElement(tag);
  element.innerHTML = templateContent;
  return element;
};

const showElement = (element) => {
  const parentScreen = document.querySelector(`main.central`);
  parentScreen.innerHTML = ``;
  parentScreen.appendChild(element);
};

const changeScreen = (screen, data = null, state = null) => {
  screen.init(data, state);
};

const createCustomEvent = (eventText, additional) => {
  const customEvent = new CustomEvent(eventText, {
    detail: {
      data: additional
    },
    bubbles: true,
    cancellable: false
  });
  window.dispatchEvent(customEvent);
};

export {getElementFromTemplate, showElement, changeScreen, createCustomEvent, evtNext, evtBack, evtAnsweredTask,
  evtExpiredTimer, evtTickTimer, evtRefreshTime};
