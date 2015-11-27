Posts = new Mongo.Collection('posts');

// Posts.before.insert(function (userId, doc) {
//   var authorRep = Meteor.users.findOne({_id: userId}).rep;
//   Meteor.call("Users.setRep", userId, authorRep+1);
//   doc.createdAt = new Date();
// });

Posts.helpers({
  datePosted: function() {
    return moment(this.createdAt).format('M/D');
  },
  author: function() {
    return Meteor.users.findOne({_id: this.userId});
  },
  upvotes: function() {
    return Meteor.users.find({_id: {$in: this.upvoterIds}}).count();
  },
  numberOfComments: function() {
    return Comments.find({postId: this._id}).count();
  },
});

Meteor.methods({

  'Posts.new': function (info) {
    var now = new Date();
    return Posts.insert({
      body: info["body"],
      authorId: info["authorId"],
      upvoterIds: [],
      followerIds: [info["authorId"]],
      numLikes: 0,
      courseId: info["courseId"],
      isPrivate: info["isPrivate"],
      isAnon: info["isAnon"],
      type: info["type"],
      networkId: info["networkId"],
      createdAt: now,
      updatedAt: now
      instructorAnswer: null,
      studentAnswer: null,
    });
  },

  //DELETE COMMENTS, UPVOTERS, AND DOWNVOTERS
  'Posts.delete': function (postId) {
    Posts.remove({
      _id: postId
    });
    Comments.remove({
      postId: postId
    });
    // Notifications.remove({
    //   postId: postId
    // });
  },

  'Posts.updateInstructorAnswer': function (postId, answer) {
    Posts.update({ _id: postId}, {
        "$set": { instructorAnswer: answer }
        });
    // Notify followers
  },

  'Posts.updateStudentAnswer': function (postId, answer) {
    Posts.update({ _id: postId}, {
        "$set": { studentAnswer: answer }
        });
    // Notify followers
  },

  'Posts.updatePost': function(postId, newinfo) {
    Posts.update({_id: postId}, {
      "$set": newinfo
    });
  }

  'Posts.decreaseNumLikes': function (postId) {
    var post = Posts.findOne({
      _id: postId
    });
    if (post) {
      console.log("decreasing posts' numlikes");
      var numLikes = Posts.findOne(postId).numLikes;
      Posts.update({ _id: postId}, {
        "$set": { numLikes: numLikes-1 }
        }
      );
    }
  },

  'Posts.setNumLikes': function (postId, newNumLikes) {
    var post = Posts.findOne({
      _id: postId
    });
    if (post) {
      console.log("changing posts' numlikes");
      Posts.update({ _id: postId}, {
        "$set": { numLikes: newNumLikes }
        }
      );
    }
  },

  'Posts.upvote': function (postId, userId) {

    var post = Posts.findOne({_id: postId});

    if (!post) {
      console.log("post doesnt exist");
      return false;
    }

    var voter = Meteor.users.findOne({_id: userId});
    var author = Meteor.users.findOne({_id: post.userId});

    // call method to increase rep

    var upvoters = post.upvoterIds;
    var didIUpvote = upvoters.indexOf(userId);

    var numLikes = post.numLikes;
    var authorId = post.userId;

    // if I was already in upvoters' list, remove me from 
    // the upvoters list.
    if (didIUpvote >= 0) {

      upvoters.splice(didIUpvote, 1);

      Posts.update({ _id: post._id}, {
        "$set": { upvoterIds: upvoters }
      });

      //cancelling my previous upvote
      //do not push a notification
      Meteor.call("Posts.setNumLikes", postId, numLikes-1);

      return -1;

      // Meteor.call("Users.setRep", author._id, author.rep-1);

    } else {

      upvoters.push(userId);

      Posts.update({ _id: post._id}, {
        "$set": { upvoterIds: upvoters }
      });

      Meteor.call("Posts.setNumLikes", postId, numLikes+1);
      // Meteor.call("Users.setRep", author._id, author.rep+1);
      // Meteor.call("Users.setRep", voter._id, voter.rep+1);

      return 1;
    }
  },

});