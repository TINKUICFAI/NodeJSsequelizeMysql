const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    landmark: { type: DataTypes.STRING, allowNull: false },
    state: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: false },
    pincode: { type: DataTypes.INTEGER, allowNull: false },
  };
  const options = {
    scopes: {
        // include hash with this scope
        withHash: { attributes: {}, }
    }
};

  return sequelize.define("Address", attributes, options);
}
