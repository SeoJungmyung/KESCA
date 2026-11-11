exports.single = (e) => ({
  id: e.id,
  title: e.title,
  description: e.description,
  starts_at: e.starts_at,
  ends_at: e.ends_at,
  location: e.location,
  url: e.url,
});

exports.list = (events) => events.map(exports.single);
