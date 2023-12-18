const PICTURES_COUNT_RND = 10;
const SHIFT = 0.5;

const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const filterElement = document.querySelector('.img-filters');

let currentFilter = Filters.DEFAULT;
let pictures = [];

const sortRndom = () => Math.random() - SHIFT;

const sortByComments = (picA, picB) => picB.comments.length - picA.comments.length;

const getPicturesBySort = () => {
  switch (currentFilter){
    case Filters.RANDOM:
      return [...pictures].sort(sortRndom).slice(0, PICTURES_COUNT_RND);
    case Filters.DISCUSSED:
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
