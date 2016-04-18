/**
 * Knook-mailer
 * https://github.com/knook/knook.git
 * Auhtors: Alexandre Lagrange-Cetto, Olivier Graziano, Olivier Marin
 * Created on 15/04/2016.
 * version 0.1.0
 */


'use strict';

/* Data object format
 var data = {
     name: null,
     Email: null,
     imapServer: null,
     imapPort: null,
     imapUsername: null,
     imapPassword: null,
     imapSSL: null,
     smtpServer: null,
     smtpPort: null,
     smtpUsername: null,
     smtpPassword: null,
     smtpSSL: null
 };
 */

var nodemailer = require('nodemailer');
var fs = require('fs');

module.exports = {
    /**
     * Add the account described in the data object to the json config file.
     * @param data : object
     */
    addAccount: function (data, callback) {
        var configFile = fs.readFileSync(process.env.HOME+'/.knookrc.json');
        var configContent = JSON.parse(configFile);
        var name = data['email'];
        configContent.Accounts[name] = data;
        var configJSON = JSON.stringify(configContent, null, 4);

        try {
            fs.writeFileSync(process.env.HOME+'/.knookrc.json', configJSON);
            callback(true)
        } catch (ex) {
            callback(ex)
        }
    },

    /**
     * Delete te account which match to parameter from json config file.
     * @param accountName : string
     */
    delAccount: function (accountName) {
        return 1;
    },

    /**
     * Check the connectivity of the account described in parameter to the SMTP server.
     * @param data
     * @param callback
     */
    checkSMTP: function (data, callback) {
        var smtpConfig = {
            host: data["smtpServer"],
            port: data["smtpPort"],
            secure: data["smtpSSL"], // use SSL
            auth: {
                user: data['smtpUsername'],
                pass: data['smtpPassword']
            }
        };

        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport(smtpConfig);

        transporter.verify(function(error) {
            if (error) {
                console.log(error);
                callback(error);
            } else {
                console.log('Server is ready to take our messages');
                callback(true);
            }
        });
    },

    /**
     * Check the connectivity of the account described in parameter to the SMTP server.
     * @param data
     * @return res : true if account is connected
     *               string containing the error else.
     */
    checkIMAP: function (data) {
        return 1;
    }

};




