'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "date" on table "appointments"
 *
 **/

var info = {
    "revision": 2,
    "name": "noname",
    "created": "2024-07-22T21:52:01.155Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "changeColumn",
    params: [
        "appointments",
        "date",
        {
            "type": Sequelize.STRING,
            "field": "date"
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
