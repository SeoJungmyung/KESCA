'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('events', [
      {
        id: uuidv4(),
        title: 'KESCA Founding Meeting',
        description: 'The inaugural meeting of the Kitchen Exhaust Systems Cleaners Association of Canada. All founding members welcome.',
        starts_at: new Date('2026-12-01T18:00:00Z'),
        ends_at: new Date('2026-12-01T20:00:00Z'),
        location: 'Online',
        url: 'https://meet.google.com/kesca-founding',
      },
      {
        id: uuidv4(),
        title: 'Kitchen Fire Prevention Webinar',
        description: 'An educational webinar on preventing kitchen fires through proper exhaust system maintenance. Free for all restaurant owners.',
        starts_at: new Date('2027-01-15T17:00:00Z'),
        ends_at: new Date('2027-01-15T18:30:00Z'),
        location: 'Online',
        url: 'Zoom link TBD',
      },
      {
        id: uuidv4(),
        title: 'Annual Industry Conference',
        description: 'KESCA\'s first annual conference bringing together certified technicians, supervisors, and inspectors from across Canada.',
        starts_at: new Date('2027-03-20T09:00:00Z'),
        ends_at: new Date('2027-03-20T17:00:00Z'),
        location: 'Toronto Convention Centre',
        url: null,
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('events', null, {});
  },
};
