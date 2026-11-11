const router = require('express').Router();
const galleryController = require('../controllers/galleryController');
const auth = require('../middlewares/auth');
const adminOnly = require('../middlewares/adminOnly');
const upload = require('../utils/upload');

router.get('/', galleryController.list);
router.get('/:id', galleryController.getOne);
router.post(
  '/',
  auth,
  adminOnly,
  upload.fields([
    { name: 'before_image', maxCount: 1 },
    { name: 'after_image', maxCount: 1 },
  ]),
  galleryController.create
);

module.exports = router;
