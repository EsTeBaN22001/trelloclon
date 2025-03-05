'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.dropTable('card')
    await queryInterface.createTable('card', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      listId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'list',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      position: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('card')
  }
}
