const { DataTypes } = require("sequelize");
const db = require("../configs/Database");

const Users = db.define(
  "users",
  {
    id_user: {
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
    email: {
      type: DataTypes.CHAR(50),
    },
    password: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    path_image: {
      type: DataTypes.STRING,
    },
    token: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Users;
