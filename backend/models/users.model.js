const {DataTypes} = require('sequelize');
module.exports = (sequelize) => {
    const user = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: DataTypes.STRING,
        phone: DataTypes.STRING,
        address: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    return user;
}
