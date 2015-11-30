Template.SignUp.helpers({
  'who': function() {
    if (!Session.get("signUpMode")) {
      Session.set("signUpMode", "student");
    }
    if (Session.get("signUpMode") == "instructor") {
      return "Instructors";
    } else {
      return "Students";
    }
  }
});

Template.SignUp.rendered = function() {
  
}

Template.SignUp.events({
  'submit form.signup-form': function(event, template){
    event.preventDefault();
    
  },
});
