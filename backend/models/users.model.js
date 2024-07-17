const {DataTypes} = require('sequelize');
module.exports = (sequelize) => {
    const user = sequelize.define('user', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            defaultValue: "N/A",
            allowNull: true
        },
        age: {
            type: DataTypes.STRING,
            defaultValue: "N/A"
        },
        height: {
            type: DataTypes.STRING,
            defaultValue: "N/A"
        },
        weight: {
            type: DataTypes.STRING,
            defaultValue: "N/A"
        },
        bloodPressure: {
            type: DataTypes.STRING,
            defaultValue: "N/A"
        }
    });

    return user;
}
