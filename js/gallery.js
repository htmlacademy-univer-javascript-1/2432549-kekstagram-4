import { mainPicture } from './popup-full-picture.js';
import { renderMiniatures } from './render-miniature.js';

const picturesList = document.querySelector('.pictures');

let pictures = [];

const onListClick = (evt) => {
  const mini = evt.target.closest('[data-mini-id]');

  if (!mini) {
    return;
  }

  evt.preventDefault();
  const picture = pictures.find((item) => item.id === +mini.dataset.miniId);
  mainPicture(picture);
};

const renderGallery = (currentPics) => {
  pictures = currentPics;
  renderMiniatures(pictures, picturesList);
  picturesList.addEventListener('click', onListClick);
};

export { renderGallery };
