'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "users", deps: []
 * createTable "appointments", deps: [users]
 *
 **/

var info = {
    "revision": 1,
    "name": "noname",
    "created": "2024-07-17T14:34:21.037Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "users",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "primaryKey": true,
                    "allowNull": false,
                    "defaultValue": Sequelize.UUIDV4
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name",
                    "allowNull": false
                },
                "phone": {
                    "type": Sequelize.STRING,
                    "field": "phone",
                    "allowNull": false
                },
                "address": {
                    "type": Sequelize.STRING,
                    "field": "address",
                    "allowNull": true,
                    "defaultValue": "N/A"
                },
                "age": {
                    "type": Sequelize.STRING,
                    "field": "age",
                    "defaultValue": "N/A"
                },
                "height": {
                    "type": Sequelize.STRING,
                    "field": "height",
                    "defaultValue": "N/A"
                },
                "weight": {
                    "type": Sequelize.STRING,
                    "field": "weight",
                    "defaultValue": "N/A"
                },
                "bloodPressure": {
                    "type": Sequelize.STRING,
                    "field": "bloodPressure",
                    "defaultValue": "N/A"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "appointments",
            {
                "id": {
                    "type": Sequelize.UUID,
                    "field": "id",
                    "primaryKey": true,
                    "allowNull": false,
                    "defaultValue": Sequelize.UUIDV4
                },
                "date": {
                    "type": Sequelize.DATE,
                    "field": "date"
                },
                "complaints": {
                    "type": Sequelize.ARRAY(Sequelize.STRING),
                    "field": "complaints",
                    "allowNull": true
                },
                "diagnosis": {
                    "type": Sequelize.STRING,
                    "field": "diagnosis",
                    "allowNull": true
                },
                "symptoms": {
                    "type": Sequelize.STRING,
                    "field": "symptoms",
                    "allowNull": true
                },
                "advice": {
                    "type": Sequelize.STRING,
                    "field": "advice",
                    "allowNull": true
                },
                "facility": {
                    "type": Sequelize.STRING,
                    "field": "facility",
                    "allowNull": true
                },
                "medicines": {
                    "type": Sequelize.ARRAY(Sequelize.STRING),
                    "field": "medicines",
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "userId": {
                    "type": Sequelize.UUID,
                    "field": "userId",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "users",
                        "key": "id"
                    },
                    "allowNull": false
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
