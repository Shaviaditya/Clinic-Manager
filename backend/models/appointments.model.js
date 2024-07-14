const { DataTypes } = require('sequelize');
const complaints = {
    chiefComplaints: DataTypes.STRING,
    clincialFindings: DataTypes.STRING
}
const medicines = {
    name: DataTypes.STRING,
    dosage: DataTypes.STRING,
    duration: DataTypes.STRING,
    quantity: DataTypes.STRING
}
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
        complaints: {
            type: DataTypes.ARRAY((DataTypes.JSON)(complaints)),
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
            type: DataTypes.ARRAY((DataTypes.JSON)(medicines)),
            allowNull: true
        }
    });
    
    return appointment
}
