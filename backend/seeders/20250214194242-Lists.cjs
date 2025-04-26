'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('list', [
      {
        title: 'ToDo',
        position: 65535,
        boardId: 1
      },
      {
        title: 'Doing',
        position: 65535 * 2,
        boardId: 1
      },
      {
        title: 'Done',
        position: 65535 * 3,
        boardId: 1
      },
      {
        title: 'ToDo',
        position: 65535,
        boardId: 2
      },
      {
        title: 'Doing',
        position: 65535 * 2,
        boardId: 2
      },
      {
        title: 'Done',
        position: 65535 * 3,
        boardId: 2
      },
      {
        title: 'ToDo',
        position: 65535,
        boardId: 3
      },
      {
        title: 'Doing',
        position: 65535 * 2,
        boardId: 3
      },
      {
        title: 'Done',
        position: 65535 * 3,
        boardId: 3
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('list', null, {})
  }
}
