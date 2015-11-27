// userExists = function(username) {
//   return !!Meteor.users.findOne({username: username});
// }

Meteor.methods({
  editUsername: function (newUsername) {
    // FIXME: do something if username is invalid
    if (!isValidUserName(newUsername)) {
      return {"err": "Username cannot contain special characters."}
    } else if (userExists(newUsername)) {
      return {"err": "That username already exists! Try a different one."}
    } else {
      Meteor.users.update(Meteor.user()._id,
        {$set: {'username': newUsername}}
      );
      return false;
    }
  },
  upvotePoint: function (userid) {
    Meteor.users.update(userid, {
        $inc: {'score': 1}
      });
    return true;
  },
  downvotePoint: function (userid) {
    Meteor.users.update(userid, {
      $inc: {'score': -1}
    });
    return false;
  },
  commentPoints: function (userid) {
    Meteor.users.update(userid, {
      $inc: {'score': 10}
    });
  },
  deletePoints: function (userid) {
    Meteor.users.update(userid, {
      $inc: {'score': -10}
    });
  },

  setIsNew: function() {
    Meteor.users.update(Meteor.user()._id,
      {$set: {'isNew': 0
      }}
    );
  },
  
  addNotifcation: function (userid, notif) {
    var user = Users.findOne({"_id": userid});
    user.notifcations.push(notif);
    Meteor.users.update(userid, {
      $set: {'notifcations': user.notifcations}
    });
  }
});

if (Meteor.isServer) {
  Accounts.onCreateUser(function(options, user) {

    var email = user.services.google.email;
    var netId = cutEmailDomain(email);
    user.email = email;
    user.netId = netId;
    user.username = netId;
    user.score = 0;
    user.isNew = 1;
    user.role = "normal";
    user.notifications = [];
    return user;
  });


}

