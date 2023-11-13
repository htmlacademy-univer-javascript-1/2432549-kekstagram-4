const picturesList = document.querySelector('.pictures');
const miniaturesTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createMiniature = (({url, description, likes, comments}) => {
  const miniatureElement = miniaturesTemplate.cloneNode(true);
  miniatureElement.querySelector('img').src = url;
  miniatureElement.querySelector('img').alt = description;
  miniatureElement.querySelector('.picture__comments').textContent = comments.length;
  miniatureElement.querySelector('.picture__likes').textContent = likes;

  return miniatureElement;
});

const renderMiniatures = ((pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const miniature = createMiniature(picture);
    fragment.append(miniature);
  });

  picturesList.append(fragment);
});

export{renderMiniatures};

