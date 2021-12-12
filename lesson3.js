/*  По ссылке вы найдете файл с логами запросов к серверу весом более 2 Гб. 
    Напишите программу, которая находит в этом файле все записи с ip-адресам
    и 89.123.1.41 и 34.48.240.111, 
    а также сохраняет их в отдельные файлы с названием “%ip-адрес%_requests.log”. */

const fs = require('fs');
const { Transform } = require('stream');
const ACCESS_FILE = 'logs/access.log';

const readFile = fs.ReadStream(ACCESS_FILE, {
  encoding: 'utf-8',
  end: 10000,
});

const transformStream = new Transform({
  transform(chunk, encoding, callback) {
    const transformedChunk = chunk.toString();
    const arrIP = ['89.123.1.41', '34.48.240.111'];

    arrIP.forEach((ip) => {
      const regexp = new RegExp(`${ip}` + '(.+?)(\n|$)', 'gm');
      const arrIP = transformedChunk.match(regexp);

      if (arrIP) {
        fs.createWriteStream(`logs/${ip}_requests.log`, {
          flag: 'a',
          encoding: 'utf-8',
        }).write(arrIP.toString());
      }
    });
  },
});

readFile.pipe(transformStream);
