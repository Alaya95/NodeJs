/*1. Решите задачу по выводу данных в консоль.*/

//  1 5 6 2 3 4

// console.log('Record 1');

// setTimeout(() => {
//   console.log('Record 2');

//   Promise.resolve().then(() => {
//     setTimeout(() => {
//       console.log('Record 3');

//       Promise.resolve().then(() => {
//         console.log('Record 4');
//       });
//     });
//   });
// });

// console.log('Record 5');

// Promise.resolve().then(() => Promise.resolve().then(() => console.log('Record 6')));

/*
2. Напишите программу, которая будет принимать на вход несколько аргументов: дату и время в формате «час-день-месяц-год». 
Задача программы — создавать для каждого аргумента таймер с обратным отсчётом: 
посекундный вывод в терминал состояния таймеров (сколько осталось). 
По истечении какого-либо таймера, вместо сообщения о том, сколько осталось, 
требуется показать сообщение о завершении его работы. 
Важно, чтобы работа программы основывалась на событиях.
*/
// минуты часы число месяц год
//20-20-20-10-2022

// вывод оставшегося количества времени до этой даты старт

let arrDateArgv = process.argv[2].split('-');

let arrDate = {
  minute: arrDateArgv[0],
  hour: arrDateArgv[1],
  day: arrDateArgv[2],
  month: arrDateArgv[3],
  year: arrDateArgv[4],
};

const interval = setInterval(() => {
  // сейчас
  const now = new Date() - new Date().getTimezoneOffset() * 60 * 1000;

  // введенные данные new Date(year, month[, day[, hour[, minute[, second[, millisecond]]]]]);
  const target = new Date(
    arrDate['year'],
    arrDate['month'],
    arrDate['day'],
    arrDate['hour'],
    arrDate['minute'],
  );
  const result = new Date(target - now);
  const year = result.getFullYear() - 1970;
  const mounth = result.getMonth() - 1;
  const days = result.getDay();
  const hours = result.getHours();
  const minutes = result.getMinutes();
  const seconds = result.getSeconds();
 
  if (result.getTime() - new Date('Sun 1 February 1970 00:00:00').getTime() <= 0) {
    console.log('Отчёт закончен. Дата наступила!');
    clearInterval(interval);
  } else {
     console.log(
    `${year} лет, ${mounth} месяцев, ${days} дней, ${hours} часов, ${minutes} минут, ${seconds} секунд`,
  );
  }
}, 1000);
