const { Inquiry } = require('../models');
const inquiryView = require('../views/inquiryView');
const mailService = require('../services/mailService');
const { requireFields } = require('../utils/validate');

exports.create = async (req, res, next) => {
  try {
    requireFields(req.body, ['name', 'email', 'message']);
    const { name, email, phone, message } = req.body;
    const inquiry = await Inquiry.create({ name, email, phone, message, status: 'new' });
    await mailService.sendInquiryNotification(inquiry);
    res.status(201).json(inquiryView.single(inquiry));
  } catch (err) {
    next(err);
  }
};

exports.list = async (req, res, next) => {
  try {
    const inquiries = await Inquiry.findAll({ order: [['createdAt', 'DESC']] });
    res.json(inquiryView.list(inquiries));
  } catch (err) {
    next(err);
  }
};
