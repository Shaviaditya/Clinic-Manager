const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const sequelize = new Sequelize(config.database,config.username,config.password,config) 

const models = [
  require('./users.model')(sequelize),
  require('./appointments.model')(sequelize),
  require('./medicines.model')(sequelize)
]

const {
  models: {
    user,
    appointment,
    medicine
  }
} = sequelize;

user.hasMany(appointment, {
  foreignKey: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  onDelete: 'CASCADE'
});
appointment.belongsTo(user)

module.exports = {sequelize , models}