'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "facility" from table "appointments"
 *
 **/

var info = {
    "revision": 3,
    "name": "noname",
    "created": "2024-07-24T00:26:18.921Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "removeColumn",
    params: ["appointments", "facility"]
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
