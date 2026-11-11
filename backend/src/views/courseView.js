exports.single = (c) => ({
  id: c.id,
  title: c.title,
  level: c.level,
  description: c.description,
  price_cents: c.price_cents,
  is_free: c.is_free,
  certification: c.certification
    ? { id: c.certification.id, name: c.certification.name, level: c.certification.level }
    : null,
});

exports.list = (courses) => courses.map(exports.single);
