const fs = require('node:fs');
const path = require('node:path');

file = path.join(__dirname, 'logs.txt');

getLogs(file);

function getLogs(file) {
  const  streamRead = fs.createReadStream(file);
  let data = '';

  streamRead
  .setEncoding('utf8')
  .on('data', (chank) => {
    data += chank;
  })
  .on('end', (err) => {
    const lines = data.split('\n');
    lines.shift();
    console.log(`Общее количество партий: ${lines.length}`);

    const won = lines.filter(e => e.split('; ')[2] == 1);
    console.log(`Количество выигранных/проигранных партий: ${won.length}/${lines.length - won.length}`);
    console.log(`Процентное соотношение выигранных партий: ${(won.length * 100 / lines.length).toFixed(0)}`);
  })
}