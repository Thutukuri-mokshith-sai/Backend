'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Rating, { foreignKey: 'rater_id', as: 'ratingsGiven' });

      // User can receive many ratings
      User.hasMany(models.Rating, { foreignKey: 'rated_id', as: 'ratingsReceived' });
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    role: DataTypes.STRING,
    address: DataTypes.TEXT,
    district: DataTypes.STRING,
    state: DataTypes.STRING,
    language: DataTypes.STRING,
    verified: DataTypes.BOOLEAN,
    otp: DataTypes.STRING,
    otp_expiry: DataTypes.DATE,
    created_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
    underscored: true, // Optional: converts camelCase to snake_case in DB
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  });
  return User;
};
