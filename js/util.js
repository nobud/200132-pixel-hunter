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

const showScreen = (screen) => {
  const parentScreen = document.querySelector(`main.central`);
  parentScreen.innerHTML = ``;
  parentScreen.appendChild(screen);
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

const getNewSizeImage = (sizeElement, sizeContainer) => {
  if (sizeElement.height > sizeElement.width && sizeElement.height > sizeContainer.height
    || sizeElement.height <= sizeElement.width && sizeElement.width <= sizeContainer.width) {
    sizeElement.height = sizeContainer.height;
    sizeElement.width = `auto`;
  } else {
    sizeElement.width = sizeContainer.width;
    sizeElement.height = `auto`;
  }
  return sizeElement;
};

export {getElementFromTemplate, showScreen, createCustomEvent, evtNext, evtBack, evtAnsweredTask, evtExpiredTimer, evtTickTimer, evtRefreshTime, getNewSizeImage};
