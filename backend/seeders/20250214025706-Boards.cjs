'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('board', [
      {
        title: 'Board 1',
        backgroundColor: 'sky'
      },
      {
        title: 'Board 2',
        backgroundColor: 'green'
      },
      {
        title: 'Board 3',
        backgroundColor: 'yellow'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('board', null, {})
  }
}
