const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const medicine = sequelize.define('medicine', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: DataTypes.STRING,
    });
    return medicine
}
