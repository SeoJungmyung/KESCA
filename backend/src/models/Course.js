const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Course = sequelize.define('Course', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price_cents: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    is_free: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    certification_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  }, {
    tableName: 'courses',
    timestamps: false,
  });
  return Course;
};
