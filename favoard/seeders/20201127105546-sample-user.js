'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'John Doe',
        pass: 'password',
        mail: 'example@email.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jane Doe',
        pass: 'password',
        mail: 'example@email.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jack Doe',
        pass: 'password',
        mail: 'example@email.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Joh Doe',
        pass: 'password',
        mail: 'example@email.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {

  }
};
