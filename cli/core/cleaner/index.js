const packageJson = require('./packageJson');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

const root = path.resolve();

function removeFolder(folder) {
  rimraf.sync(folder);
}

function removeFile(file) {
  new Promise((resolve, reject) => {
    fs.unlink(file, (err) => {
      if (err) reject(err)
      else resolve()
    })
  })
}

function writeFile(data, file) {
  new Promise((resolve, reject) => {
    fs.writeFileSync(file, data, (err) => {
      if (err) reject(err)
      else resolve()
    })
  })
}

async function run(options) {
  // Update package.json
  const newPackageJson = packageJson.update(options);
  writeFile(JSON.stringify(newPackageJson, null, 2), `${root}/package.json`);

  // Remove cypress
  if (options.cypress) {
    await removeFile(`${root}/docker-compose.e2e.yml`);
    await removeFile(`${root}/cy-open.yml`);
    await removeFile(`${root}/cypress.json`);
    await removeFolder(`${root}/tests/e2e`);
    await removeFolder(`${root}/tests/server`);
  }

  return true;
}

module.exports = { run }
