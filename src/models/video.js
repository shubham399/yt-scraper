'use strict';
module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define('Video', {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    metaData: DataTypes.JSON
  }, {
    indexes: [{
      name: 'title_index',
      using: 'BTREE',
      fields: ["title"]
    },
    {
      name: 'description_index',
      using: 'BTREE',
      fields: ["description"]
    }]
  });
  Video.associate = function (models) {
    // associations can be defined here
  };
  return Video;
};