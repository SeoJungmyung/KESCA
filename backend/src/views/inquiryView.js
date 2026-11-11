exports.single = (i) => ({
  id: i.id,
  name: i.name,
  email: i.email,
  phone: i.phone,
  message: i.message,
  status: i.status,
  createdAt: i.createdAt,
});

exports.list = (inquiries) => inquiries.map(exports.single);
