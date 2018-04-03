
const keyCode = {
  LEFT: 37,
  RIGHT: 39
};

const screens = [];
const parent = document.querySelector(`main.central`);
let currentScreenIndex = 0;

function isToPrevPressed(evt) {
  return evt.altKey && evt.keyCode === keyCode.LEFT;
}

function isToNextPressed(evt) {
  return evt.altKey && evt.keyCode === keyCode.RIGHT;
}

function getNewIndex(isPrev, isNext) {
  let newScreenIndex = -1;
  if (isPrev) {
    newScreenIndex = currentScreenIndex > 0 ? currentScreenIndex - 1 : currentScreenIndex;
  } else if (isNext) {
    newScreenIndex = currentScreenIndex < screens.length - 1 ? currentScreenIndex + 1 : currentScreenIndex;
  }
  return newScreenIndex;
}

function onSwitchPressed(evt) {
  const newScreenIndex = getNewIndex(isToPrevPressed(evt), isToNextPressed(evt));
  if (newScreenIndex !== -1) {
    evt.preventDefault();
    if (newScreenIndex !== currentScreenIndex) {
      changeScreen(newScreenIndex);
    }
  }
}

function fillScreens() {
  screens.push(document.querySelector(`#greeting`).content);
  screens.push(document.querySelector(`#rules`).content);
  screens.push(document.querySelector(`#game-2`).content);
  screens.push(document.querySelector(`#game-1`).content);
  screens.push(document.querySelector(`#game-3`).content);
  screens.push(document.querySelector(`#stats`).content);
}


function changeScreen(newScreenIndex) {
  while (parent.children.length) {
    parent.removeChild(parent.children[parent.children.length - 1]);
  }
  parent.appendChild(screens[newScreenIndex].cloneNode(true));
  currentScreenIndex = newScreenIndex;
}

function start() {
  fillScreens();
  changeScreen(currentScreenIndex);
  document.addEventListener(`keydown`, onSwitchPressed);
}

start();
