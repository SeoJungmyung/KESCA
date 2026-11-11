const { Standard, Course } = require('../models');
const standardView = require('../views/standardView');
const courseView = require('../views/courseView');

exports.list = async (req, res, next) => {
  try {
    const standards = await Standard.findAll({ order: [['category', 'ASC'], ['title', 'ASC']] });
    res.json(standardView.list(standards));
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const standard = await Standard.findByPk(req.params.id);
    if (!standard) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Standard not found.' } });
    }
    // Include related courses by level/category match
    const courses = await Course.findAll({ where: { level: standard.category } });
    res.json({ ...standardView.single(standard), courses: courseView.list(courses) });
  } catch (err) {
    next(err);
  }
};
