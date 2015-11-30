Template.LandingNav.onRendered(function() {
  
});

Template.LandingNav.helpers({
  'isLandingPage': function(e, template) {
    return Session.get("signUpMode") == undefined;
  }
});

Template.LandingNav.events({
  'click .dropdown-menu': function(e, template) {
    e.preventDefault();
    if ($(e.target).hasClass('signup-instructor-nav')) {
      Session.set("signUpMode", "instructor");
      Router.go("/signup");
    } else if ($(e.target).hasClass('signup-student-nav')) {
      Session.set("signUpMode", "student");
      Router.go("/signup");
    }
  },

  'click .signin-btn': function(e, template) {
    //TODO
  }

});