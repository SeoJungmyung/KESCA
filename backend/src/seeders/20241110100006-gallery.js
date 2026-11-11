'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    await queryInterface.bulkInsert('gallery_items', [
      {
        id: uuidv4(),
        title: 'Commercial Hood Restoration — Toronto Restaurant',
        business_id: null,
        before_image_url: '/images/before-placeholder.jpg',
        after_image_url: '/images/after-placeholder.jpg',
        latitude: 43.6510,
        longitude: -79.3470,
        kml_ref: null,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        title: 'Grease Duct Deep Clean — Scarborough',
        business_id: null,
        before_image_url: '/images/before-placeholder.jpg',
        after_image_url: '/images/after-placeholder.jpg',
        latitude: 43.7731,
        longitude: -79.2578,
        kml_ref: null,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('gallery_items', null, {});
  },
};
