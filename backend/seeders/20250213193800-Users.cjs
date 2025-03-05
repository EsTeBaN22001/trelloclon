'use strict'

const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user', [
      {
        name: 'Armando Esteban Quito',
        email: 'esteban1.redon2@gmail.com',
        password: await bcrypt.hash('esteban22001', 5),
        avatar: 'https://pic.onlinewebfonts.com/thumbnails/icons_110805.svg'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', null, {})
  }
}
