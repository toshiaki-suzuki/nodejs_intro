'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'Taro',
        pass: 'yamada',
        mail: 'Taro@yamada.jp',
        age: 39,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Hanako',
        pass: 'flower',
        mail: 'Hanako@flower.jp',
        age: 28,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jiro',
        pass: 'change',
        mail: 'Jiro@change.jp',
        age: 17,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sachi',
        pass: 'happy',
        mail: 'sachiko@happy.jp',
        age: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
