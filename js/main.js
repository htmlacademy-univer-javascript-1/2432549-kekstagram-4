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
  } catch {
    showError();
  }
});

try{
  const data = await getData();
  renderMiniatures(data);
} catch(err){
  showAlert(err.message);
}
