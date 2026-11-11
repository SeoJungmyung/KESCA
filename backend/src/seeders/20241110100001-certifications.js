'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('certifications', [
      {
        id: uuidv4(),
        name: 'Technician',
        level: 'Technician',
        description: 'Certified to clean kitchen exhaust systems',
      },
      {
        id: uuidv4(),
        name: 'Supervisor',
        level: 'Supervisor',
        description: 'Certified to supervise cleaning operations and lead a crew',
      },
      {
        id: uuidv4(),
        name: 'Inspector',
        level: 'Inspector',
        description: 'Certified to inspect kitchen exhaust systems and issue reports',
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('certifications', null, {});
  },
};
