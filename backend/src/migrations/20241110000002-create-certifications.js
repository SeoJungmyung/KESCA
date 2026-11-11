'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('certifications', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      level: {
        type: Sequelize.ENUM('Technician', 'Supervisor', 'Inspector'),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('certifications');
  },
};
