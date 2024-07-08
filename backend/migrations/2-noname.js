'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "medicines" on table "appointments"
 *
 **/

var info = {
    "revision": 2,
    "name": "noname",
    "created": "2024-07-08T21:25:51.603Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "changeColumn",
    params: [
        "appointments",
        "medicines",
        {
            "type": Sequelize.ARRAY(Sequelize.STRING),
            "field": "medicines",
            "allowNull": true
        }
    ]
}];

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
