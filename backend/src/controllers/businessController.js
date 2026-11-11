const directoryService = require('../services/directoryService');
const { Business, Certification } = require('../models');
const businessView = require('../views/businessView');

exports.list = async (req, res, next) => {
  try {
    const { province, q, certified, page, limit } = req.query;
    const result = await directoryService.getBusinesses({ province, q, certified, page, limit });
    res.json({
      total: result.count,
      businesses: businessView.list(result.rows),
    });
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const business = await Business.findByPk(req.params.id, {
      include: [{ model: Certification, as: 'certification', required: false }],
    });
    if (!business) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Business not found.' } });
    }
    res.json(businessView.single(business));
  } catch (err) {
    next(err);
  }
};

exports.getMapPins = async (req, res, next) => {
  try {
    const { type } = req.query;
    const pins = await directoryService.getMapPins(type);
    res.json(pins.map(businessView.mapPin));
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const business = await Business.create(req.body);
    res.status(201).json(businessView.single(business));
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const business = await Business.findByPk(req.params.id);
    if (!business) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Business not found.' } });
    }
    await business.update(req.body);
    res.json(businessView.single(business));
  } catch (err) {
    next(err);
  }
};

exports.destroy = async (req, res, next) => {
  try {
    const business = await Business.findByPk(req.params.id);
    if (!business) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Business not found.' } });
    }
    await business.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
