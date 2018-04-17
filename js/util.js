const evtNext = `toNext`;
const evtBack = `toBack`;
const evtFinishedTask = `finishedTask`;

const getElementFromTemplate = (templateContent) => {
  const tag = `div`;
  const element = document.createElement(tag);
  element.innerHTML = templateContent;
  return element;
};

const parentScreen = document.querySelector(`main.central`);

const showScreen = (screen) => {
  parentScreen.innerHTML = ``;
  parentScreen.appendChild(screen);
};

const createCustomEvent = (eventText) => {
  const customEvent = new CustomEvent(eventText, {
    bubbles: true,
    cancellable: false
  });
  window.dispatchEvent(customEvent);
};

export {getElementFromTemplate, showScreen, createCustomEvent, evtNext, evtBack, evtFinishedTask};
