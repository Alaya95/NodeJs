/*Описание задачи.

По ссылке вы найдёте файл с логами запросов к серверу весом более 2 Гб. 
Напишите программу, которая находит в этом файле все записи с ip-адресами 89.123.1.41 
и 34.48.240.111, а также сохраняет их в отдельные файлы с названием %ip-адрес%_requests.log.

Описание работы.

1. В файле "utility.js" написана функция которая принимает IP адрес для поиска соответствующих 
записей и название файла, в котором будет происходить поиск. 
2. Принято, что файл - ресурс, из которого читаются данные, находится в тойже папке, 
что и исполняемый файл index.js программы.
3. Принято, что файла, полученные в ходе выполнения программы, так же сохраняются в папку с 
исполняемым файлом.
4. Для запуска программы необходимо набрать "npm run home3" в консоли. */

const fs = require("fs");
const path = require("path");
const http = require('http');
const url = require('url');
const io = require('socket.io');

const isFile = fileName => {
    return fs.lstatSync(fileName).isFile();
}

const users = {};

 const app = http.createServer((request, response) => {
    if (request.method === 'GET') {
        const filePath = path.join(__dirname, 'index.html');
        readStream = fs.createReadStream(filePath);
        readStream.pipe(response);
    } else if (request.method === 'POST') {
        let data = '';

        request.on('data', chunk => {
        data += chunk;
        });

        request.on('end', () => {
          const parsedData = JSON.parse(data);
          console.log(parsedData);

          response.writeHead(200, { 'Content-Type': 'json'});
          response.end(data);
        });
      } else {
          response.statusCode = 405;
          response.end();
      }

});

const socket = io(app);

socket.on('connection', function (socket) {
  let userNickname = 'User' + Math.floor(Math.random() * 100)
  users[socket.id] = userNickname;
  socket.emit('SERVER_MSG', { msg: 'Hello ' + userNickname});

  socket.on('CLIENT_MSG', (data) => {
    userNickname = getUserNickName(socket.id);
    socket.emit('SERVER_MSG', { msg: `${userNickname}: ${data.msg}`});
    socket.broadcast.emit('SERVER_MSG', { msg: `${userNickname}: ${data.msg}`});
  });

  socket.broadcast.emit('NEW_CONN_EVENT', { msg: userNickname + ' connected' });

  socket.on('disconnect', function() {
    let disconnectedUserNickname = getUserNickName(socket.id);
    socket.broadcast.emit('SERVER_MSG', { msg: disconnectedUserNickname + ' disconnected'});
  });
  socket.on('reconnect', function() {
    let reconnectedUserNickname = getUserNickName(socket.id);
    socket.broadcast.emit('SERVER_MSG', { msg: reconnectedUserNickname + ' reconnected'});
  });

});

app.listen(3000, 'localhost');

function getUserNickName(socketId) {
  let userNickname = null;
  for (let key of Object.keys(users)) {
    if (key == socketId) return userNickname = users[key];
  }
}