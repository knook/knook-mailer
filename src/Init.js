/**
 * Knook-mailer
 * https://github.com/knook/knook.git
 * Auhtors: Alexandre Lagrange-Cetto, Olivier Graziano, Olivier Marin
 * Created on 16/04/2016.
 * version 0.1.0
 */

'use strict';

var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();

module.exports = {
    createConfigJSON: function (callback) {
        if (!fs.existsSync(process.env.HOME + '/.knookrc.json')) {
            var config = {
                Accounts: {},
                Prefs: {},
                Security: {}
            };

            var configJSON = JSON.stringify(config, null, 4);

            try{
               fs.writeFileSync(process.env.HOME + '/.knookrc.json', configJSON);
                callback(true)
            } catch (ex) {
                callback(ex);
            }

        } else {
            callback(new Error("File already exist."));
        }
    },

    createMailDB: function (callback) {
        if (!fs.existsSync(process.env.HOME + '/.knook.db')) {

            try{
                fs.writeFileSync(process.env.HOME + '/.knook.db');
                var db = new sqlite3.Database(process.env.HOME + '/.knook.db');

                db.serialize(function() {

                    var query = "CREATE TABLE if not exists inbox (" +
                        "AddrFrom TEXT, " +
                        "AddrTo TEXT, " +
                        "cc TEXT, " +
                        "bc TEXT, " +
                        "content TEXT, " +
                        "hasAttachment int, " +
                        "isRead int, " +
                        "isSnoozed int " +
                        ")";

                    db.run(query);
                });

                db.close();
                callback(true);
            } catch (ex) {
                callback(ex)
            }
            
        } else {
            callback(new Error("File already exist."));
        }
    }
};