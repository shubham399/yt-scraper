'use strict';
module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define('Video', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    metaData: DataTypes.JSON
  }, {});
  Video.associate = function (models) {
    // associations can be defined here
  };
  return Video;
};