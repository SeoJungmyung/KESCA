exports.single = (g) => ({
  id: g.id,
  title: g.title,
  business_id: g.business_id,
  before_image_url: g.before_image_url,
  after_image_url: g.after_image_url,
  latitude: g.latitude,
  longitude: g.longitude,
  kml_ref: g.kml_ref,
  createdAt: g.createdAt,
});

exports.list = (items) => items.map(exports.single);
