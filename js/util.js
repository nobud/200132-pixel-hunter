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

export {getElementFromTemplate, showScreen};
