'use strict';
const { makeSampleArticleDataList } = require('../utill/generateData/generateArticleSeed');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Articles', makeSampleArticleDataList(), {});
  },
  down: async (queryInterface, Sequelize) => {

  }
};
