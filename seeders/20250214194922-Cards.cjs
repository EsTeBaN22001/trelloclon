'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('card', [
      {
        title: 'Card-1',
        listId: 1,
        position: 65535,
        description: 'Card description'
      },
      {
        title: 'Card-2',
        listId: 1,
        position: 65535 * 2,
        description: 'Card description'
      },
      {
        title: 'Card-3',
        listId: 1,
        position: 65535 * 3,
        description: 'Card description'
      },
      {
        title: 'Card-1',
        listId: 2,
        position: 65535,
        description: 'Card description'
      },
      {
        title: 'Card-2',
        listId: 2,
        position: 65535 * 2,
        description: 'Card description'
      },
      {
        title: 'Card-3',
        listId: 2,
        position: 65535 * 3,
        description: 'Card description'
      },
      {
        title: 'Card-1',
        listId: 3,
        position: 65535,
        description: 'Card description'
      },
      {
        title: 'Card-2',
        listId: 3,
        position: 65535 * 2,
        description: 'Card description'
      },
      {
        title: 'Card-3',
        listId: 3,
        position: 65535 * 3,
        description: 'Card description'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('card', null, {})
  }
}
