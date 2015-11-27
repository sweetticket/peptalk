Comments = new Mongo.Collection("comments");

Meteor.methods({
  addComment: function (text, courseCatalog) {

    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var comment = {
      courseCatalog: courseCatalog,
      owner: Meteor.userId(),
      username: Meteor.user().username,
      text: text,
      votes: 0,
      upvoters: [],
      downvoters: [],
      createdAt: new Date()
    };

    Comments.insert(comment);

  },

  deleteComment: function (commentId) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var comment = Comments.findOne({"_id": commentId});
    if ((Meteor.userId() == comment.owner) || (Meteor.user().role == "admin")) {
      Comments.remove(commentId);
    }
  },

  editComment: function (commentId, newText) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var comment = Comments.findOne({"_id": commentId});
    if (((Meteor.userId() == comment.owner) || (Meteor.user().role == "admin")) && isValidComment(newText)) {
      Comments.update(commentId, {
        $set: {'text': newText}
      });
    }
  },

  upVote: function(commentId) {
    var comment = Comments.findOne({"_id": commentId});
    
    // this is captured on the client side, but we are double checking
    if (!Meteor.userId() || comment.owner == Meteor.userId()) {
      return;
    }
    var msg = Meteor.userId() + 'upvoted your review for ' + comment.courseCatalog;
    var link = '/courses/' + comment.courseCatalog;
    var newNotif = Notifications.createNotifcation(comment.owner, Meteor.userId(),
                                                     'upvote', msg, link);
    if (comment.downvoters.indexOf(Meteor.userId()) > -1) {
      var idx = comment.downvoters.indexOf(Meteor.userId());
      comment.downvoters.splice(idx, 1);
      comment.upvoters.push(Meteor.userId());
      Comments.update(commentId, {
        $set: {'upvoters': comment.upvoters, 'downvoters': comment.downvoters},
        $inc: {'votes': 2}
      });
      Users.addNotification(comment.owner, newNotif);
      
      return true;
    } else if (comment.upvoters.indexOf(Meteor.userId()) > -1) {
      var idx = comment.upvoters.indexOf(Meteor.userId());
      comment.upvoters.splice(idx, 1); // updates in place
      Comments.update(commentId, {
        $set: {'upvoters': comment.upvoters},
        $inc: {'votes': -1}
      });
      return false;
    } else {
      comment.upvoters.push(Meteor.userId());
      Comments.update(commentId, {
        $set: {'upvoters': comment.upvoters},
        $inc: {'votes': 1}
      });
      Users.addNotification(comment.owner, newNotif);
      return true;
    }
  },

  downVote: function(commentId) {
    var comment = Comments.findOne({"_id": commentId});
    if (!Meteor.userId() || comment.owner == Meteor.userId()) {
      return;
    }
    var msg = Meteor.userId() + 'downvoted your review for ' + comment.courseCatalog;
    var link = '/courses/' + comment.courseCatalog;
    var newNotif = Notifications.createNotifcation(comment.owner, Meteor.userId(),
                                                     'downvote', msg, link);
    
    if (comment.upvoters.indexOf(Meteor.userId()) > -1) {
      var idx = comment.upvoters.indexOf(Meteor.userId());
      comment.upvoters.splice(idx, 1);
      comment.downvoters.push(Meteor.userId());
      Comments.update(commentId, {
        $set: {'downvoters': comment.downvoters, 'upvoters': comment.upvoters},
        $inc: {'votes': -2}
      });
      Users.addNotification(comment.owner, newNotif);
      return true;

    } else if (comment.downvoters.indexOf(Meteor.userId()) > -1) {
      var idx = comment.downvoters.indexOf(Meteor.userId());
      comment.downvoters.splice(idx, 1); // updates in place
      Comments.update(commentId, {
        $set: {'downvoters': comment.downvoters},
        $inc: {'votes': 1}
      });
      return false;
    
    } else {
      comment.downvoters.push(Meteor.userId());
      Comments.update(commentId, {
        $set: {'downvoters': comment.downvoters},
        $inc: {'votes': -1}
      });
      Users.addNotification(comment.owner, newNotif);
      return true;
    }
  }

});