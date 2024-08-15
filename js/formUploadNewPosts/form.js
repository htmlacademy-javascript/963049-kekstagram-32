import { buttonScaleSmaller, onScaleSmallerClick, buttonScaleBigger, onScaleBiggerClick } from './scale.js';
import {resetScale} from './scale.js';
import {initEffectPicture, resetEffects, sliderElement} from './effects.js';

const VALID_SYMBOLS = /^#[A-ZА-ЯЁa-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;
const MAX_AMOUNT_TEXT_DESCRIPTION = 140;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const ErrorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштэгов`,
  INVALID_PATTERN: 'Неправильный хэштэг',
  NOT_UNIQUE: 'Хэштэг не уникальный',
  INVALID_COMMENT: `Длина комментария не может составлять больше ${MAX_AMOUNT_TEXT_DESCRIPTION} символов`
};

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SUBMITTING: 'Отправляю...',
};

const body = document.querySelector('body');
const postForm = document.querySelector('.img-upload__form');

const fileField = postForm.querySelector('.img-upload__input');
const overlay = postForm.querySelector('.img-upload__overlay');
const buttonCloseForm = postForm.querySelector('.img-upload__cancel');
const hashtagField = postForm.querySelector('.text__hashtags');
const descriptionField = postForm.querySelector('.text__description');
const submitButton = postForm.querySelector('.img-upload__submit');
const previewPicture = postForm.querySelector('.img-upload__preview img');
const effectsPicture = postForm.querySelectorAll('.effects__preview');

const pristine = new Pristine(postForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

//Условия для загрузки файла изображения
const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
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

const descriptionFieldCount = () => descriptionField.value.length <= MAX_AMOUNT_TEXT_DESCRIPTION;


//Кнопка для отправки данных на сервер
const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled ? SubmitButtonText.SUBMITTING : SubmitButtonText.IDLE;
};

//Функция для отправки формы
const setPostsFormSubmit = (callback) => {
  postForm.addEventListener('submit', async(evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if(isValid) {
      toggleSubmitButton(true);
      await callback(new FormData(postForm));
      toggleSubmitButton(false);
    }
  });
};

//Валидация поля ввода с комментарием
pristine.addValidator(
  descriptionField,
  descriptionFieldCount,
  ErrorText.INVALID_COMMENT,
  4,
  true
);

//Валидация поля ввода с хэштэгом

pristine.addValidator(
  hashtagField,
  hasUniqueTags,
  ErrorText.NOT_UNIQUE,
  3,
  true
);

pristine.addValidator(
  hashtagField,
  hasValidCount,
  ErrorText.INVALID_COUNT,
  2,
  true
);

pristine.addValidator(
  hashtagField,
  hasValidTags,
  ErrorText.INVALID_PATTERN,
  1,
  true
);

//Показать модальное окно с формой поста изображения
const showPostForm = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  buttonScaleSmaller.addEventListener('click', onScaleSmallerClick);
  buttonScaleBigger.addEventListener('click', onScaleBiggerClick);
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
  sliderElement.noUiSlider.destroy();
};

//Функция закрытия модального окна по клику мыши
const onCancelButtonClick = () => {
  hidePostForm();
};

//Функция для выбора и загрузки  изображения в форму
const onFileInputChange = () => {
  const file = fileField.files[0];

  if (file && isValidType(file)) {
    const url = URL.createObjectURL(file);
    previewPicture.src = url;
    effectsPicture.forEach((preview) => {
      preview.style.backgroundImage = `url('${url}')`;
    });
  }

  showPostForm();
};

//Функция вызова об ошибке
const isErrorMessageShown = () => {
  const error = document.querySelector('.error');
  return Boolean(error);
};

//Функция закрытия модального окна по клавише Escape
function onPostFormKeyDown(evt) {
  if(evt.key === 'Escape' && !isErrorMessageShown()) {
    evt.preventDefault();
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
//Обработчик закрытия окна формы редактирования изображения
buttonCloseForm.addEventListener('click', onCancelButtonClick);

export {setPostsFormSubmit, hidePostForm};
