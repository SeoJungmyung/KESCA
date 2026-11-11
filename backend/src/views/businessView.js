exports.single = (b) => ({
  id: b.id,
  name: b.name,
  province: b.province,
  city: b.city,
  address: b.address,
  latitude: b.latitude,
  longitude: b.longitude,
  phone: b.phone,
  email: b.email,
  website: b.website,
  services: b.services,
  certified: b.certified,
  certification: b.certification
    ? { id: b.certification.id, name: b.certification.name, level: b.certification.level }
    : null,
  createdAt: b.createdAt,
});

exports.list = (businesses) => businesses.map(exports.single);

exports.mapPin = (b) => ({
  id: b.id,
  name: b.name,
  latitude: b.latitude,
  longitude: b.longitude,
  certified: b.certified,
});
