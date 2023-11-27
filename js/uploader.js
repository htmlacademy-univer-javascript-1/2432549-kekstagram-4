const MAX_HASHTEGS = 5;
const MAX_COMMENTS_LENGTH = 140;

const body = document.body;
const form = document.querySelector('.img-upload__form');
const pictureInput = form.querySelector('input[name="filename"]');
const cancelButton = form.querySelector('#upload-cancel');
const pictureOverlay = form.querySelector('.img-upload__overlay');
const commentField = form.querySelector('.text__description');
const hashtagsField = form.querySelector('.text__hashtags');
const scale = form.querySelector('input[name="scale"]');

const RegexpHASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;
const ErrorText = {
  INVALID_COUNT:  `Максимум ${MAX_HASHTEGS} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_PATTERN: 'Неправильный хэштег',
  LONG_COMMENT: 'Комментарий не может быть длиннее 140 символов'
};

function isTextFieldsFocused(){
  return document.activeElement === hashtagsField ||
    document.activeElement === commentField;
}

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const closeOverlay =() => {
  if (isTextFieldsFocused()){
    return;
  }
  body.classList.remove('modal-open');
  pictureOverlay.classList.add('hidden');
  cancelButton.removeEventListener('click', closeOverlay);
  pristine.reset();
  pictureInput.value = '';
};

pictureInput.addEventListener('change', () => {
  pictureOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  cancelButton.addEventListener('click', closeOverlay);
});

const normalizeTags = (tagString) => tagString
  .trim()
  .split(' ')
  .filter((tag) =>  Boolean(tag.length));

const hasValidTags = (value) =>  normalizeTags(value).every((tag) => RegexpHASHTAG.test(tag));
const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTEGS;
const hasUniqueTags = (value) =>  {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};
const validateComment = (value) => value.length <= MAX_COMMENTS_LENGTH;

pristine.addValidator(
  commentField,
  validateComment,
  ErrorText.LONG_COMMENT
);

pristine.addValidator(
  hashtagsField,
  hasValidCount,
  ErrorText.INVALID_COUNT,
  3,
  true
);

pristine.addValidator(
  hashtagsField,
  hasUniqueTags,
  ErrorText.NOT_UNIQUE,
  1,
  true
);

pristine.addValidator(
  hashtagsField,
  hasValidTags,
  ErrorText.INVALID_PATTERN,
  2,
  true
);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if(pristine.validate()){
    closeOverlay();
    pictureInput.value = '';
    commentField.value = '';
    hashtagsField.value = '';
    scale.value = '100%';
  }
});

export {closeOverlay};
