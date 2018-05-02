const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const onSuccessLoadImage = () => {
      return resolve(image);
    };
    const onErrorLoadImage = () => {
      return reject(new Error(`не удалось загрузить изображение по указанному адресу: ${url}\nИгра не может быть запущена.`));
    };
    image.addEventListener(`load`, onSuccessLoadImage);
    image.addEventListener(`error`, onErrorLoadImage);
    image.src = url;
  });
};

export default loadImage;
