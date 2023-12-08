import { renderMiniatures } from './renderingMiniature.js';
import { closeOverlay, setOnSubmit } from './uploader.js';
import { showSuccess, showError } from './message.js';
import { getData, sendData } from './api.js';
import { showAlert } from './util.js';

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
    .then((data) => renderMiniatures(data));
} catch(err){
  showAlert(err.message);
}
