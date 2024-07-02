const AMOUNT_PHOTOS_ID = {
  MIN: 1,
  MAX: 25
};

const DESCRIPTIONS = [
  'Залив с песчанным пляжем',
  'Дорожный указатель к пляжу',
  'Камни у берега моря',
  'Девушка в купальнике',
  'Миски с рисом и супом',
  'Чёрный спорткар',
  'Клубника на тарелке',
  'Фруктовый сок',
  'Пролетающий самолёт над пляжем с отдыхающими',
  'Обувная полка',
  'Тропинка к пляжу, между оградой',
  'Автомобиль ауди',
  'Овощное блюдо с мясом',
  'Суши-кот',
  'Домашная обувь',
  'Летящий самолет в небе',
  'Хоровое пение',
  'Автомобиль Кадиллак',
  'Тапки с подсветкой',
  'Аллея из пальм',
  'Экзотическое блюдо',
  'Закат у берега моря',
  'Краб на камне',
  'На зрительской трибуне большого концерта',
  'Проезжабющий внедорожник брод с бегомотами'
];

const LIKES = {
  MIN: 15,
  MAX: 200
};

const AVATAR_NUMBER = {
  MIN: 1,
  MAX: 6
};

const MESSAGES = [
  'Всё отлично!',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В целом всё неплохо.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  'В конце концов это просто непрофессионально.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.'
];

const NAMES = ['Rachel', 'Monica', 'Phoebe', 'Joey', 'Chandler', 'Ross'];

//Функция для поиска случайного числа из заданного промежутка
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//Функция для поиска случайного элемента из переданного массива
const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

//Функция c замыканием для поиска случайного числа (id)
const getCommentId = () => {
  let currentСommentId = 0;

  return function () {
    currentСommentId += 1;
    return currentСommentId;
  };
};

const generateCommentId = getCommentId();

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
  url: `photos/${getRandomInteger(
    AMOUNT_PHOTOS_ID.MIN,
    AMOUNT_PHOTOS_ID.MAX
  )}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKES.MIN, LIKES.MAX),
  comments: Array.from({ length: 30 }, createСomment)
});

// eslint-disable-next-line no-unused-vars
const manyPosts = Array.from({ length: 25 }, createPost);
