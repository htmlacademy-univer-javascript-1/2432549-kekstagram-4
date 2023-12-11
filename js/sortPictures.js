const PICTURES_COUNT_RND = 10;
const filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const filterElement = document.querySelector('.img-filters');

let currentFilter = filters.DEFAULT;
let pictures = [];

const sortRndom = () => Math.random() - 0.5;

const sortByComments = (picA, picB) => picB.comments.length - picA.comments.length;

const getPicturesBySort = () => {
  switch (currentFilter){
    case filters.RANDOM:
      return [...pictures].sort(sortRndom).slice(0, PICTURES_COUNT_RND);
    case filters.DISCUSSED:
      return [...pictures].sort(sortByComments);
    default:
      return [...pictures];
  }
};

const setFilterOnClick = (cb) => {
  filterElement.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')){
      return;
    }

    const getButton = evt.target;
    if (getButton.id === currentFilter){
      return;
    }

    filterElement
      .querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    getButton.classList.add('img-filters__button--active');
    currentFilter = getButton.id;
    cb(getPicturesBySort());
  });
};


const init = (loadedPictures, cb) => {
  filterElement.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];
  setFilterOnClick(cb);
};

export {init, getPicturesBySort};
