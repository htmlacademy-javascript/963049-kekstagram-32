//КОД, В КОТОРОМ РАБОТАЮ
const bigPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');

const closeBigPicture = () => bigPicture.classList.add('hidden');

//Создание списка комментариев под постом

const socialCommentList = document.querySelector('.social__comments');
const socialCommentItem = socialCommentList.querySelector('.social__comment');
const socialItemCommentCount = document.querySelector('.social__comment-count');
const socialCommentLoader = document.querySelector('.comments-loader');
const socialCommenTotalCount = document.querySelector('.social__comment-total-count');
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

const openBigPicture = ({url, description, likes, comments}) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  commentsData = comments;
  socialCommentLoader.addEventListener('click', showComments);
  bigPicture.classList.remove('hidden');

  socialCommentList.innerHTML = '';
  showComments();
  // socialItemCommentCount.classList.add('hidden');
  // socialCommentLoader.classList.add('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', (e) => {
    if(e.keyCode === 27) {
      closeBigPicture();
    }
    body.classList.remove('modal-open');
  });
  bigPicture.querySelector('.big-picture__cancel').addEventListener('click', () => {
    closeBigPicture();
    body.classList.remove('modal-open');
  });
};

export {openBigPicture};
