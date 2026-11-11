'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('standards', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      body: {
        type: Sequelize.TEXT,
      },
      category: {
        type: Sequelize.ENUM('cleaning', 'inspection', 'maintenance'),
        allowNull: false,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('standards');
  },
};
