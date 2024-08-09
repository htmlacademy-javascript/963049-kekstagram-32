const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

//Функция загрузки данных с сервера
const load = (route, method = Method.GET, body = null) => fetch(`${BASE_URL}${route}`, {method, body}).then((response) =>{
  if(!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
  return response.json();
})
  .catch((err) => {
    throw new Error(err.message);
  });

//Получение данных с сервера
const getData = () => load(Route.GET_DATA);

//Отправка данных на сервер
const sendData = (body) => load(Route.SEND_DATA, Method.POST, body);

export {getData, sendData};
