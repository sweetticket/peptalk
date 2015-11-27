Comments = new Mongo.Collection("comments");

Meteor.methods({
  addComment: function (info) {

    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var comment = {
      courseId: info["courseId"],
      postId: info["postId"],
      networkId: info["networkId"],
      authorId: Meteor.userId(),
      isAnon: info["isAnon"],
      body: info["body"],
      createdAt: new Date()
    };

    Comments.insert(comment);
    Meteor.call("Posts.addFollower", Meteor.userId);

  },

  deleteComment: function (commentId) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var comment = Comments.findOne({"_id": commentId});
    if ((Meteor.userId() == comment.authorId) || (Meteor.user().role == "instructor")) {
      Comments.remove(commentId);
    }
  },

  editComment: function (commentId, newText) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var comment = Comments.findOne({"_id": commentId});
    if (((Meteor.userId() == comment.authorId) || (Meteor.user().role == "instructor")) && isValidComment(newText)) {
      Comments.update(commentId, {
        $set: {'body': newText}
      });
    }
  },

});