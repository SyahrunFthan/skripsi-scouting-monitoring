const { DataTypes } = require("sequelize");
const db = require("../configs/Database");
const Contributions = require("./Contributions");

const ImagesContribution = db.define(
  "images",
  {
    id_image: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    contribution_id: {
      type: DataTypes.STRING,
    },
    image_name: {
      type: DataTypes.STRING,
    },
    image_path: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

Contributions.hasMany(ImagesContribution, {
  foreignKey: "contribution_id",
  as: "images",
});
ImagesContribution.belongsTo(Contributions, {
  foreignKey: "contribution_id",
  as: "contributions",
  onDelete: "CASCADE",
});

module.exports = ImagesContribution;
