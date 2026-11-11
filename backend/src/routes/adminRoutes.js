const router = require('express').Router();
const adminController = require('../controllers/adminController');
const auth = require('../middlewares/auth');
const adminOnly = require('../middlewares/adminOnly');

router.get('/content/:slug', adminController.getContentPage);
router.put('/content/:slug', auth, adminOnly, adminController.upsertContentPage);
router.get('/partners', adminController.listPartners);
router.post('/partners', auth, adminOnly, adminController.createPartner);

module.exports = router;
