/*
    Напишите программу для вывода в консоль простых чисел, чтобы они попадали в указанный диапазон включительно.
    При этом числа должны окрашиваться в цвета по принципу светофора:
        - первое число выводится зелёным цветом;
        - второе — жёлтым;
        - третье — красным.
    Диапазон, куда попадут числа, указывается при запуске программы.
    Если простых чисел в диапазоне нет, нужно, чтобы программа сообщила об этом в терминале красным цветом.
    Если аргумент, переданный при запуске, не считается числом — сообщите об этом ошибкой и завершите программу.
*/

const colors = require('colors');
let [minNum, maxNum] = process.argv.slice(2);
let primeNumbers = new Array();

function searchNotPrime(i) {
  for (let j = 2; j < i; j++) {
    if (i % j === 0) return true;
  }
}

if ((isNaN(minNum) == false) & (isNaN(maxNum) == false)) {
  console.log(colors.green('Поиск простых чисел от ' + minNum + ' до ' + maxNum));

  for (let i = minNum; i <= maxNum; ++i) {
    if (!searchNotPrime(i)) primeNumbers.push(i);
  }

  if (primeNumbers.length == 0) console.log(colors.red('В  диапазоне от ' + minNum + ' до ' + maxNum + ' простые числа не найдены'));

  while (primeNumbers.length != 0) {
    console.log(colors.green(primeNumbers.shift()));
    if (primeNumbers.length != 0) console.log(colors.yellow(primeNumbers.shift()));
    if (primeNumbers.length != 0) console.log(colors.red(primeNumbers.shift()));
  }
} else {
    if (isNaN(minNum) == true) console.log(colors.red('Ошибка: переданное значение "' + minNum + '" не является числом'));
    if (isNaN(maxNum) == true) console.log(colors.red('Ошибка: переданное значение "' + maxNum + '" не является числом'));
}
