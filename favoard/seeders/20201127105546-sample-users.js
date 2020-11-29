'use strict';
const { makeSampleUserDataList } = require('../utill/generateData/generateUserSeed');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', makeSampleUserDataList(), {});
  },
  down: async (queryInterface, Sequelize) => {
  }
};
