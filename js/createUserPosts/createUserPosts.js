import {createManyPosts} from '../createDataPosts/createDataPosts.js';

const userPostsList = document.querySelector('.pictures');
const userPostTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createUserPosts = createManyPosts();

const postsFragment = document.createDocumentFragment();

createUserPosts.forEach(({url, description, likes, comments}) => {
  const userPost = userPostTemplate.cloneNode(true);
  userPost.querySelector('.picture__img').src = url;
  userPost.querySelector('.picture__img').alt = description;
  userPost.querySelector('.picture__likes').textContent = likes;
  userPost.querySelector('.picture__comments').textContent = comments.length;
  postsFragment.appendChild(userPost);
});

userPostsList.appendChild(postsFragment);
