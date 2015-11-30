// This is loaded first because it's located in a deeper subdirectory
// than other view files
// It contains code that works across the view templates

Meteor.startup(function() {
  Utils = {};

  Utils.BLACKLISTED_EMAILS = [
    "gmail.com",
    "naver.com",
    "hotmail.com",
    "daum.net",
    "hanmail.net",
    "nate.com",
    "yahoo.com",
    "aol.com",
    "outlook.com",
    "sharklasers.com",
    "msn.com",
    "att.net",
    "live.com",
    "verizon.net"
  ];

  Utils.userExists = function(username) {
    return !!Meteor.users.findOne({username: username});
  }

  Utils.getDomain = function (email) {
    var indexAt = email.indexOf("@");
    return email.substr(indexAt+1, email.length);
  };

  Utils.validateEmail = function (email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  };

  GARecordPage = function(pageLocation) {
    ga('create', 'UA-51592195-5', 'auto'); //fixme: replace with an eivornment var
    ga('send', 'pageview', {
      page: pageLocation
    });
  }

});

