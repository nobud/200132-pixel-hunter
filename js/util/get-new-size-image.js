const getNewSizeImage = (sizeContainer, sizeElement) => {
  const kHeight = sizeElement.height / sizeContainer.height;
  const kWidth = sizeElement.width / sizeContainer.width;
  if (kHeight > kWidth) {
    sizeElement.height = Math.floor(sizeElement.height / kHeight);
    sizeElement.width = Math.floor(sizeElement.width / kHeight);
  } else {
    sizeElement.width = Math.floor(sizeElement.width / kWidth);
    sizeElement.height = Math.floor(sizeElement.height / kWidth);
  }
  return sizeElement;
};

export default getNewSizeImage;
