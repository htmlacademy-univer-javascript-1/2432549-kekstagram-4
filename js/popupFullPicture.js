const LOADED_COMMENT = 5;
const AVATAR_WIDTH = 35;
const AVATAR_HEIGHT = 35;

const bigPicture = document.querySelector('.big-picture');
const cancelButton = bigPicture.querySelector('.cancel');
const loaderButton = bigPicture.querySelector('.comments-loader');

function closeBigPicture(){
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  loaderButton.classList.remove('hidden');
}

function openFiveComments (commentsHidden) {
  let lenght = LOADED_COMMENT;

  if (commentsHidden.length <= lenght){
    lenght = commentsHidden.length;

    loaderButton.classList.add('hidden');
  }

  for (let i = 0; i < lenght; i++){
    commentsHidden[i].classList.remove('hidden');
  }

  const commentsShown = bigPicture.querySelector('.comments-shown');
  commentsShown.textContent = Number(commentsShown.textContent)+lenght;
}

cancelButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  closeBigPicture();
});

loaderButton.addEventListener('click', (evt) =>{
  evt.preventDefault();

  const commentsHidden = bigPicture.querySelector('.social__comments').querySelectorAll('.hidden');

  openFiveComments(commentsHidden);
});

const createComment = ({avatar, message, name}) => {
  const li = document.createElement('li');
  const imgComment = document.createElement('img');
  const p = document.createElement('p');
  li.classList.add('social__comment');
  li.classList.add('hidden');
  p.classList.add('social__text');
  imgComment.classList.add('social__picture');
  imgComment.src = avatar;
  imgComment.alt = name;
  imgComment.width = AVATAR_WIDTH;
  imgComment.height = AVATAR_HEIGHT;
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
  bigPicture.querySelector('.comments-shown').textContent = '0';
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__comments').innerHTML = '';
  bigPicture.querySelector('.social__comments').appendChild(createCommentsBlock(comments));
  bigPicture.querySelector('.social__caption').textContent = description;
  openFiveComments(bigPicture.querySelector('.social__comments').querySelectorAll('.hidden'));
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

export {closeBigPicture, mainPicture};
