import { buttonScaleSmaller, onScaleClickSmaller, buttonScaleBigger, onScaleClickBigger } from './scale.js';
import {resetScale} from './scale.js';
import {initEffectPicture, resetEffects} from './effects.js';
//import {sendData} from '../interactionWithServer/api.js';

const body = document.querySelector('body');
const postForm = document.querySelector('.img-upload__form');

const fileField = postForm.querySelector('.img-upload__input');
const overlay = postForm.querySelector('.img-upload__overlay');
const buttonCloseForm = postForm.querySelector('.img-upload__cancel');
const hashtagField = postForm.querySelector('.text__hashtags');
const descriptionField = postForm.querySelector('.text__description');
const submitButton = postForm.querySelector('.img-upload__submit');

const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;
const MAX_AMOUNT_TEXT_DESCRIPTION = 140;

const errorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштэгов`,
  INVALID_PATTERN: 'Неправильный хэштэг',
  NOT_UNIQUE: 'Хэштэг не уникальный',
  INVALID_COMMENT: `Длина комментария не может составлять больше ${MAX_AMOUNT_TEXT_DESCRIPTION} символов`
};

const pristine = new Pristine(postForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SUBMITTING: 'Отправляю...',
};

//Условия для ввода данных в поле с хэштэгом
const normalizeTags = (tagString) => tagString.trim().split(' ').filter((tag) => Boolean(tag.length));

const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));

const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

//Условия для ввода данных в поле с комментарием

//длина комментария не может составлять больше 140 символов;
const descriptionFieldCount = descriptionField.value <= MAX_AMOUNT_TEXT_DESCRIPTION;

//Кнопка для отправки данных на сервер
const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled ? SubmitButtonText.SUBMITTING : SubmitButtonText.IDLE;
};

//Функция для отправки формы

// const onFormSubmit = (evt) => {
//   evt.preventDefault();
//   pristine.validate();
// };
const setPostsFormSubmit = (callback) => {
  postForm.addEventListener('submit', async(evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if(isValid) {
      toggleSubmitButton(true);
      await callback(new FormData(postForm));
      toggleSubmitButton();
    }
  });
};

// const setPostsFormSubmit = (onSuccess) => {
//   postForm.addEventListener('submit', (evt) => {
//     evt.preventDefault();

//     const isValid = pristine.validate();
//     if(isValid) {
//       sendData(new FormData(evt.target)).then(onSuccess)
//         .catch((err) => {
//           showAlert(err.message);
//         });

//       const formData = new FormData(evt.target);

//       fetch(
//         'https://32.javascript.htmlacademy.pro/kekstagram',
//         {
//           method: 'POST',
//           body: formData,
//         },
//       ).then(onSuccess)
//         .catch((err) => {
//           console.error(err);
//         });
//     }
//   });
// };


//Валидация поля ввода с комментарием
pristine.addValidator(
  hashtagField,
  descriptionFieldCount,
  errorText.INVALID_COMMENT,
  4,
  true
);

//Валидация поля ввода с хэштэгом

pristine.addValidator(
  hashtagField,
  hasUniqueTags,
  errorText.NOT_UNIQUE,
  3,
  true
);

pristine.addValidator(
  hashtagField,
  hasValidCount,
  errorText.INVALID_COUNT,
  2,
  true
);

pristine.addValidator(
  hashtagField,
  hasValidTags,
  errorText.INVALID_PATTERN,
  1,
  true
);

//Показать модальное окно с формой поста изображения
const showPostForm = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  buttonScaleSmaller.addEventListener('click', onScaleClickSmaller);
  buttonScaleBigger.addEventListener('click', onScaleClickBigger);
  initEffectPicture();
  document.addEventListener('keydown', onPostFormKeyDown);
};

//Скрыть модальное окно с формой поста изображения
const hidePostForm = () => {
  postForm.reset();
  resetScale();
  resetEffects();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPostFormKeyDown);
};


//Функция закрытия модального окна по клику мыши
const onCancelButtonClick = () => {
  hidePostForm();
};

//Функция для выбора изображения в форме
const onFileInputChange = () => {
  showPostForm();
};

const isErrorMessageShown = () => Boolean(document.querySelector('.error'));

//Функция закрытия модального окна по клавише Escape
function onPostFormKeyDown(e) {
  if(e.key === 'Escape' && !isErrorMessageShown()) {
    e.preventDefault();
    hidePostForm();
  }
}

//Отмена обработчика Escape при фокусе в полях ввода данных
hashtagField.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

descriptionField.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

//Обработчики:
//Обработчик загрузки изображения
fileField.addEventListener('change', onFileInputChange);
//Обработчик отправки формы
//postForm.addEventListener('submit', onFormSubmit);
//Обработчик закрытия окна формы редактирования изображения
buttonCloseForm.addEventListener('click', onCancelButtonClick);

export {setPostsFormSubmit, hidePostForm};
