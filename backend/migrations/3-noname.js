'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "medicines" from table "appointments"
 * removeColumn "description" from table "appointments"
 * addColumn "facility" to table "appointments"
 * addColumn "advice" to table "appointments"
 * addColumn "diagnosis" to table "appointments"
 * addColumn "complaints" to table "appointments"
 * addColumn "appointmentId" to table "medicines"
 * addColumn "quantity" to table "medicines"
 * addColumn "duration" to table "medicines"
 * addColumn "dosage" to table "medicines"
 *
 **/

var info = {
    "revision": 3,
    "name": "noname",
    "created": "2024-07-14T11:15:19.949Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["appointments", "medicines"]
    },
    {
        fn: "removeColumn",
        params: ["appointments", "description"]
    },
    {
        fn: "addColumn",
        params: [
            "appointments",
            "facility",
            {
                "type": Sequelize.STRING,
                "field": "facility",
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "appointments",
            "advice",
            {
                "type": Sequelize.STRING,
                "field": "advice",
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "appointments",
            "diagnosis",
            {
                "type": Sequelize.STRING,
                "field": "diagnosis",
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "appointments",
            "complaints",
            {
                "type": Sequelize.STRING,
                "field": "complaints",
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "medicines",
            "appointmentId",
            {
                "type": Sequelize.INTEGER,
                "field": "appointmentId",
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "appointments",
                    "key": "id"
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "medicines",
            "quantity",
            {
                "type": Sequelize.STRING,
                "field": "quantity"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "medicines",
            "duration",
            {
                "type": Sequelize.STRING,
                "field": "duration"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "medicines",
            "dosage",
            {
                "type": Sequelize.STRING,
                "field": "dosage"
            }
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
