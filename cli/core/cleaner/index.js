const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const rm = require('./rm');
const packageJson = require('./packageJson');

const root = path.resolve();

function removeFolder(folder) {
  rimraf.sync(folder);
}

function removeFile(file) {
  return new Promise(resolve => {
    fs.unlink(file, () => {
      resolve();
    });
  });
}

function writeFile(data, file) {
  return new Promise(resolve => {
    fs.writeFileSync(file, data, err => {
      console.error(err);
      resolve();
    });
  });
}

async function removeFiles(files) {
  const promises = [];
  /* eslint-disable-next-line */
  for (const file of files) {
    promises.push(removeFile(file));
  }
  await Promise.all(promises);
}

async function removeFolders(folders) {
  const promises = [];
  /* eslint-disable-next-line */
  for (const folder of folders) {
    promises.push(removeFolder(folder));
  }
  await Promise.all(promises);
}

async function run(options) {
  // Update package.json
  const newPackageJson = packageJson.update(options);
  writeFile(JSON.stringify(newPackageJson, null, 2), `${root}/package.json`);

  await removeFiles([`${root}/package-lock.json`]);
  await removeFolders([`${root}/node_modules`]);

  // Remove sentry
  if (options.sentry) {
    await rm.removeLines(`${root}/src/main.js`, [2, 3, 8, 9, [13, 21]]);
  }

  // Remove cypress
  if (options.cypress) {
    await removeFiles([
      `${root}/docker-compose.e2e.yml`,
      `${root}/cy-open.yml`,
      `${root}/cypress.json`,
      `${root}/docker/Dockerfile.e2e`,
      `${root}/tests/.eslintrc.js`
    ]);
    await removeFolders([`${root}/tests/e2e`, `${root}/tests/server`]);
  }

  // Remove jest
  if (options.jest) {
    await removeFiles([`${root}/jest.config.js`, `${root}/jest-coverage-badges.js`]);
    await removeFolders([`${root}/tests/unit`]);
  }

  // Remove linter
  if (options.linter) {
    await removeFiles([`${root}/.eslintignore`, `${root}/.eslintrc.js`]);
  }

  // Remove gitlab pages
  if (options.gitlabPage) {
    await removeFiles([`${root}/vue.config.js`]);
  }

  // Remove vue Doc
  if (options.vueDoc) {
    await removeFolders([`${root}/docs/components`]);
  }

  // Remove i18n
  if (options.multiLanguage) {
    await removeFolders([`${root}/src/locales`]);
    if (options.sentry) {
      rm.removeLines(`${root}/src/main.js`, [5, 12]);
    } else {
      await rm.removeLines(`${root}/src/main.js`, [7, 25]);
    }
  }

  // Remove prettier
  if (options.prettier) {
    await removeFiles([`${root}/.prettierrc`]);
  }

  return true;
}

module.exports = { run };
