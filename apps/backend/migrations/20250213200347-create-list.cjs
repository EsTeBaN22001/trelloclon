'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.dropTable('list')
    await queryInterface.createTable('list', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING
      },
      position: {
        type: Sequelize.INTEGER
      },
      boardId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'board',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('list')
  }
}
