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