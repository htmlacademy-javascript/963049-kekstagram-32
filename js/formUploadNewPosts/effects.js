const Effect = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const effectToFilter = {
  [Effect.CHROME]: {
    style: 'grayscale',
    unit: '',
  },
  [Effect.SEPIA]: {
    style: 'sepia',
    unit: '',
  },
  [Effect.MARVIN]: {
    style: 'invert',
    unit: '%',
  },
  [Effect.PHOBOS]: {
    style: 'blur',
    unit: 'px',
  },
  [Effect.HEAT]: {
    style: 'brightness',
    unit: '',
  },
};

const effectToSliderOptions = {
  [Effect.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [Effect.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [Effect.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [Effect.MARVIN]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [Effect.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1,
  },
  [Effect.HEAT]: {
    min: 0,
    max: 3,
    step: 0.1,
  },
};

const postModalElement = document.querySelector('.img-upload');
const picturePpreviewElement = postModalElement.querySelector('.img-upload__preview img');
const effectsElement = postModalElement.querySelector('.effects');
const sliderElement = document.querySelector('.effect-level__slider');//Класс инициализации слайдера
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const effectLevelElement = document.querySelector('.effect-level__value');

//Выбранный эффект по умолчанию
let selectedEffect = Effect.DEFAULT;

const isDefault = () => selectedEffect === Effect.DEFAULT;

//Функция для применения специальных эффектов для изображения
const setImageStyle = () => {
  if(isDefault()) {
    picturePpreviewElement.style.filter = null;
    return;
  }

  const { value } = effectLevelElement;
  const { style, unit } = effectToFilter[selectedEffect];
  picturePpreviewElement.style.filter = `${style}(${value}${unit})`;
};

//Показать шкалу изменения эффектов
const showSlider = () => {
  sliderContainerElement.classList.remove('hidden');
};

//Скрыть шкалу изменения эффектов
const hideSlider = () => {
  sliderContainerElement.classList.add('hidden');
};

//Функция для получения значений слайдера
const onSliderUpdate = () => {
  effectLevelElement.value = sliderElement.noUiSlider.get();
  setImageStyle();
};

//Создание слайдера эффектов с параметрами ввода данных
const createSlider = ({min, max, step}) => {
  noUiSlider.create(sliderElement, {
    range: { min, max },
    step,
    start: max,
    connect: 'lower',
    format: {
      to: (value) => Number(value),
      from: (value) => Number(value),
    }
  });

  sliderElement.noUiSlider.on('update', onSliderUpdate);
  hideSlider();
};

//Обновление слайдера эффектов
const updateSlider = ({min, max, step}) => {
  sliderElement.noUiSlider.updateOptions({
    range: { min, max },
    step,
    start: max,
  });
};

//Установление состояния слайдара по умолчанию
const setSlider = () => {
  if(isDefault()) {
    hideSlider();
  } else {
    updateSlider(effectToSliderOptions[selectedEffect]);
    showSlider();
  }
};

//Применение эффектов
const setEffect = (effect) => {
  selectedEffect = effect;
  setSlider();
  setImageStyle();
};

const onEffectsChange = (evt) => {
  setEffect(evt.target.value);
};

//Сброс эффектов
const resetEffects = () => {
  setEffect(Effect.DEFAULT);
};

//Инициализация настроек слайдера
const initEffectPicture = () => {
  createSlider(effectToSliderOptions[selectedEffect]);
  effectsElement.addEventListener('change', onEffectsChange);
};

export { initEffectPicture, resetEffects };
