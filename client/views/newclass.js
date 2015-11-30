Template.NewClass.helpers({
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

Template.NewClass.onRendered(function() {
  // todo: check if Meteor.user() && Meteor.user().role == 'instructor'
  // probably need to publish & subscribe user data
});

Template.NewClass.events({

  // 'change #email': function (e, template) {
  //   _checkEmailValid();
  // },

  // 'change #password2': function (e, template) {
  //   _checkPasswordMatch();
  // }

});
