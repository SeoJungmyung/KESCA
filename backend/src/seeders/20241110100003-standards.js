'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('standards', [
      {
        id: uuidv4(),
        title: 'KESCA Grease Removal Standard',
        body: 'All kitchen exhaust systems must be cleaned to bare metal. Grease accumulation must not exceed 2mm at any point in the duct system. Cleaning must be performed by a KESCA Certified Technician and documented with photographic evidence.',
        category: 'cleaning',
      },
      {
        id: uuidv4(),
        title: 'KESCA Inspection Standard',
        body: 'Before/After photos required as proof of service. Inspection reports must include system diagrams, grease levels measured at 10 or more points, and a compliance rating. Reports must be signed by a KESCA Certified Inspector.',
        category: 'inspection',
      },
      {
        id: uuidv4(),
        title: 'KESCA Preventative Maintenance Code',
        body: 'Regular scheduled maintenance prevents fire hazards. All kitchen exhaust systems in commercial kitchens must be serviced at minimum quarterly. High-volume operations (cooking 12+ hours/day) require monthly service intervals.',
        category: 'maintenance',
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('standards', null, {});
  },
};
