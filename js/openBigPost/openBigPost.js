import '../createUserPosts/createUserPosts.js';
import {createСomment} from '../createDataPosts/createDataPosts.js';
import {isEscapeKey} from '../util.js';

const userBigPost = document.querySelector('.big-picture');
const openUserPosts = document.querySelector('.pictures');
const buttonCloseBigPicture = document.querySelector('.big-picture__cancel');
const socialItemCommentCount = document.querySelector('.social__comment-count');
const socialCommentLoader = document.querySelector('.comments-loader');

//Создание списка комментариев под постом

const renderSocialComments = () => {
  const socialListComment = document.querySelector('.social__comments');
  const socialItemComment = socialListComment.querySelector('.social__comment');
  const socialComment = createСomment();

  const SOCIAL_PICTURE_WIDTH = 35;
  const SOCIAL_PICTURE_HEIGHT = 35;

  const socialListFragment = document.createDocumentFragment();

  socialComment.forEach(({avatar, name, message}) => {
    const socialCommentElement = socialItemComment.cloneNode(true);
    socialCommentElement.querySelector('.social__picture').src = avatar;
    socialCommentElement.querySelector('.social__picture').alt = name;
    socialCommentElement.querySelector('.social__picture').width = SOCIAL_PICTURE_WIDTH;
    socialCommentElement.querySelector('.social__picture').height = SOCIAL_PICTURE_HEIGHT;
    socialCommentElement.querySelector('.social__text').textContent = message;

    socialListFragment.appendChild(socialCommentElement);
  });

  socialListComment.appendChild(socialListFragment);
};

/*
const SHOWN_COMMENTS = 5;
const commentStartIndex = 0;

const shownCommentsList = () => {
  renderSocialComments().slice(commentStartIndex, commentStartIndex + SHOWN_COMMENTS);
};
*/

//Открытие поста на весь экран
const getBigPostData = ({url, likes, comments, description}) => {
  userBigPost.querySelector('.big-picture__img img').src = url;
  userBigPost.querySelector('.likes-count').textContent = likes;
  renderSocialComments.textContent = comments.length;
  userBigPost.querySelector('.social__caption').textContent = description;
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserPost();
  }
};

function openUserPost () {
  userBigPost.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeUserPost () {
  userBigPost.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
}

openUserPosts.addEventListener('click', () => {
  openUserPost();

  socialItemCommentCount.classList.add('hidden');
  socialCommentLoader.classList.add('hidden');
});

buttonCloseBigPicture.addEventListener('click', () => {
  closeUserPost();
});

export {getBigPostData};
