const path = require('node:path');
const fs = require('node:fs');
const readlinePromises = require('node:readline/promises');

const fileName = 'logs.txt';
const rl = readlinePromises.createInterface({
  input: process.stdin,
  output: process.stdout
})

const number = createNumber();
startGame(fileName);





function createNumber() {
  const numbers = [1, 2];
  return numbers[Math.floor(Math.random() * numbers.length)];
}

function startGame(fileName) {
  if (fileName) {
    const file = path.join(__dirname, fileName);
    const date = new Date();
    let fileText;

    console.log('Отгадайте загаданное число: 1 или 2?');

    rl.on('line', (line) => {
      if (+line === number) {
        console.log('Поздравляем, Вы выиграли!');
        fileText = date + "; user won; 1\n";
        fs.appendFile(file, fileText, (err) => {
          if (err) {
            console.error('Ошибка1: не удалось записать лог ' + err);
          }
        });
        rl.close();
      } else {
        console.log('Вы проиграли! Попробуйте ещё раз.');
        fileText = date + "; user lost; 0\n";
        fs.appendFile(file, fileText, (err) => {
          if (err) {
            console.error('Ошибка2: не удалось записать лог ' + err);
          }
        });
        rl.close();
      }
    })
  } else {
    console.error('Ошибка: не указано имя файла для логирования.');
  }
  
}