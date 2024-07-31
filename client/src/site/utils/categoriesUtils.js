import fs from 'fs';

function isPathFolder(path) {
  const pathInfo = fs.statSync(path);
  return !pathInfo.isFile();
}

function getFolderInformationFromReadme(readmePath) {
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

function getCategoriesInformation(root, d = 2) {
  if (d == 0) return {};

  const categoriesFolders = fs
    .readdirSync(root)
    .filter((entity) => isPathFolder(root + entity));

  let structure = {};
  for (const folderName of categoriesFolders) {
    const relativeFolderPath = root + folderName + '/';
    structure[folderName] = {};

    const entities = fs.readdirSync(relativeFolderPath);
    if (entities.includes('README.md')) {
      structure[folderName]['meta'] = getFolderInformationFromReadme(
        relativeFolderPath + '/README.md',
      );
    }

    const subfolderInformation = getCategoriesInformation(
      relativeFolderPath,
      d - 1,
    );
    structure[folderName]['folders'] = subfolderInformation;

    const hasIndex = entities.includes('index.js');
    structure[folderName]['hasIndex'] = entities.includes('index.js');

    if (!hasIndex) {
      structure[folderName]['files'] = entities.filter(
        (entity) =>
          !isPathFolder(relativeFolderPath + entity) && entity.endsWith('.js'),
      );
    }
  }
  return structure;
}

function capitalize(word) {
  return word[0].toUpperCase() + word.substr(1).toLowerCase();
}

export function getCategories() {
  return Object.keys(getCategoriesInformation('./src/categories/')).map(
    (fname) => {
      if (fname.includes('-')) {
        return fname
          .split('-')
          .map((word) => capitalize(word))
          .join(' ');
      }

      return capitalize(fname);
    },
  );
}

export function getImportablePaths() {
  const info = getCategoriesInformation('./src/categories/');

  // indexable
  //  - previous key + key
  //  - look for non-indexable files
  //  - traverse
  // non-indexable
  //
  console.log(info);
}
