//Функция для нахождения длинны строки

function getStringLength(string, maxLength) {
  if(string.length <= maxLength) {
    return true;
  }

  return false;
}

getStringLength('summer', 10);


//Функция для проверки, является ли строка палиндромом

function getPalindrome(string) {
  const stringNormal = string.replaceAll(' ','').toLowerCase();
  let stringNew = '';

  for (let i = stringNormal.length - 1; i >= 0 ; i--) {
    stringNew += stringNormal[i];
    //stringNew += stringNormal.at(i);
  }

  if (stringNew === stringNormal) {
    return true;
  }

  return false;
}

getPalindrome('Д о в О д');

//функция, извлекающая цифры из строки (не доработанная)

const getNumber = (string) => {
  let newString = '';

  for(let i = 0; i < string.length; ++i) {
    if(!isNaN(parseInt(string[i],10))) {
      newString += string[i];
    }
  }

  if(newString !== '') {
    return parseInt(newString, 10);
  }

  return NaN;
};

getNumber('2023 год');
