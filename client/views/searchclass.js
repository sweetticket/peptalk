Template.SearchClass.helpers({
  // 'who': function() {
  //   if (!Session.get("signUpMode")) {
  //     Session.set("signUpMode", "student");
  //   }
  //   if (Session.get("signUpMode") == "instructor") {
  //     return "Instructors";
  //   } else {
  //     return "Students";
  //   }
  // }
});

Template.SearchClass.onRendered(function() {
  // todo: check if Meteor.user() && Meteor.user().role == 'student'
  // probably need to publish & subscribe user data
});

Template.SearchClass.events({

  // 'change #email': function (e, template) {
  //   _checkEmailValid();
  // },

  // 'change #password2': function (e, template) {
  //   _checkPasswordMatch();
  // }

});
