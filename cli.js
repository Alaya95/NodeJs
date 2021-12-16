#!/usr/bin/env node

/*
В домашнем задании вам нужно будет применить полученные знания к программе, которую вы написали по итогам прошлого урока.

Для этого превратите её в консольное приложение, по аналогии с разобранным примером и добавьте следующие функции:
 (+) * Возможность передавать путь к директории в программу. Это актуально, когда вы не хотите покидать текущую директорию, но вам необходимо просмотреть файл, находящийся в другом месте;
 () * В содержимом директории переходить во вложенные каталоги;
 () * При чтении файлов искать в них заданную строку или паттерн.
*/

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const yargs = require('yargs');

const options = yargs.usage('Usage: -s <string to find>').option('s', {
  alias: 'string',
  describe: 'String to find',
  type: 'string',
  demandOption: false,
}).argv;

let cwd = process.cwd();

const isFile = (fileName) => {
  return fs.lstatSync(fileName).isFile();
};

let list = fs.readdirSync(cwd);

function reader() {
  inquirer
    .prompt([
      {
        name: 'fileName',
        type: 'list',
        message: 'Choose file:',
        choices: list,
      },
    ])
    .then((answer) => {
      const filePath = path.join(cwd, answer.fileName);

      if (isFile(filePath)) {
        fs.readFile(filePath, 'utf8', (err, data) => {
          console.log(options.string);

          let regexp = new RegExp(options.string + '(.+?)(\n|$)', 'gm');

          console.log(data.match(regexp).toString());
        });
      } else {
        cwd = filePath;
        list = fs.readdirSync(filePath);
        reader();
      }
    });
}

reader();
