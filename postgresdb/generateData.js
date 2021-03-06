const fs = require('fs');
const DataStream = require('../postgresdb/dataStream');

module.exports = () => {
  const file = fs.createWriteStream(`/data/db/data.csv`, { mode: 0o755 });
  const data = new DataStream();
  const write = data.pipe(file);
  return new Promise((resolve, reject) => {
    write.on('finish', resolve);
    write.on('error', reject);
  });
};
