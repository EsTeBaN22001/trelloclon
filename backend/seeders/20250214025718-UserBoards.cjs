'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('userboards', [
      {
        boardId: 1,
        userId: 1
      },
      {
        boardId: 2,
        userId: 1
      },
      {
        boardId: 3,
        userId: 1
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('userboards', null, {})
  }
}
