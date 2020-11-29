'use strict';
const Sequelize = require('sequelize');

/** users テーブルのモデルを定義する */
module.exports = (sequelize) => {
  // define() の第1引数がテーブル名
  // 第2引数のキーが、モデルのプロパティ名になり、実際のテーブルのカラム名は field プロパティで示す
  const Article = sequelize.define('Articles', {
    id: { field: 'id',
          type: Sequelize.DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          unique: true },
    title: { field: 'title',
            type: Sequelize.DataTypes.STRING,
            allowNull: false },
    content: { 
              field: 'content',
              type: Sequelize.DataTypes.STRING,
              allowNull: false },
    user_id: { 
              field: 'user_id',
              type: Sequelize.DataTypes.UUID,
              allowNull: false,
              references: {
                model: 'Users',
                key: 'id',
              }},
  });
  // テーブルがなければ作成し、同期する
  Article.sync();
  // モデルを返す
  return Article;
};