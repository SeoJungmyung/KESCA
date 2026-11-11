const { Certification } = require('../models');

/**
 * Returns all certification levels.
 */
exports.getCertificationLevels = async () => {
  return Certification.findAll({ order: [['level', 'ASC']] });
};

/**
 * Stub: verify a certificate by code. Returns null until implemented.
 * @param {string} code
 */
exports.verifyCertificate = async (code) => {
  // TODO: implement certificate verification logic
  return null;
};
