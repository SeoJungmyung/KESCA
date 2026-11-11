const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const GalleryItem = sequelize.define('GalleryItem', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    business_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    before_image_url: {
      type: DataTypes.STRING,
    },
    after_image_url: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.FLOAT,
    },
    longitude: {
      type: DataTypes.FLOAT,
    },
    kml_ref: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'gallery_items',
    timestamps: true,
  });
  return GalleryItem;
};
