const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const appointment = sequelize.define('appointment', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        date: {
            type: DataTypes.DATE,            
        },
        symptoms: {
            type: DataTypes.STRING,
            allowNull: true   
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        medicines: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true
        }
    });
    
    return appointment
}
