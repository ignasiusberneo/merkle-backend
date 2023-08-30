const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Guest = sequelize.define('Guest', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^\+?[0-9]{6,}$/i, // Regular expression to validate phone number
          msg: 'Invalid phone number format',
        },
      },
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  return Guest;
};
