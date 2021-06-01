const packageJson = require('./packageJson');
const fs = require('fs');
const path = require('path');

const name = 'package.json';
const dist = path.resolve();

function removeFile(file) {
  fs.unlink(file, err => { if (err) throw err; });
}

function writeFile(data) {
  fs.writeFileSync(`${dist}/${name}`, data, err => { if (err) throw err; });
}

function run(options) {
  // Update package.json
  const newPackageJson = packageJson.update(options);
  writeFile(JSON.stringify(newPackageJson, null, 2));
}

module.exports = { run }
