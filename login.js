#!/usr/bin/env casperjs

var fs             = require('fs');
var cookie_file    = 'storage/cookies.txt';

var login_url      = 'https://www.nsscreencast.com/login';
var login_test_url = 'https://www.nsscreencast.com/my_account';
var login_username = '';
var login_password = '';

var casper = require('casper').create
({   
    verbose: true, 
    logLevel: 'debug',
    userAgent: 'Mozilla/5.0 (Windows NT 6.1; rv:17.0) Gecko/20100101 Firefox/17.0',
    pageSettings: {
      loadImages:  false,         // The WebPage instance used by Casper will
      loadPlugins: false         // use these settings
    }
});

phantom.casperTest = true;

casper.start(login_url, function() {

    console.log("------------------------> page loaded");
    this.echo('=====================================>'+this.getTitle());
    
    this.test.assertExists('#login_box form', 'Form is found');

    this.fill('#login_box form', {
        email: login_username,
        password: login_password,
        remember_me: 'on'
    }, true);

    this.then(function() {
        console.log('Login From Submitted!');
    });
});

casper.thenOpen(login_test_url, function() {
    this.echo('=====================================>'+this.getTitle());
    this.test.assertExists('a.show_payment_form', '√√√√√√√√√√√√√√√√√√√√√ -----> Login Success!');
});

casper.run(function()
{   
    var cookies = JSON.stringify((this.page.cookies)); 
    fs.write(cookie_file, cookies, 'w'); 
    this.exit();    
});
