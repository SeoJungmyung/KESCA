const router = require('express').Router();
const eventController = require('../controllers/eventController');

router.get('/', eventController.list);
router.get('/:id', eventController.getOne);

module.exports = router;
