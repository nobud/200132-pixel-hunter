import {createCustomEvent, evtBack} from '../../util';

const initHeader = (back) => {
  const onHeaderBackClick = () => {
    createCustomEvent(evtBack);
  };
  back.addEventListener(`click`, onHeaderBackClick);
};

export default initHeader;
