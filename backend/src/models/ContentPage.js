const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ContentPage = sequelize.define('ContentPage', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
    },
  }, {
    tableName: 'content_pages',
    timestamps: false,
  });
  return ContentPage;
};
