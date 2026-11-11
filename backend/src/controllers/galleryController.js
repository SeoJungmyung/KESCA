const { GalleryItem } = require('../models');
const galleryView = require('../views/galleryView');
const { requireFields } = require('../utils/validate');

exports.list = async (req, res, next) => {
  try {
    const items = await GalleryItem.findAll({ order: [['createdAt', 'DESC']] });
    res.json(galleryView.list(items));
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const item = await GalleryItem.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Gallery item not found.' } });
    }
    res.json(galleryView.single(item));
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    requireFields(req.body, ['title']);
    const data = { ...req.body };
    if (req.files) {
      if (req.files.before_image) data.before_image_url = `/uploads/${req.files.before_image[0].filename}`;
      if (req.files.after_image) data.after_image_url = `/uploads/${req.files.after_image[0].filename}`;
    }
    const item = await GalleryItem.create(data);
    res.status(201).json(galleryView.single(item));
  } catch (err) {
    next(err);
  }
};
