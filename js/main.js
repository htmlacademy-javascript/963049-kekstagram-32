import { createUserPosts } from './createUserPosts/createUserPosts.js';
import { showAlert } from './util.js';
import { setPostsFormSubmit, hidePostForm } from './formUploadNewPosts/form.js';
import { getData, sendData } from './interactionWithServer/api.js';
import { showSuccessMessage, showErrorMessage } from './interactionWithServer/loadingMessages.js';

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
  createUserPosts(data);
} catch {
  showAlert();
}
