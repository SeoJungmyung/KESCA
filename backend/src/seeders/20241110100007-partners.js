'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('partners', [
      {
        id: uuidv4(),
        name: 'Friendly Green Giant',
        url: 'https://www.friendlygreengiant.ca',
        logo_url: null,
      },
      {
        id: uuidv4(),
        name: 'Air Advocates',
        url: 'https://www.airadvocates.net',
        logo_url: null,
      },
      {
        id: uuidv4(),
        name: 'Slumlord Patrol',
        url: 'https://www.slumlordpatrol.com',
        logo_url: null,
      },
      {
        id: uuidv4(),
        name: 'Strongpoint Adventures',
        url: 'https://www.strongpointadventures.com',
        logo_url: null,
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('partners', null, {});
  },
};
