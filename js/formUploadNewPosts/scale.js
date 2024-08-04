const scale = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
  DEFAULT: 100
};

const postModalElement = document.querySelector('.img-upload');
const picturePreviewElement = postModalElement.querySelector('.img-upload__preview img');
const buttonScaleSmaller = postModalElement.querySelector('.scale__control--smaller');
const buttonScaleBigger = postModalElement.querySelector('.scale__control--bigger');
const scaleInputValue = postModalElement.querySelector('.scale__control--value');

//Функция для изменения размера изображения
const scalePicture = (value) => {
  picturePreviewElement.style.transform = `scale(${value / 100})`;
  scaleInputValue.setAttribute('value', `${value}%`);
  scaleInputValue.value = `${value}%`;
};

//Функция для кнопки уменьшения изображения
const onScaleClickSmaller = () => {
  scalePicture(Math.max(parseInt(scaleInputValue.value, 10) - scale.STEP, scale.MIN));
};

//Функция для кнопки увеличения изображения
const onScaleClickBigger = () => {
  scalePicture(Math.min(parseInt(scaleInputValue.value, 10) + scale.STEP, scale.MAX));
};

//Функция для сброса до первоначальных(дефолтных) данных
const resetScale = () => scalePicture(scale.DEFAULT);

export { resetScale, buttonScaleSmaller, onScaleClickSmaller, buttonScaleBigger, onScaleClickBigger };
