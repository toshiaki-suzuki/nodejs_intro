'use strict';
const Sequelize = require('sequelize');

/** users テーブルのモデルを定義する */
module.exports = (sequelize) => {
  // define() の第1引数がテーブル名
  // 第2引数のキーが、モデルのプロパティ名になり、実際のテーブルのカラム名は field プロパティで示す
  const User = sequelize.define('Users', {
    id: { field: 'id',
          type: Sequelize.DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          unique: true },
    name: { field: 'name',
            type: Sequelize.DataTypes.STRING,
            allowNull: false },
    password: { field: 'password',
                type: Sequelize.DataTypes.STRING,
                allowNull: false },
    mail: { field: 'mail',
            type: Sequelize.DataTypes.STRING,
            allowNull: true },
  });
  // テーブルがなければ作成し、同期する
  User.sync();
  // モデルを返す
  return User;
};