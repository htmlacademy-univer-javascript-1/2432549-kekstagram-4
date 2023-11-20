import { picturesData } from './data.js';

const pictureList = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const cancelButton = bigPicture.querySelector('.cancel');

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
});

cancelButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

const createComment = ({avatar, message, name}) => {
  const li = document.createElement('li');
  li.classList.add('social__comment');
  const imgComment = document.createElement('img');
  const p = document.createElement('p');
  p.classList.add('social__text');
  imgComment.classList.add('social__picture');
  imgComment.src = avatar;
  imgComment.alt = name;
  imgComment.width = 35;
  imgComment.height = 35;
  p.textContent = message;
  li.appendChild(imgComment);
  li.appendChild(p);

  return li;
};

const createCommentsBlock = (comments) =>{
  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentItem = createComment(comment);
    fragment.append(commentItem);
  });
  return fragment;
};

const mainPicture = ({url, description, likes, comments}) =>{
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__comments').appendChild(createCommentsBlock(comments));
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const findPicture = (id) =>{
  const picture = picturesData.find((el) => el.id === Number(id));
  return picture;
};

pictureList.onclick = function(evt) {
  evt.preventDefault();
  const target = evt.target;

  if (target.tagName === 'IMG') {
    mainPicture(findPicture(target.id));
  }
};
