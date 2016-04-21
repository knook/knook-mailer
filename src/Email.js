/**
 * Knook-mailer
 * https://github.com/knook/knook.git
 * Auhtors: Alexandre Lagrange-Cetto, Olivier Graziano, Olivier Marin
 * Created on 15/04/2016.
 * version 0.1.0
 */

'use strict';

var sqlite3 = require('sqlite3').verbose();

module.exports = {
    receiveAll: function () {
        return 1;
    },

    receiveFor: function (accountName) {
        return 1;
    },

    sendAll: function () {
        return 1;
    },

    sendFor: function (accountName) {
        return 1;
    },

    store: function (email, table, callback) {
        var db = new sqlite3.Database(process.env.HOME + '/.knook.db');

        db.serialize(function() {
            var stmt = db.prepare("INSERT INTO " + table + " (AddrFrom, AddrTo, cc, bc, content) VALUES (?, ?, ?, ?, ?)");
            stmt.run(email.AddrFrom, email.AddrTo, email.AddrCc, email.AddrBc, email.Content);
            stmt.finalize(function () {
                callback();
            });
        });
    },

    storeAttachment: function (file) {
        return 1;
    },

    remove: function (email) {
        return 1;
    },

    autoRemove: function () {
        return 1;
    },

    search: function (email) {
        return 1;
    },

    snooze: function (email) {
        return 1;
    }
};





