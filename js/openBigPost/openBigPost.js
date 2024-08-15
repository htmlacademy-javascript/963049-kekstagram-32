import {isEscapeKey} from '../util.js';

const SOCIAL_PICTURE_WIDTH = 35;
const SOCIAL_PICTURE_HEIGHT = 35;

const SHOWN_COMMENTS = 5;
let commentsShown = 0;
let commentsData = [];

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');

//Создание списка комментариев под постом

const socialCommentList = bigPicture.querySelector('.social__comments');
const socialCommentItem = socialCommentList.querySelector('.social__comment');
const socialItemCommentCount = bigPicture.querySelector('.social__comment-count');
const socialCommentsLoader = bigPicture.querySelector('.comments-loader');
const socialCommenTotalCount = bigPicture.querySelector('.social__comment-total-count');
const socialCommenShownCount = bigPicture.querySelector('.social__comment-shown-count');

const getComment = ({avatar, name, message}) => {
  const socialCommentElement = socialCommentItem.cloneNode(true);
  socialCommentElement.querySelector('.social__picture').src = avatar;
  socialCommentElement.querySelector('.social__picture').alt = name;
  socialCommentElement.querySelector('.social__picture').width = SOCIAL_PICTURE_WIDTH;
  socialCommentElement.querySelector('.social__picture').height = SOCIAL_PICTURE_HEIGHT;
  socialCommentElement.querySelector('.social__text').textContent = message;
  return socialCommentElement;
};

const hideCommentsControls = () => {
  if(commentsShown >= commentsData.length) {
    socialCommentsLoader.classList.add('hidden');
    commentsShown = commentsData.length;
  } else {
    socialCommentsLoader.classList.remove('hidden');
  }
};

const setCommentsTextCount = () => {
  socialCommenShownCount.textContent = commentsShown;
  socialCommenTotalCount.textContent = commentsData.length;
};

const renderComments = () => {
  commentsShown += SHOWN_COMMENTS;
  hideCommentsControls();

  const commentFragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const comment = getComment(commentsData[i]);
    commentFragment.append(comment);
  }

  socialCommentList.innerHTML = '';
  socialCommentList.append(commentFragment);
  setCommentsTextCount();
};

const onCommentsLoaderClick = () => renderComments();
socialCommentsLoader.addEventListener('click', onCommentsLoaderClick);

//Открытие поста на весь экран

const showBigPicture = () => {
  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
};

const hideBigPicture = () => {
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  commentsShown = 0;
};

const onEscapePress = (evt) => {
  if(isEscapeKey(evt)) {
    onBigPictureClose();
  }
};

const removeEvents = () => {
  document.removeEventListener('keydown',onEscapePress);
  bigPictureCancel.removeEventListener('click', onBigPictureClose);
};

const registerCloseEvents = () => {
  document.addEventListener('keydown', onEscapePress);
  bigPictureCancel.addEventListener('click', onBigPictureClose);
};

const renderBigPicture = ({url, description, likes}) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
};

const openBigPicture = (data) => {
  renderBigPicture(data);
  commentsData = data.comments;

  if(commentsData.length > 0) {
    renderComments();
    socialItemCommentCount.classList.remove('hidden');
    socialCommentList.classList.remove('hidden');
  } else {
    hideCommentsControls();
    socialItemCommentCount.classList.add('hidden');
    socialCommentList.classList.add('hidden');
  }

  showBigPicture();
  registerCloseEvents();
};

function onBigPictureClose() {
  removeEvents();
  hideBigPicture();
}

export {openBigPicture};
