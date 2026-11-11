const router = require('express').Router();
const businessController = require('../controllers/businessController');
const auth = require('../middlewares/auth');
const adminOnly = require('../middlewares/adminOnly');

router.get('/', businessController.list);
router.get('/map', businessController.getMapPins);
router.get('/:id', businessController.getOne);
router.post('/', auth, adminOnly, businessController.create);
router.put('/:id', auth, adminOnly, businessController.update);
router.delete('/:id', auth, adminOnly, businessController.destroy);

module.exports = router;
