import './photo.js';
import { renderGallery } from './gallery.js';
import { closeOverlay, setOnSubmit } from './uploader.js';
import { showSuccess, showError } from './message.js';
import { getData, sendData } from './api.js';
import { showAlert, debounce } from './util.js';
import {init as initSort, getPicturesBySort} from './sortPictures.js';

setOnSubmit(async (data) => {
  try{
    await sendData(data);
    closeOverlay();
    showSuccess();
  } catch(err) {
    showError();
  }
});

try{
  getData()
    .then((data) => {
      const dobouncedRender = debounce(renderGallery);
      initSort(data, dobouncedRender);
      renderGallery(getPicturesBySort());
    });
} catch(err){
  showAlert(err.message);
}
