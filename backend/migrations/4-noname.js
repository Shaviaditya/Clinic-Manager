'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * dropTable "medicines"
 * addColumn "medicines" to table "appointments"
 * changeColumn "complaints" on table "appointments"
 *
 **/

var info = {
    "revision": 4,
    "name": "noname",
    "created": "2024-07-14T14:56:28.627Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "dropTable",
        params: ["medicines"]
    },
    {
        fn: "addColumn",
        params: [
            "appointments",
            "medicines",
            {
                "type": Sequelize.ARRAY(Sequelize.STRING),
                "field": "medicines",
                "allowNull": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "appointments",
            "complaints",
            {
                "type": Sequelize.ARRAY(Sequelize.STRING),
                "field": "complaints",
                "allowNull": true
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
