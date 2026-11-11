const router = require('express').Router();
const inquiryController = require('../controllers/inquiryController');
const auth = require('../middlewares/auth');
const adminOnly = require('../middlewares/adminOnly');

router.post('/', inquiryController.create);
router.get('/', auth, adminOnly, inquiryController.list);

module.exports = router;
