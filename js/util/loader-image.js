import getNewSizeImage from './get-new-size-image';
import showError from '../view/error/error-view';

const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const onSuccessLoadImage = () => {
      return resolve(image);
    };
    const onErrorLoadImage = () => {
      return reject(new Error(`не удалось загрузить изображение: ${url}\nИгра не может быть запущена.`));
    };
    image.addEventListener(`load`, onSuccessLoadImage);
    image.addEventListener(`error`, onErrorLoadImage);
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
  let sequenceTasks = Promise.resolve();
  let sequenceOptions = Promise.resolve();

  tasks.forEach(
      (task) => {
        sequenceTasks = sequenceTasks.then(
            task.options.forEach((option) => {
              sequenceOptions = sequenceOptions.then(
                  loadImage(option.srcImage).
                      then((image) => getNewSizeImage({width: option.width, height: option.height},
                          {width: image.width, height: image.height})).
                      then((sizeImage) => refreshOption(option, sizeImage))).
                  catch(showError);
            })
        ).catch(showError);
      });
  return tasks;
};

export default loadImages;
