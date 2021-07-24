'use strict';
module.exports = (sequelize, DataTypes) => {
  const Creds = sequelize.define('Creds', {
    key: DataTypes.STRING, // Will like to encrypt this and store in DB.
    active: DataTypes.BOOLEAN 
  }, {});
  Creds.associate = function (models) {
    // associations can be defined here
  };
  return Creds;
};