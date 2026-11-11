const router = require('express').Router();
const certificationController = require('../controllers/certificationController');

router.get('/', certificationController.list);
router.get('/verify/:code', certificationController.verify);
router.get('/:id', certificationController.getOne);

module.exports = router;
