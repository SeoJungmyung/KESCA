exports.single = (s) => ({
  id: s.id,
  title: s.title,
  body: s.body,
  category: s.category,
});

exports.list = (standards) => standards.map(exports.single);
