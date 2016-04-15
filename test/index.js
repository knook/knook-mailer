/**
 * Knook-mailer
 * https://github.com/knook/knook.git
 * Auhtors: Alexandre Lagrange-Cetto, Olivier Graziano, Olivier Marin
 * Created on 15/04/2016.
 * version 0.1.0
 */


var should = require('chai').should(),
    index = require('../index'),
    Accounts = index.Accounts,
    Email = index.Email,
    Prefs = index.Prefs,
    Security = index.Security;

describe('#Account', function () {
    it('Add account', function () {
        Accounts.addAccount('data').should.equal(1);
    });

    it('Del account', function () {
        Accounts.delAccount('accountName').should.equal(1);
    });

    it('Check SMTP', function () {
        Accounts.checkSMTP('data').should.equal(1);
    });

    it('Check IMAP', function () {
        Accounts.checkIMAP('data').should.equal(1);
    });
});

describe('#Email', function () {
    it("Receive All", function () {
        Email.receiveAll().should.equal(1);
    });

    it("Receive For", function () {
        Email.receiveFor("accountName").should.equal(1);
    });

    it("Send All", function () {
        Email.sendAll().should.equal(1);
    });

    it("Send For", function () {
        Email.sendFor("accountName").should.equal(1);
    });

    it("store", function () {
        Email.store("Email").should.equal(1);
    });

    it("Store Attachment", function () {
        Email.storeAttachment('attach').should.equal(1);
    });

    it("Remove", function () {
        Email.remove("Email").should.equal(1);
    });

    it("Remove Auto", function () {
        Email.autoRemove().should.equal(1);
    });

    it("Search", function () {
        Email.search('Email').should.equal(1);
    });

    it("Snooze", function () {
        Email.snooze('Email').should.equal(1);
    });
});

describe('#Prefs', function () {
    it('set Receive Period', function () {
        Prefs.setReceivePeriod('period').should.equal(1);
    });

    it('set Check Con Period', function () {
        Prefs.setCheckConPeriod('period').should.equal(1);
    });

    it('set Cipher Local Content', function () {
        Prefs.setCipherLocalContent('bool').should.equal(1);
    });
});

describe('#Security', function () {
    it('Hash Master Pass', function () {
        Security.hashMasterPass('plainPass').should.equal(1);
    });

    it('Store Hashed Pass', function () {
        Security.storeHashedPass('hashedPass').should.equal(1);
    });

    it('Cipher Email DB', function () {
        Security.cipherEmailDB().should.equal(1);
    });

    it('Uncipher Email DB', function () {
        Security.uncipherEmailDB().should.equal(1);
    });

    it('Cipher Config', function () {
        Security.cipherConfig().should.equal(1);
    });

    it('Uncipher Config', function () {
        Security.uncipherConfig().should.equal(1);
    });
});