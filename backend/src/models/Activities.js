const { DataTypes } = require("sequelize");
const db = require("../configs/Database");

const Activities = db.define(
  "activities",
  {
    id_activity: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.STRING,
    },
    points: {
      type: DataTypes.INTEGER,
    },
    scale_activity: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Activities;
