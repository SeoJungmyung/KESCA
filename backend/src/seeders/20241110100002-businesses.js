'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface) {
    // Resolve certification IDs by name
    const certs = await queryInterface.sequelize.query(
      "SELECT id, level FROM certifications",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    const certByLevel = {};
    for (const c of certs) certByLevel[c.level] = c.id;

    const now = new Date();
    await queryInterface.bulkInsert('businesses', [
      {
        id: uuidv4(),
        name: 'Ontario Exhaust Pros',
        province: 'Ontario',
        city: 'Toronto',
        address: '100 King St W, Toronto, ON',
        latitude: 43.6532,
        longitude: -79.3832,
        phone: '416-555-0101',
        email: 'info@ontarioexhaustpros.ca',
        website: 'https://www.ontarioexhaustpros.ca',
        services: 'Kitchen exhaust cleaning, fan servicing',
        certified: true,
        certification_id: certByLevel['Technician'],
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        name: 'Clean Ducts Inc',
        province: 'Ontario',
        city: 'Ottawa',
        address: '200 Rideau St, Ottawa, ON',
        latitude: 45.4215,
        longitude: -75.6972,
        phone: '613-555-0202',
        email: 'info@cleanductsinc.ca',
        website: 'https://www.cleanductsinc.ca',
        services: 'Duct cleaning, grease removal, crew supervision',
        certified: true,
        certification_id: certByLevel['Supervisor'],
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        name: 'GrillGuard Services',
        province: 'Ontario',
        city: 'Hamilton',
        address: '50 James St N, Hamilton, ON',
        latitude: 43.2557,
        longitude: -79.8711,
        phone: '905-555-0303',
        email: 'info@grillguard.ca',
        website: 'https://www.grillguard.ca',
        services: 'Exhaust cleaning, hood servicing',
        certified: true,
        certification_id: certByLevel['Technician'],
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        name: 'Exhaust Masters',
        province: 'Ontario',
        city: 'London',
        address: '300 Dundas St, London, ON',
        latitude: 42.9849,
        longitude: -81.2453,
        phone: '519-555-0404',
        email: 'info@exhaustmasters.ca',
        website: 'https://www.exhaustmasters.ca',
        services: 'Exhaust cleaning, maintenance',
        certified: false,
        certification_id: null,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        name: 'VentRight Solutions',
        province: 'Ontario',
        city: 'Mississauga',
        address: '400 Hurontario St, Mississauga, ON',
        latitude: 43.5890,
        longitude: -79.6441,
        phone: '905-555-0505',
        email: 'info@ventright.ca',
        website: 'https://www.ventright.ca',
        services: 'Exhaust inspection, compliance reports',
        certified: true,
        certification_id: certByLevel['Inspector'],
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        name: 'ProClean Exhaust',
        province: 'Ontario',
        city: 'Brampton',
        address: '500 Queen St E, Brampton, ON',
        latitude: 43.7315,
        longitude: -79.7624,
        phone: '905-555-0606',
        email: 'info@procleanexhaust.ca',
        website: 'https://www.procleanexhaust.ca',
        services: 'Kitchen hood cleaning, grease trap cleaning',
        certified: true,
        certification_id: certByLevel['Technician'],
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('businesses', null, {});
  },
};
