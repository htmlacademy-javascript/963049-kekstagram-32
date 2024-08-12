const POSTS_COUNT = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const filterElement = document.querySelector('.img-filters');
let currentFilter = Filter.DEFAULT;
let manyPosts = [];

const sortRandomly = () => Math.random() - 0.5;

const sortByComments = (userPostA, userPostB) => userPostB.comments.length - userPostA.comments.length;

const getFilteredPosts = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return [...manyPosts].sort(sortRandomly).slice(0, POSTS_COUNT);
    case Filter.DISCUSSED:
      return [...manyPosts].sort(sortByComments);
    default:
      return [...manyPosts];
  }
};

const toggleActiveFilterButton = (clickedButton) => {
  const activeButton = filterElement.querySelector('.img-filters__button--active');
  if(activeButton) {
    activeButton.classList.remove('img-filters__button--active');
  }
  clickedButton.classList.add('img-filters__button--active');
};

const setOnFilterClick = (callback) => {
  filterElement.addEventListener('click', (evt) => {
    if(!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const clickedButton = evt.target;
    if(clickedButton.id === currentFilter) {
      return;
    }

    // filterElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    // clickedButton.classList.add('img-filters__button--active');
    toggleActiveFilterButton(clickedButton);
    currentFilter = clickedButton.id;
    callback(getFilteredPosts());
  });
};

const initFilters = (loadedPosts, callBack) => {
  filterElement.classList.remove('img-filters--inactive');
  manyPosts = [...loadedPosts];
  setOnFilterClick(callBack);
};

export { initFilters, getFilteredPosts };
