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
var async = require('async');

module.exports = {
    createConfigJSON: function (callback) {
        if (!fs.existsSync(process.env.HOME + '/.knookrc.json')) {
            var config = {
                Accounts: {},
                Prefs: {},
                Security: {}
            };

            var configJSON = JSON.stringify(config, null, 4);

            try {
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

            try {
                fs.writeFileSync(process.env.HOME + '/.knook.db', '');
                var db = new sqlite3.Database(process.env.HOME + '/.knook.db');

                db.serialize(function () {

                    var queryInbox = "CREATE TABLE if not exists inbox (" +
                        "AddrFrom TEXT, " +
                        "AddrTo TEXT, " +
                        "cc TEXT, " +
                        "bc TEXT, " +
                        "content TEXT, " +
                        "date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, " +
                        "hasAttachment int, " +
                        "isRead int, " +
                        "isSnoozed int " +
                        ")";

                    var queryDraft = "CREATE TABLE if not exists draft (" +
                        "AddrFrom TEXT, " +
                        "AddrTo TEXT, " +
                        "cc TEXT, " +
                        "bc TEXT, " +
                        "content TEXT, " +
                        "hasAttachment int, " +
                        "date TIMESTAMP DEFAULT CURRENT_TIMESTAMP" +
                        ")";

                    var querySent = "CREATE TABLE if not exists sent (" +
                        "AddrFrom TEXT, " +
                        "AddrTo TEXT, " +
                        "cc TEXT, " +
                        "bc TEXT, " +
                        "content TEXT, " +
                        "hasAttachment int, " +
                        "date TIMESTAMP DEFAULT CURRENT_TIMESTAMP" +
                        ")";

                    var queryOutbox = "CREATE TABLE if not exists outbox (" +
                        "AddrFrom TEXT, " +
                        "AddrTo TEXT, " +
                        "cc TEXT, " +
                        "bc TEXT, " +
                        "content TEXT, " +
                        "hasAttachment int, " +
                        "date TIMESTAMP DEFAULT CURRENT_TIMESTAMP" +
                        ")";

                    var queryTrash = "CREATE TABLE if not exists trash (" +
                        "AddrFrom TEXT, " +
                        "AddrTo TEXT, " +
                        "cc TEXT, " +
                        "bc TEXT, " +
                        "content TEXT, " +
                        "hasAttachment int, " +
                        "inDate TIMESTAMP, " +
                        "toTrashDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP" +
                        ")";

                    async.series([
                        function (callback) {
                            db.run(queryInbox, function (err) {
                                callback(null, err);
                            });
                        },
                        function (callback) {
                            db.run(queryDraft, function (err) {
                                callback(null, err);
                            });
                        },
                        function (callback) {
                            db.run(querySent, function (err) {
                                callback(null, err);
                            });
                        },
                        function (callback) {
                            db.run(queryOutbox, function (err) {
                                callback(null, err);
                            });
                        },
                        function (callback) {
                            db.run(queryTrash, function (err) {
                                callback(null, err);
                            });
                        }
                    ], function (err, res) {
                        callback(res);
                        db.close();
                    });
                });
            } catch (ex) {
                callback(ex)
            }

        } else {
            callback(new Error("File already exist."));
        }
    }
};