const { DataTypes } = require("sequelize");
const db = require("../configs/Database");

const News = db.define(
  "news",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sub_title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    path_image: {
      type: DataTypes.STRING,
    },
  },
  { freezeTableName: true }
);

module.exports = News;
