if (Meteor.isClient) {

  Template.Main.onRendered(function() {
    if (Session.get("signUpMode")) {
      Session.set("signUpMode", undefined);
    }
  });

  Template.Main.events({
     'click .button-container': function(e, template) {
      e.preventDefault();
      debugger
        if ($(e.target).hasClass('signup-instructor')){
          Session.set("signUpMode", "instructor");
          Router.go('/signup');
        } else if ($(e.target).hasClass('signup-student')){
          Session.set("signUpMode", "student");
          Router.go('/signup');
        }
        
     },
  });

}

