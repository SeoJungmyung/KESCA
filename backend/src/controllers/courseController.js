const { Course, Certification, Enrollment } = require('../models');
const courseView = require('../views/courseView');
const { requireFields } = require('../utils/validate');

exports.list = async (req, res, next) => {
  try {
    const courses = await Course.findAll({
      include: [{ model: Certification, as: 'certification', required: false }],
      order: [['title', 'ASC']],
    });
    res.json(courseView.list(courses));
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.id, {
      include: [{ model: Certification, as: 'certification', required: false }],
    });
    if (!course) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Course not found.' } });
    }
    res.json(courseView.single(course));
  } catch (err) {
    next(err);
  }
};

exports.enroll = async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Course not found.' } });
    }
    requireFields(req.body, ['paid_by']);
    const { paid_by } = req.body;

    const existing = await Enrollment.findOne({
      where: { user_id: req.user.id, course_id: course.id },
    });
    if (existing) {
      return res.status(409).json({ error: { code: 'ALREADY_ENROLLED', message: 'Already enrolled in this course.' } });
    }

    const enrollment = await Enrollment.create({
      user_id: req.user.id,
      course_id: course.id,
      paid_by,
      status: 'enrolled',
    });

    res.status(201).json({ id: enrollment.id, course_id: course.id, status: enrollment.status });
  } catch (err) {
    next(err);
  }
};
