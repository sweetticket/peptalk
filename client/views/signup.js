
var _checkPasswordMatch = function() {
  var password = $('#password').val();
  var password2 = $('#password2').val();
  if (!password2.length) {
    $('#password').parent().removeClass('has-error');
    $('#password2').parent().removeClass('has-error');
    $('#password').parent().removeClass('has-success');
    $('#password2').parent().removeClass('has-success');
    $('#passwordHelpBlock').addClass('hide');
    return false;
  }
  if (password != password2) {
    $('#password2').parent().removeClass('has-success');
    $('#password2').parent().removeClass('has-success');
    $('#password').parent().addClass('has-error');
    $('#password2').parent().addClass('has-error');
    $('#passwordHelpBlock').removeClass('hide');
    return false;
  } else {
    $('#password').parent().removeClass('has-error');
    $('#password2').parent().removeClass('has-error');
    $('#password').parent().addClass('has-success');
    $('#password2').parent().addClass('has-success');
    $('#passwordHelpBlock').addClass('hide');
    return true;
  }
}

var _checkEmailValid = function() {
  var email = $('#email').val().trim();
  $('#blackListHelpBlock').addClass('hide');
  $('#emailExistsHelpBlock').addClass('hide');
  if (!email.length) {
    $('#email').parent().removeClass('has-error');
    $('#emailHelpBlock').addClass('hide');
    return false;
  } else if (!Utils.validateEmail(email)) {
    $('#email').parent().addClass('has-error');
    $('#emailHelpBlock').removeClass('hide');
    return false;
  } else {
    $('#email').parent().removeClass('has-error');
    $('#email').parent().addClass('has-success');
    $('#emailHelpBlock').addClass('hide');
    return true;
  }
}


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
  'submit form.signup-form': function (e, template){
    e.preventDefault();
    var email = $('#email').val().trim();
    var password = $('#password').val();
    var password2 = $('#password2').val();
    var fullname = $('#fullname').val().trim();

    if (!(fullname.length && email.length && password.length && password2.length)) {
      $('#incomplete').removeClass("hide");
      if (!email.length) {
        $('#email').parent().addClass('has-error');
      }
      if (!password.length) {
        $('#password').parent().addClass('has-error');
      }
      if(!password2.length) {
        $('#password2').parent().addClass('has-error');
      }
      if(!fullname.length) {
        $('#fullname').parent().addClass('has-error');
      }
    } else {
      $('#incomplete').addClass("hide");
      $('.has-error').removeClass('has-error');
      if (_checkEmailValid() && _checkPasswordMatch()) {
        console.log("all fields are valid..");
        // todo: send validation email
        // todo: create new user

        Accounts.createUser({
          email: email.toLowerCase(),
          password: password,
          role: Session.get("signUpMode"),
          fullname: fullname
        }, function (err) {
          if (err) {
            console.log("createUser failed", err);

            if (err.reason === "Email already exists.") {
             $('#emailExistsHelpBlock').removeClass('hide');
            } else if (err.reason === "BLACKLIST_DOMAIN") {
              $('#blackListHelpBlock').removeClass('hide');
            }
            return false;
          } else {
            var route;
            if (Session.get("signUpMode") == "instructor") {
              route = '/new';
            } else {
              route = '/search';
            }
            Session.set("signUpMode", undefined);
            Router.go(route);
          }
        
        // ga('send', 'event', 'user', 'signup', {
        //   email: Meteor.user().emails[0].address
        // });
      
        });
      }
    } 
  },

  'change #email': function (e, template) {
    _checkEmailValid();
  },

  'change #password2': function (e, template) {
    _checkPasswordMatch();
  }

});
