const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('.img-upload__start input[type=file]');
const preview = document.querySelector('.img-upload__preview img');
const previewsEffects = document.querySelectorAll('.effects__list span');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  const pictureObject = URL.createObjectURL(file);

  if (matches) {
    preview.src = pictureObject;
  }

  previewsEffects.forEach((element) => {
    element.style.backgroundImage = `url(${pictureObject})`;
  });
});
