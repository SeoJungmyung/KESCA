const certificationService = require('../services/certificationService');
const { Certification } = require('../models');

exports.list = async (req, res, next) => {
  try {
    const certifications = await certificationService.getCertificationLevels();
    res.json(certifications);
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const cert = await Certification.findByPk(req.params.id);
    if (!cert) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Certification not found.' } });
    }
    res.json(cert);
  } catch (err) {
    next(err);
  }
};

exports.verify = async (req, res, next) => {
  try {
    const { code } = req.params;
    const result = await certificationService.verifyCertificate(code);
    if (!result) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Certificate not found.' } });
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
};
