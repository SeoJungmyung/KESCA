const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Standard = sequelize.define('Standard', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
    },
    category: {
      type: DataTypes.ENUM('cleaning', 'inspection', 'maintenance'),
      allowNull: false,
    },
  }, {
    tableName: 'standards',
    timestamps: false,
  });
  return Standard;
};
