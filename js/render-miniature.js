const picturesList = document.querySelector('.pictures');
const miniaturesTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createMiniature = (({id, url, description, likes, comments}) => {
  const miniatureElement = miniaturesTemplate.cloneNode(true);
  miniatureElement.querySelector('img').src = url;
  miniatureElement.querySelector('img').alt = description;
  miniatureElement.querySelector('.picture__comments').textContent = comments.length;
  miniatureElement.querySelector('.picture__likes').textContent = likes;
  miniatureElement.dataset.miniId = id;

  return miniatureElement;
});

const renderMiniatures = ((pictures) => {
  picturesList.querySelectorAll('.picture').forEach((elem) => elem.remove());
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const miniature = createMiniature(picture);
    fragment.appendChild(miniature);
  });

  picturesList.appendChild(fragment);
});

export { renderMiniatures };
