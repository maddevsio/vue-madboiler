const fs = require('fs');

/**
 * Generating a one-dimensional array and adding a range.
 * @param {Multidimensional array} lines = [3, [8, 11]]
 * @returns [3, 8, 9, 10, 11]
 */
const generateRange = (lines = []) => {
  const result = [];
  for (const line of lines) {
    if (Array.isArray(line)) {
      for (let i = line[0]; i <= line[1]; i++){
        result.push(i);
      }
    } else {
      result.push(line);
    }
  }
  return result;
}

const remove = (data, lines = []) => {
  const resultLines = generateRange(lines);
  return data
    .split('\n')
    .filter((val, idx) => resultLines.indexOf(idx + 1) === -1)
    .join('\n');
}

const removeLines = async (file, lines) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', async (err, data) => {
      if (err) reject(err);
    
      fs.writeFile(file, remove(data, lines), 'utf8', (err) => {
        if (err) reject(err);
        resolve();
      });
    })
  })
}

module.exports = { removeLines };
