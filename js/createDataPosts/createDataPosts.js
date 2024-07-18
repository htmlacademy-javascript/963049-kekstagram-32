import {POSTS_NUMBER, AMOUNT_PHOTOS_ID, DESCRIPTIONS, LIKES, AVATAR_NUMBER, MESSAGES, NAMES} from './variablesPosts.js';
import {getRandomInteger, generateRandomIdComment, getRandomArrayElement, generateCommentId} from '../util.js';

//Функция создания объекта с комментарием
const createСomment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(
    AVATAR_NUMBER.MIN,
    AVATAR_NUMBER.MAX
  )}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

//Функция создания объекта с постом фотографии
const createPost = () => ({
  id: generateCommentId(),
  url: `/photos/${getRandomInteger(
    AMOUNT_PHOTOS_ID.MIN,
    AMOUNT_PHOTOS_ID.MAX
  )}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKES.MIN, LIKES.MAX),
  comments: Array.from({ length: `${generateRandomIdComment()}` }, createСomment)
});

const createManyPosts = () => Array.from({ length: POSTS_NUMBER }, createPost);
export {createManyPosts, createСomment};
