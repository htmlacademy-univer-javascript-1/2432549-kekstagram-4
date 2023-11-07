import { createPictureBlocks } from './data.js';

const miniaturesTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const picturesList = document.querySelector('.pictures');
const miniatures = createPictureBlocks(25);
const miniaturesListFragment = document.createDocumentFragment();

miniatures.forEach(({url, description, likes, comments}) => {
  const miniatureElement = miniaturesTemplate.cloneNode(true);
  miniatureElement.querySelector('img').src = url;
  miniatureElement.querySelector('img').alt = description;
  miniatureElement.querySelector('.picture__comments').textContent = comments.length;
  miniatureElement.querySelector('.picture__likes').textContent = likes;

  miniaturesListFragment.appendChild(miniatureElement);
});

picturesList.appendChild(miniaturesListFragment);

