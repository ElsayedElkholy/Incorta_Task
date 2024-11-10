const fs = require('fs');
const path = require('path');

module.exports = async function getTestData() {
  const filePath = path.resolve(__dirname, 'testData.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return data;
};




// if you want to provide data from csv file
/*const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

function readCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        resolve(results[0]); // Assuming there's only one row of data
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

module.exports = async function getTestData() {
  const filePath = path.resolve(__dirname, 'expectedResults.csv');
  const data = await readCSV(filePath);
  return data;
};*/