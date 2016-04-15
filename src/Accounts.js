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

module.exports = {
    /**
     * Add the account described in the data object to the json config file.
     * @param data : object
     */
    addAccount: function (data) {
        return 1;
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
     * @return res : true if account is connected
     *               string containing the error else.
     */
    checkSMTP: function (data) {
        return 1;
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




