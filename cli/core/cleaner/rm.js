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

const removeLines = (file, lines) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) throw err;
  
    // remove the first line and the 5th and 6th lines in the file
    fs.writeFile(file, remove(data, lines), 'utf8', (err) => {
      if (err) throw err;
    });
  })
}

module.exports = { removeLines };
