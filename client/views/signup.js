
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
  if (!email.length) {
    $('#email').parent().removeClass('has-error');
    $('#emailHelpBlock').addClass('hide');
  } else if (!Utils.validateEmail(email)) {
    $('#email').parent().addClass('has-error');
    $('#emailHelpBlock').removeClass('hide');
  } else {
    $('#email').parent().removeClass('has-error');
    $('#email').parent().addClass('has-success');
    $('#emailHelpBlock').addClass('hide');
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
    var email = $('#email').val().trim();
    var password = $('#password').val();
    var password2 = $('#password2').val();

    if (!(email.length && password.length && password2.length)) {
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
    } else {
      if (_checkEmailValid() && _checkPasswordMatch()) {
        $('#incomplete').addClass("hide");
        // todo: send validation email
        // todo: create new user
      }
    }

    event.preventDefault();  
  },

  'change #email': function (e, template) {
    _checkEmailValid();
  },

  'change #password2': function (e, template) {
    _checkPasswordMatch();
  }

});
