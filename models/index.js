'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
require('dotenv').config();

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;

if (config.use_env_variable) {
  // Uses DATABASE_URL (good for local, Heroku, Neon, etc.)
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else if (config.url) {
  // Directly uses "url" key if provided in config.js
  sequelize = new Sequelize(config.url, config);
} else {
  // Fallback to explicit database credentials
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// Load all model files in this directory
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

// Run associations if any
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Attach Sequelize and sequelize instance
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
