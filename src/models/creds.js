'use strict';
module.exports = (sequelize, DataTypes) => {
  const Creds = sequelize.define('Creds', {
    key: {
      type: DataTypes.STRING, // TODO:  Encrypt and store.
      unique: true,
      allowNull: false
    },
    active: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, {});
  Creds.associate = function (models) {
    // associations can be defined here
  };
  return Creds;
};