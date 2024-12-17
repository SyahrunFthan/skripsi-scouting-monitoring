const { DataTypes } = require("sequelize");
const db = require("../configs/Database");
const Schools = require("./Schools");
const Activities = require("./Activities");

const Contributions = db.define(
  "contributions",
  {
    id_contribution: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      validate: {
        notEmpty: true,
      },
    },
    school_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activity_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

Contributions.belongsTo(Schools, {
  foreignKey: "school_id",
  as: "school",
  onDelete: "CASCADE",
});
Contributions.belongsTo(Activities, {
  foreignKey: "activity_id",
  as: "activity",
  onDelete: "CASCADE",
});

module.exports = Contributions;
