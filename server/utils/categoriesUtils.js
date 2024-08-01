const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../../client/src/categories') + '/';
const ABS_AUTH_PATH = path.resolve(
  __dirname,
  '../../client/src/site/authentication',
);

function _isPathFolder(path) {
  const pathInfo = fs.statSync(path);
  return !pathInfo.isFile();
}

function _getFolderInformationFromReadme(readmePath) {
  const fileHandler = fs.readFileSync(readmePath, 'utf-8');

  const dateString = fileHandler
    .split('\n')
    .filter((it) => it.includes('date'))[0]
    .split(':')[1];
  const date = dateString !== '' ? new Date(dateString) : null;

  const barSplit = fileHandler.split('---');
  const descriptionString = barSplit[barSplit.length - 1];
  const description = descriptionString !== '' ? descriptionString : null;

  return { date, description };
}

function _sortCategoriesByDate(obj) {
  const sortedEntries = Object.entries(obj).sort(([, lObj], [, rObj]) => {
    const lDate = lObj.meta?.date;
    const rDate = rObj.meta?.date;

    if (!lDate && !rDate) {
      return -1;
    } else if (!lDate && rDate) {
      return 1;
    } else if (lDate && !rDate) {
      return -1;
    } else {
      if (lDate.getDate() === rDate.getDate()) {
        return 0;
      }

      const comp = lDate > rDate;
      return comp ? 1 : -1;
    }
  });

  return Object.fromEntries(sortedEntries);
}

function _getCategoriesInformation(root, d = 2) {
  if (d === 0) return {};

  const categoriesFolders = fs
    .readdirSync(root)
    .filter((entity) => _isPathFolder(root + entity));

  let structure = {};
  for (const folderName of categoriesFolders) {
    const relativeFolderPath = root + folderName + '/';
    structure[folderName] = {};

    const entities = fs.readdirSync(relativeFolderPath);
    if (entities.includes('README.md')) {
      structure[folderName]['meta'] = _getFolderInformationFromReadme(
        relativeFolderPath + '/README.md',
      );
    }

    const subfolderInformation = _getCategoriesInformation(
      relativeFolderPath,
      d - 1,
    );
    structure[folderName]['folders'] = subfolderInformation;

    const hasIndex = entities.includes('index.js');
    structure[folderName]['hasIndex'] = entities.includes('index.js');

    if (!hasIndex) {
      structure[folderName]['files'] = entities.filter(
        (entity) =>
          !_isPathFolder(relativeFolderPath + entity) && entity.endsWith('.js'),
      );
    } else {
      structure[folderName]['files'] = [];
    }
  }
  return _sortCategoriesByDate(structure);
}

function getCategoriesInformation() {
  return _getCategoriesInformation(ROOT);
}

function _capitalize(word) {
  return word[0].toUpperCase() + word.substr(1).toLowerCase();
}

function getCategories() {
  return Object.keys(_getCategoriesInformation(ROOT)).map((fname) => {
    if (fname.includes('-')) {
      return fname
        .split('-')
        .map((word) => _capitalize(word))
        .join(' ');
    }

    return _capitalize(fname);
  });
}

function _getImportablePaths(root) {
  const categories = _getCategoriesInformation(root);
  let store = [];

  for (const category in categories) {
    const catObj = categories[category];
    if (catObj.hasIndex) {
      store.push(root + category + '/index.js');
    }

    if (catObj.folders.length !== 0) {
      store.push(..._getImportablePaths(root + category + '/'));
    }

    if (catObj.files.length !== 0) {
      store.push(
        ...catObj.files
          .filter((file) => file.endsWith('.js'))
          .map((file) => root + category + '/' + file),
      );
    }
  }

  return store;
}

function getImportablePaths() {
  return _getImportablePaths(ROOT).map((absFilePath) =>
    path.relative(ABS_AUTH_PATH, absFilePath),
  );
}

module.exports = {
  getCategories,
  getCategoriesInformation,
  getImportablePaths,
};
