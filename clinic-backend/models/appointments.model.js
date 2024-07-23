const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    const appointment = sequelize.define('appointment', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        date: {
            type: DataTypes.STRING,            
        },
        complaints: {
            type: DataTypes.ARRAY(DataTypes.JSON),
            allowNull: true
        },
        diagnosis: {
            type: DataTypes.STRING,
            allowNull: true
        },
        symptoms: {
            type: DataTypes.STRING,
            allowNull: true   
        },
        advice: {
            type: DataTypes.STRING,
            allowNull: true
        },
        facility: {
            type: DataTypes.STRING,
            allowNull: true
        },
        medicines: {
            type: DataTypes.ARRAY(DataTypes.JSON),
            allowNull: true
        }
    });
    
    return appointment
}
