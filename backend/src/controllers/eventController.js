const { Event } = require('../models');
const eventView = require('../views/eventView');
const { Op } = require('sequelize');

exports.list = async (req, res, next) => {
  try {
    const events = await Event.findAll({
      where: { starts_at: { [Op.gte]: new Date() } },
      order: [['starts_at', 'ASC']],
    });
    res.json(eventView.list(events));
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Event not found.' } });
    }
    res.json(eventView.single(event));
  } catch (err) {
    next(err);
  }
};
