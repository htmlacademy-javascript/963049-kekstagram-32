const body = document.querySelector('body');
const postForm = document.querySelector('.img-upload__form');

const fileField = postForm.querySelector('.img-upload__input');
const overlay = postForm.querySelector('.img-upload__overlay');
const buttonCloseForm = postForm.querySelector('.img-upload__cancel');
const hashtagField = postForm.querySelector('.text__hashtags');
const descriptionField = postForm.querySelector('.text__description');

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

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

//Показать модальное окно с формой поста изображения
const showPostForm = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onPostFormKeyDown);
};

//Скрыть модальное окно с формой поста изображения
const hidePostForm = () => {
  postForm.reset();
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

//Функция закрытия модального окна по клавише Escape
function onPostFormKeyDown(e) {
  if(e.key === 'Escape') {
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

//Обработчики
fileField.addEventListener('change', onFileInputChange); //Обработчик загрузки изображения
postForm.addEventListener('submit', onFormSubmit); //Обработчик отправки формы
buttonCloseForm.addEventListener('click', onCancelButtonClick); //Обработчик закрытия окна формы редактирования изображения
