import {isEscapeKey} from '../util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');

//Создание списка комментариев под постом

const socialCommentList = bigPicture.querySelector('.social__comments');
const socialCommentItem = socialCommentList.querySelector('.social__comment');
//const socialItemCommentCount = bigPicture.querySelector('.social__comment-count');
const socialCommentsLoader = bigPicture.querySelector('.comments-loader');
const socialCommenTotalCount = bigPicture.querySelector('.social__comment-total-count');
const socialCommenShownCount = bigPicture.querySelector('.social__comment-shown-count');

const SOCIAL_PICTURE_WIDTH = 35;
const SOCIAL_PICTURE_HEIGHT = 35;

let commentsData = [];
let commentsShown = 0;
const SHOWN_COMMENTS = 5;

const getComment = ({avatar, name, message}) => {
  const socialCommentElement = socialCommentItem.cloneNode(true);
  socialCommentElement.querySelector('.social__picture').src = avatar;
  socialCommentElement.querySelector('.social__picture').alt = name;
  socialCommentElement.querySelector('.social__picture').width = SOCIAL_PICTURE_WIDTH;
  socialCommentElement.querySelector('.social__picture').height = SOCIAL_PICTURE_HEIGHT;
  socialCommentElement.querySelector('.social__text').textContent = message;
  return socialCommentElement;
};

const renderComments = () => {
  commentsShown += SHOWN_COMMENTS;

  if(commentsShown >= commentsData.length) {
    socialCommentsLoader.classList.add('hidden');
    commentsShown = commentsData.length;
  } else {
    socialCommentsLoader.classList.remove('hidden');
  }

  const commentFragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const comment = getComment(commentsData[i]);
    commentFragment.append(comment);
  }

  socialCommentList.innerHTML = '';
  socialCommentList.append(commentFragment);
  socialCommenShownCount.textContent = commentsShown;
  socialCommenTotalCount.textContent = commentsData.length;
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

const handlerEscape = (e) => {
  if(isEscapeKey(e)) {
    closeBigPicture();
  }
};

const removeEvents = () => {
  document.removeEventListener('keydown', handlerEscape);
  bigPictureCancel.removeEventListener('click', closeBigPicture);
};

const registerCloseEvents = () => {
  document.addEventListener('keydown', handlerEscape);
  bigPictureCancel.addEventListener('click', closeBigPicture);
};

const renderBigPicture = ({url, description, likes, comments}) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  renderComments(comments);
};

const openBigPicture = (data) => {
  renderBigPicture(data);
  commentsData = data.comments;
  if(commentsData.length > 0) {
    renderComments();
  }
  showBigPicture();
  registerCloseEvents();
};

function closeBigPicture() {
  removeEvents();
  hideBigPicture();
}

export {openBigPicture};
