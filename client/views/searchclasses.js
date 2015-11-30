Template.SearchClasses.helpers({
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

Template.SearchClasses.onRendered(function() {
  // todo: check if Meteor.user() && Meteor.user().role == 'student'
  if (!Meteor.user() || Meteor.user().role != 'student'){
    Router.go('/');
  }
});

Template.SearchClasses.events({

  // 'change #email': function (e, template) {
  //   _checkEmailValid();
  // },

  // 'change #password2': function (e, template) {
  //   _checkPasswordMatch();
  // }

});
