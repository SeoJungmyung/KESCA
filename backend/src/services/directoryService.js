const { Business, Certification } = require('../models');
const { Op } = require('sequelize');
const { paginate } = require('../utils/pagination');

/**
 * Query businesses with optional filters.
 * @param {{ province?: string, q?: string, certified?: boolean, page?: number, limit?: number }} opts
 */
exports.getBusinesses = async ({ province, q, certified, page, limit } = {}) => {
  const where = {};
  if (province) where.province = province;
  if (typeof certified !== 'undefined') where.certified = certified === true || certified === 'true';
  if (q) {
    where[Op.or] = [
      { name: { [Op.like]: `%${q}%` } },
      { city: { [Op.like]: `%${q}%` } },
      { services: { [Op.like]: `%${q}%` } },
    ];
  }
  const { limit: lim, offset } = paginate({ page, limit });
  return Business.findAndCountAll({
    where,
    include: [{ model: Certification, as: 'certification', required: false }],
    limit: lim,
    offset,
    order: [['name', 'ASC']],
  });
};

/**
 * Returns businesses with lat/lng only (for map pins).
 * @param {string} [type]
 */
exports.getMapPins = async (type) => {
  const where = {};
  if (type === 'certified') where.certified = true;
  return Business.findAll({
    where,
    attributes: ['id', 'name', 'latitude', 'longitude', 'certified'],
    order: [['name', 'ASC']],
  });
};
