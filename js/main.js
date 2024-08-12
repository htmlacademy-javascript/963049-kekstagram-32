import { renderGalleryPosts } from './createUserPosts/createUserPosts.js';
import { showAlert, debounce } from './util.js';
import { setPostsFormSubmit, hidePostForm } from './formUploadNewPosts/form.js';
import { getData, sendData } from './interactionWithServer/api.js';
import { showSuccessMessage, showErrorMessage } from './interactionWithServer/loadingMessages.js';
import { initFilters, getFilteredPosts } from './controlPostsDisplay/postFilter.js';

//Обработка данных формы и их отправка на сервер
setPostsFormSubmit(async(data) => {
  try {
    await sendData(data);
    hidePostForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

//Получение данных с сервера и их генерация
try {
  const data = await getData();
  const debounceRenderPosts = debounce(renderGalleryPosts);
  initFilters(data, debounceRenderPosts);
  renderGalleryPosts(getFilteredPosts());
} catch {
  showAlert();
}
