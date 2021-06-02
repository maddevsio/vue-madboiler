const packageJson = require('./packageJson');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

const root = path.resolve();

function removeFolder(folder) {
  rimraf.sync(folder);
}

function removeFile(file) {
  return new Promise((resolve, reject) => {
    fs.unlink(file, () => {
      resolve()
    })
  })
}

function writeFile(data, file) {
  return new Promise((resolve, reject) => {
    fs.writeFileSync(file, data, (err) => {
      console.error(err)
      resolve()
    })
  })
}

async function removeFiles(files) {
  for (let index = 0; index < files.length; index++) {
    const file = files[index]
    await removeFile(file)
  }
}

async function removeFolders(folders) {
  for (let index = 0; index < folders.length; index++) {
    const folder = folders[index]
    await removeFolder(folder)
  }
}

async function run(options) {
  // Update package.json
  const newPackageJson = packageJson.update(options);
  writeFile(JSON.stringify(newPackageJson, null, 2), `${root}/package.json`);
  
  // Remove cypress
  if (options.cypress) {
    await removeFiles([
      `${root}/docker-compose.e2e.yml`,
      `${root}/cy-open.yml`,
      `${root}/cypress.json`,
      `${root}/docker/Dockerfile.e2e`,
      `${root}/tests/.eslintrc.js`
    ]);
    await removeFolders([
      `${root}/tests/e2e`,
      `${root}/tests/server`
    ]);
  }

  // Remove jest
  if (options.jest) {
    await removeFiles([
      `${root}/jest.config.js`,
      `${root}/jest-coverage-badges.js`
    ]);
    await removeFolders([
      `${root}/tests/unit`
    ]);
  }

  // Remove linter
  if (options.linter) {
    await removeFiles([
      `${root}/.eslintignore`,
      `${root}/.eslintrc.js`
    ]);
  }

  // Remove vue Doc
  if (options.vueDoc) {
    await removeFolders([
      `${root}/docs/components`
    ]);
  }
  
  // Remove vue Doc
  if (options.multiLanguage) {
    await removeFolders([
      `${root}/src/locales`
    ]);
  }

  // Remove prettier
  if (options.prettier) {
    await removeFiles([
      `${root}/.prettierrc`
    ]);
  }

  return true;
}

module.exports = { run }
