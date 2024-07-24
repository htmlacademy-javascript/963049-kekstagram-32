import {isEscapeKey} from '../util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');

//Создание списка комментариев под постом

const socialCommentList = bigPicture.querySelector('.social__comments');
const socialCommentItem = socialCommentList.querySelector('.social__comment');
const socialItemCommentCount = bigPicture.querySelector('.social__comment-count');
const socialCommentLoader = bigPicture.querySelector('.comments-loader');
const socialCommenTotalCount = bigPicture.querySelector('.social__comment-total-count');
//const socialCommenShownCount = document.querySelector('.social__comment-shown-count');

const SOCIAL_PICTURE_WIDTH = 35;
const SOCIAL_PICTURE_HEIGHT = 35;

let commentsData = [];
let commentsStartIndex = 0;
let commentsShownCount = 0;
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

const addComments = (comments) => {
  const commentFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    commentFragment.append(getComment(comment));
  });

  commentsShownCount += comments.length;
  socialCommenTotalCount.textContent = commentsShownCount;
  socialItemCommentCount.textContent = `${commentsShownCount} из ${commentsData.length} комментариев`;

  if(commentsShownCount >= commentsData.length) {
    socialCommentLoader.classList.add('hidden');
  }

  socialCommentList.append(commentFragment);
};

const showComments = () => {
  const comments = commentsData.slice(commentsStartIndex, commentsStartIndex + SHOWN_COMMENTS);
  commentsStartIndex += SHOWN_COMMENTS;
  addComments(comments);
};

//Открытие поста на весь экран

const showBigPicture = () => {
  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
};

const hideBigPicture = () => {
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
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

const renderComments = (comments) => {
  commentsData = comments;
  socialCommentList.innerHTML = '';

  socialCommentLoader.addEventListener('click', showComments);
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
  showComments();
  showBigPicture();
  registerCloseEvents();
};

function closeBigPicture() {
  removeEvents();
  hideBigPicture();
}

export {openBigPicture};
