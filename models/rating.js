'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
  static associate(models) {
    // Rating given by a user (rater)
    this.belongsTo(models.User, { foreignKey: 'rater_id', as: 'rater' });

    // Rating received by a user (rated)
    this.belongsTo(models.User, { foreignKey: 'rated_id', as: 'rated' });
  }
}

  Rating.init({
    rating_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    rater_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    rated_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    job_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    rating: DataTypes.INTEGER,
    review: DataTypes.TEXT,
    created_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Rating',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  });
  return Rating;
};
