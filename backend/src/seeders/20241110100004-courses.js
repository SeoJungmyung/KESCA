'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface) {
    // Resolve certification IDs by level
    const certs = await queryInterface.sequelize.query(
      "SELECT id, level FROM certifications",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    const certByLevel = {};
    for (const c of certs) certByLevel[c.level] = c.id;

    await queryInterface.bulkInsert('courses', [
      {
        id: uuidv4(),
        title: 'Kitchen Exhaust Cleaning Fundamentals',
        level: 'Technician',
        description: 'Learn the fundamentals of professional kitchen exhaust cleaning. Covers safety, equipment, grease removal techniques, and KESCA standards compliance.',
        price_cents: 29900,
        is_free: false,
        certification_id: certByLevel['Technician'],
      },
      {
        id: uuidv4(),
        title: 'Supervision and Safety Management',
        level: 'Supervisor',
        description: 'Master the skills needed to lead cleaning crews, manage job sites safely, and ensure compliance with KESCA supervisor standards.',
        price_cents: 39900,
        is_free: false,
        certification_id: certByLevel['Supervisor'],
      },
      {
        id: uuidv4(),
        title: 'Free Restaurant Owner Orientation',
        level: null,
        description: 'Learn why certified cleaning protects your restaurant. This free course covers fire hazards, insurance implications, and how to find KESCA-certified contractors.',
        price_cents: 0,
        is_free: true,
        certification_id: null,
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('courses', null, {});
  },
};
