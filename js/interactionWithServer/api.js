const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

// const ErrorText = {
//   GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
//   SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
// };

const load = (route, method = Method.GET, body = null) => fetch(`${BASE_URL}${route}`, {method, body}).then((response) =>{
  if(!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
  return response.json();
})
  .catch((err) => {
    throw new Error(err.message);
  });

const getData = () => load(Route.GET_DATA);

const sendData = (body) => load(Route.SEND_DATA, Method.POST, body);

export {getData, sendData};
// const getData = () => fetch(`${BASE_URL}${Route.GET_DATA}`)
//   .then((response) =>{
//     if(!response.ok) {
//       throw new Error(ErrorText.GET_DATA);
//     }
//     return response.json();
//   });


// const sendData = (body) => fetch(
//   `${BASE_URL}${Route.SEND_DATA}`,
//   {
//     method: 'POST',
//     body,
//   }
// )
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error(ErrorText.SEND_DATA);
//     }
//   });
