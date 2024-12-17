const { DataTypes } = require("sequelize");
const db = require("../configs/Database");

const Schools = db.define(
  "schools",
  {
    id_school: {
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
    number_gudep: {
      type: DataTypes.CHAR(50),
    },
    total_participant: {
      type: DataTypes.INTEGER,
    },
    address: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.STRING,
    },
    path_image: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Schools;
