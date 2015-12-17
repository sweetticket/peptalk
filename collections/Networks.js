// @cornell.edu is cornell.edu network
// @nyu.edu is nyu.edu network
// @snu.com is snu.com network
// We are going to blacklist the common email domains like
// gmail.com, hotmail.com, naver.com so users can not
// sign up with a generic email address

Networks = new Mongo.Collection("networks");

// see if domain is one of the blacklisted domains

Meteor.methods({
  addNetwork: function (domain, name) {
    if (_.contains(Utils.BLACKLISTED_EMAILS, domain)) {
      throw {
        reason: "BLACKLIST_DOMAIN",
        details: "You cannot use " + domain + ". Please use your organization email."
      };
    }

    var network = {
      domain: domain,
      name: name,
      createdAt: new Date()
    }

    console.log("NEW NETWORK:", domain);

    return Networks.insert(network);
  }
});
