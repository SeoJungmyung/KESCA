const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Enrollment = sequelize.define('Enrollment', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    course_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    paid_by: {
      type: DataTypes.ENUM('owner', 'employer'),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('enrolled', 'completed'),
      defaultValue: 'enrolled',
    },
    completed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: 'enrollments',
    timestamps: true,
  });
  return Enrollment;
};
