const { ContentPage, Partner } = require('../models');
const { requireFields } = require('../utils/validate');

// --- Content Pages ---

exports.getContentPage = async (req, res, next) => {
  try {
    const page = await ContentPage.findOne({ where: { slug: req.params.slug } });
    if (!page) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Content page not found.' } });
    }
    res.json({ id: page.id, slug: page.slug, title: page.title, body: page.body });
  } catch (err) {
    next(err);
  }
};

exports.upsertContentPage = async (req, res, next) => {
  try {
    requireFields(req.body, ['title', 'body']);
    const { slug } = req.params;
    const [page, created] = await ContentPage.findOrCreate({
      where: { slug },
      defaults: { title: req.body.title, body: req.body.body },
    });
    if (!created) {
      await page.update({ title: req.body.title, body: req.body.body });
    }
    res.status(created ? 201 : 200).json({ id: page.id, slug: page.slug, title: page.title, body: page.body });
  } catch (err) {
    next(err);
  }
};

// --- Partners ---

exports.listPartners = async (req, res, next) => {
  try {
    const partners = await Partner.findAll({ order: [['name', 'ASC']] });
    res.json(partners);
  } catch (err) {
    next(err);
  }
};

exports.createPartner = async (req, res, next) => {
  try {
    requireFields(req.body, ['name']);
    const partner = await Partner.create(req.body);
    res.status(201).json(partner);
  } catch (err) {
    next(err);
  }
};
