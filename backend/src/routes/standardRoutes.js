const router = require('express').Router();
const standardController = require('../controllers/standardController');

router.get('/', standardController.list);
router.get('/:id', standardController.getOne);

module.exports = router;
