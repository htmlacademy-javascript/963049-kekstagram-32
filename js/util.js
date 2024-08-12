//Функция debounce для устранения дребезга:
function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

//Функция throttle для пропуска кадров:
function throttle (callback, delayBetweenFrames) {
  let lastTime = 0;

  return (...rest) => {
    const now = new Date();

    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

//Функция показа ошибки при отправке формы
const ALERT_SHOW_TIME = 5000;
const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const showAlert = () => {
  const dataErrorElement = dataErrorTemplate.cloneNode(true);
  document.body.append(dataErrorElement);

  setTimeout(() => {
    dataErrorElement.remove();
  }, ALERT_SHOW_TIME);
};


//Функция для поиска случайного числа из заданного промежутка
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//Функция-генератор для получения уникальных идентификаторов из указанного диапазона
function createRandomIdFromRangeGenerator (min,max) {
  const previousValues = [];

  return function() {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}
const generateRandomIdComment = createRandomIdFromRangeGenerator(0,30);

//Функция для поиска случайного элемента из переданного массива
const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

//Функция c замыканием для поиска случайного числа (id)
const getCommentId = () => {
  let currentСommentId = 0;

  return function () {
    currentСommentId += 1;
    return currentСommentId;
  };
};

//Функция для закрытия окна через кнопку 'Escape'
const isEscapeKey = (evt) => evt.key === 'Escape';

const generateCommentId = getCommentId();
export{ debounce, throttle, showAlert, getRandomInteger, generateRandomIdComment, getRandomArrayElement, generateCommentId, isEscapeKey };
