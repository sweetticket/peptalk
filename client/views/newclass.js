Template.NewClass.helpers({
  'emaildomain': function() {
    return Utils.getDomain(Meteor.user().emails[0].address);
  }
});

Template.NewClass.onRendered(function() {
  if (!Meteor.user() || Meteor.user().role != 'instructor'){
    Router.go('/');
  }
});

Template.NewClass.events({

  // 'change #email': function (e, template) {
  //   _checkEmailValid();
  // },

  // 'change #password2': function (e, template) {
  //   _checkPasswordMatch();
  // }

});
