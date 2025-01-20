"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Type.hasMany(models.Car, { foreignKey: "TypeId" });
    }
  }
  Type.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name Type is required",
          },
          notEmpty: {
            msg: "Name Type is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Type",
    }
  );
  return Type;
};
