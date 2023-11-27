import { closeBigPicture } from './popupFullPicture.js';
import { closeOverlay } from './uploader.js';

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();

    closeBigPicture();
    closeOverlay();
  }
});

document.body.addEventListener('click', (evt) =>{
  if (evt.target.classList.contains('big-picture') || evt.target.classList.contains('img-upload__overlay')){
    closeBigPicture();
    closeOverlay();
  }
});

export {getRandomInteger,getRandomArrayElement};
