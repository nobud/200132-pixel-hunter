import getNewSizeImage from './get-new-size-image';
import showError from '../view/error/error-view';

const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const addImageListeners = () => {
      image.addEventListener(`load`, onSuccessLoad);
      image.addEventListener(`error`, onErrorLoad);
    };
    const removeImageListeners = () => {
      image.removeEventListener(`load`, onSuccessLoad);
      image.removeEventListener(`error`, onErrorLoad);
    };
    const onSuccessLoad = () => {
      removeImageListeners(image, onSuccessLoad, onErrorLoad);
      return resolve(image);
    };
    const onErrorLoad = () => {
      removeImageListeners(image, onSuccessLoad, onErrorLoad);
      return reject(new Error(`не удалось загрузить изображение: ${url}\nИгра не может быть запущена.`));
    };
    addImageListeners(image, onSuccessLoad, onErrorLoad);
    image.src = url;
  });
};

const refreshOption = (option, sizeImage) => {
  // ширина img
  option.widthImg = sizeImage.width;
  // высота img
  option.heightImg = sizeImage.height;
};

const loadImages = (tasks) => {
  let sequenceOptions = Promise.resolve();
  tasks.forEach(
      (task) => {
        task.options.forEach((option) => {
          sequenceOptions = sequenceOptions.then(
              loadImage(option.srcImage).
                  then((image) => getNewSizeImage({width: option.width, height: option.height},
                      {width: image.width, height: image.height})).
                  then((sizeImage) => refreshOption(option, sizeImage))).
              catch(showError);
        });
      });
  return tasks;
};

export default loadImages;
