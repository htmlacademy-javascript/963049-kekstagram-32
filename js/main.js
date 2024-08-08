import { createUserPosts } from './createUserPosts/createUserPosts.js';
import { showAlert } from './util.js';
import { setPostsFormSubmit, hidePostForm } from './formUploadNewPosts/form.js';
import { getData, sendData } from './interactionWithServer/api.js';
import { showSuccessMessage, showErrorMessage } from './interactionWithServer/loadingMessages.js';

//import {createUserPosts} from '../createUserPosts/createUserPosts.js';
//createUserPosts();

// fetch('https://32.javascript.htmlacademy.pro/kekstagram/data')
//   .then((response) => response.json())
// getData()
//   .then((newUserPosts) => {
//     createUserPosts(newUserPosts);
//   });
setPostsFormSubmit(async(data) => {
  try {
    await sendData(data);
    hidePostForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  createUserPosts(data);
} catch {
  showAlert();
}
