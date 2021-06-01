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
    await removeFile(`${root}/docker/Dockerfile.e2e`);
    await removeFile(`${root}/tests/.eslintrc.js`);
    await removeFolder(`${root}/tests/e2e`);
    await removeFolder(`${root}/tests/server`);
  }

  // Remove jest
  if (options.jest) {
    await removeFile(`${root}/jest.config.js`);
    await removeFile(`${root}/jest-coverage-badges.js`);
    await removeFolder(`${root}/tests/unit`);
  }

  // Remove linter
  if (options.linter) {
    await removeFile(`${root}/.eslintignore`);
    await removeFile(`${root}/.eslintrc.js`);
  }

  // Remove vue Doc
  if (options.vueDoc) {
    await removeFolder(`${root}/docs/components`);
  }

  // Remove vue Doc
  if (options.multiLanguage) {
    await removeFolder(`${root}/src/locales`);
  }

  // Remove prettier
  if (options.multiLanguage) {
    await removeFile(`${root}/.prettierrc`);
  }

  return true;
}

module.exports = { run }
