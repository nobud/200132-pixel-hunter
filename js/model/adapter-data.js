import definition from './definition';
import {TypeImage} from './option';
import loadImage from '../util/loader-image';
import {showError} from '../util/util';
import getNewSizeImage from '../util/get-new-size-image';

const ServerToTypeTask = {
  'tinder-like': definition.TypeTask.ONE_IMG,
  'two-of-two': definition.TypeTask.TWO_IMG,
  'one-of-three': definition.TypeTask.THREE_IMG
};

const ServerToTypeImage = {
  'photo': TypeImage.PHOTO,
  'painting': TypeImage.PAINTING,
};

const adaptOptions = (answers) => answers.map((answer) => {
  let option = {};
  loadImage(answer.image.url).
      then((image) => getNewSizeImage({width: answer.image.width, height: answer.image.height}, {width: image.width, height: image.height})).
      then((size) => {
        option.srcImage = answer.image.url;
        option.refType = ServerToTypeImage[answer.type];
        // ширина контейнера
        option.width = answer.image.width;
        // высота контейнера
        option.height = answer.image.height;
        // ширина img
        option.widthImg = size.width;
        // высота img
        option.heightImg = size.height;
      }).
      catch(showError);
  return option;
});

const adaptData = (tasks) => tasks.map((task) => {
  return {
    'type': ServerToTypeTask[task.type],
    'text': task.question,
    'options': adaptOptions(task.answers),
  };
});

export {adaptData};

