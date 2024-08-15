import {openBigPicture} from '../openBigPost/openBigPost.js';

const userPostsContainer = document.querySelector('.pictures');
const userPostTemplate = document.querySelector('#picture').content.querySelector('.picture');

let loadedManyPosts = [];

//Создание поста с картинкой на основе по полученным параметрам
const createUserPost = ({id, url, description, likes, comments}) => {
  const userPost = userPostTemplate.cloneNode(true);
  userPost.id = id;
  userPost.querySelector('.picture__img').src = url;
  userPost.querySelector('.picture__img').alt = description;
  userPost.querySelector('.picture__likes').textContent = likes;
  userPost.querySelector('.picture__comments').textContent = comments.length;
  return userPost;
};

//Генерация постов с изображениями
const renderUserPosts = (receivedUserPosts, userPostsList) => {
  userPostsList.querySelectorAll('.picture').forEach((element) => element.remove());
  const postsFragment = document.createDocumentFragment();

  receivedUserPosts.forEach((element) => {
    const formedUserPost = createUserPost(element);
    postsFragment.appendChild(formedUserPost);
  });

  userPostsList.appendChild(postsFragment);
};

//Открытие соответсвующего поста с изображением из полученной галереи постов

const onGalleryPostsClick = (event) => {
  if(event.target.closest('.picture')) {
    const correctId = event.target.closest('.picture').id;
    if (correctId) {
      const correctPost = loadedManyPosts.find((item) => String(item.id) === String(correctId));
      if(correctPost) {
        openBigPicture(correctPost);
      }
    }
  }
};

const renderGalleryPosts = (userPosts) => {
  loadedManyPosts = userPosts;
  renderUserPosts(userPosts, userPostsContainer);
  userPostsContainer.addEventListener('click', onGalleryPostsClick);
};

export {renderGalleryPosts};
