const router = require('express').Router();
const courseController = require('../controllers/courseController');
const auth = require('../middlewares/auth');

router.get('/', courseController.list);
router.get('/:id', courseController.getOne);
router.post('/:id/enroll', auth, courseController.enroll);

module.exports = router;
