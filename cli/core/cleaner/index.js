const packageJson = require('./packageJson');
const fs = require('fs');
const path = require('path');

const root = path.resolve();

function removeFolder(folder) {
  fs.rmdirSync(folder, { recursive: true });
}

function removeFile(file) {
  fs.unlink(file, err => { if (err) throw err; });
}

function writeFile(data, file) {
  fs.writeFileSync(file, data, err => { if (err) throw err; });
}

function run(options) {
  // Update package.json
  const newPackageJson = packageJson.update(options);
  writeFile(JSON.stringify(newPackageJson, null, 2), `${root}/package.json`);

  // Remove cypress
  if (options.cypress) {
    removeFile(`${root}/docker-compose.e2e.yml`);
    removeFile(`${root}/cy-open.yml`);
    removeFile(`${root}/cypress.json`);
    removeFolder(`${root}/tests/e2e`);
    removeFolder(`${root}/tests/server`);
  }
}

module.exports = { run }
