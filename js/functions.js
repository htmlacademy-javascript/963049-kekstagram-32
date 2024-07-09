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

//функция, проверяющая продолжительность встречи, в рамках рабочего времени

const MINUTES_IN_HOUR = 60;

const hoursInMinutes = (time) => {
  const timeValues = time.split(':').map((item) => parseFloat(item));
  const [hours, minutes] = timeValues;
  return hours * MINUTES_IN_HOUR + minutes;
};

const isMeetingDuringBusinessTime = function (
  startTime,
  endTime,
  startTimeMeeting,
  durationMeetingNumber
) {
  const startTimeInMinutes = hoursInMinutes(startTime);
  const endTimeInMinutes = hoursInMinutes(endTime);
  const startTimeMeetingInMinutes = hoursInMinutes(startTimeMeeting);

  if (
    startTimeMeetingInMinutes < startTimeInMinutes ||
    startTimeMeetingInMinutes > endTimeInMinutes ||
    startTimeMeetingInMinutes + durationMeetingNumber > endTimeInMinutes
  ) {
    return false;
  } else {
    return true;
  }
};

isMeetingDuringBusinessTime('08:00', '17:30', '14:00', 90);// true
isMeetingDuringBusinessTime('8:0', '10:0', '8:0', 120);// true
isMeetingDuringBusinessTime('08:00', '14:30', '14:00', 90);// false
isMeetingDuringBusinessTime('14:00', '17:30', '08:0', 90);// false
isMeetingDuringBusinessTime('8:00', '17:30', '08:00', 900);// false
