const { DataTypes } = require('sequelize');
// const complaints = {
//     chiefComplaints: DataTypes.STRING,
//     clinicalFindings: DataTypes.STRING
// }
// const medicines = {
//     name: DataTypes.STRING,
//     dosage: DataTypes.STRING,
//     duration: DataTypes.STRING,
//     quantity: DataTypes.STRING
// }
module.exports = (sequelize) => {
    const appointment = sequelize.define('appointment', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        date: {
            type: DataTypes.DATE,            
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
