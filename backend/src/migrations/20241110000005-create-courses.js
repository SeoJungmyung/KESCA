'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('courses', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      level: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      price_cents: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      is_free: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      certification_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'certifications', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('courses');
  },
};
