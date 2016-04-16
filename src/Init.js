/**
 * Knook-mailer
 * https://github.com/knook/knook.git
 * Auhtors: Alexandre Lagrange-Cetto, Olivier Graziano, Olivier Marin
 * Created on 16/04/2016.
 * version 0.1.0
 */

'use strict';

var fs = require('fs');

module.exports = {
    createConfigJSON: function (callback) {
        if (!fs.existsSync(process.env.HOME + '/.knookrc.json')) {
            var config = {
                Accounts: {},
                Prefs: {},
                Security: {}
            };

            var configJSON = JSON.stringify(config, null, 4);

            fs.writeFile(process.env.HOME + '/.knookrc.json', configJSON, (err) => {
                if (err) {
                    callback(err);
                } else {
                    callback(true);
                }
            });
        } else {
            callback("File already exist.");
        }
    },

    createMailDB: function (callback) {
        if (!fs.existsSync(process.env.HOME + '/.knook.db')) {
            fs.writeFile(process.env.HOME + '/.knook.db', '', (err) => {
                if (err) {
                    callback(err);
                } else {
                    callback(true);
                }
            });
        } else {
            callback("File already exist.");
        }
    }
};