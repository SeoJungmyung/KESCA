const sequelize = require('../config/database');
const User = require('./User')(sequelize);
const Business = require('./Business')(sequelize);
const Certification = require('./Certification')(sequelize);
const Standard = require('./Standard')(sequelize);
const Course = require('./Course')(sequelize);
const Enrollment = require('./Enrollment')(sequelize);
const Event = require('./Event')(sequelize);
const GalleryItem = require('./GalleryItem')(sequelize);
const Inquiry = require('./Inquiry')(sequelize);
const ContentPage = require('./ContentPage')(sequelize);
const Partner = require('./Partner')(sequelize);

// Associations
Business.belongsTo(Certification, { foreignKey: 'certification_id', as: 'certification' });
Certification.hasMany(Business, { foreignKey: 'certification_id' });
Course.belongsTo(Certification, { foreignKey: 'certification_id', as: 'certification' });
Certification.hasMany(Course, { foreignKey: 'certification_id' });
Enrollment.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Enrollment.belongsTo(Course, { foreignKey: 'course_id', as: 'course' });
GalleryItem.belongsTo(Business, { foreignKey: 'business_id', as: 'business' });

module.exports = {
  sequelize,
  User,
  Business,
  Certification,
  Standard,
  Course,
  Enrollment,
  Event,
  GalleryItem,
  Inquiry,
  ContentPage,
  Partner,
};
