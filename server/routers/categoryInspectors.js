const express = require('express');
const {
  getCategories,
  getCategoriesInformation,
  getImportablePaths,
} = require('../utils/categoriesUtils');
const router = express.Router();

router.get('/', (_, res) => res.send(getCategories()));
router.get('/information', (_, res) =>
  res.send(getCategoriesInformation()),
);
router.get('/importable-paths', (_, res) => res.send(getImportablePaths()));

module.exports = router;
