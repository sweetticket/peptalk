if (Meteor.isServer) {
  // Meteor.publish("courses", function() {
  //   return Courses.find({}, {fields: {'catalog':1, 'titleLong':1}});
  // });

  Meteor.publish("courseCatalog", function(catalog) {
    return Courses.find({"catalog": catalog});
  });

  Meteor.publish("coursePosts", function(courseId) {
    return Posts.find({courseId: courseId});
  });

  Meteor.publish("comments", function(postId) {
    var comments = Comments.find({postId: postId});
    return comments;
  });
  
  // Meteor.publish("userNotifs", function(userId) {
  //   var notifs = Notifications.find({recipient: userId},
  //     {fields: { 'recipient': 1, 'sender': 1, 'type': 1, 'message': 1, 'href': 1, 'isRead': 1, 'createdAt': 1}});
  //   return notifs;
  // });
  
  Meteor.publish("userData", function () {
    if (this.userId) {
      return Meteor.users.find({_id: this.userId},
        {fields: { 'emails': 1, 'fullname': 1, 'role': 1, 'courses': 1, 'networkId': 1 }});
    } else {
      this.ready();
    }
  });
  
  Meteor.publish("otherUserData", function () {
    if (this.userId) {
      return Meteor.users.find({},
        {fields: {'score': 1, 'username': 1}});
    } else {
      this.ready();
    }
  });

  // Meteor.publish("userReviews", function(userId) {
  //   var reviews = Comments.find({owner: userId},
  //     {fields: { 'text': 1, 'votes': 1, 'courseCatalog': 1}});
  //   return reviews;
  // });

  // Meteor.publish("infoForAdmin", function() {
  //   if (this.userId) {
  //     var user = Meteor.users.findOne(this.userId);
  //     if (user.role == "admin") {
  //       var comments = Comments.find({}, {fields: {
  //         'courseCatalog': 1,
  //         'owner': 1,
  //         'username': 1,
  //         'text': 1,
  //         'votes': 1,
  //         'createdAt': 1
  //       }});
  //       var users = Meteor.users.find({}, {fields: {
  //         '_id':1,
  //         'netId': 1,
  //         'score': 1,
  //         'username': 1,
  //         'createdAt': 1
  //       }});
  //       return [comments, users];
  //       // return comments;
  //     }
  //   }
  // });
}



// FIXME: this is probably the right way to do it
// var userIdArr = _.map(comments, function(comment) {
//   comment.owner;
// });
// var users = Meteor.users.find({id: { $in: userIdArr }}, {fields: {"username": 1}});





// // Publish a person's own user profile to themselves
// Meteor.publish('userProfile', function (userId) {
//   try{
//     return Meteor.users.find({_id: this.userId}, {fields: {
//       '_id': true,
//       'username': true,
//       'profile': true,
//       'profile.name': true,
//       'profile.avatar': true,
//       'profile.username': true,

//       'profile.favoriteColor': true,
//       'profile.selectedTheme': true,

//       'profile.address': true,
//       'profile.city': true,
//       'profile.state': true,
//       'profile.zip': true,

//       'emails': true,
//       'emails[0].address': true,
//       'emails.address': true
//     }});

//   }catch(error){
//     console.log(error);
//   }
// });

// // Publish the user directory which everbody can see
// Meteor.publish("usersDirectory", function () {
//   try{
//     return Meteor.users.find({}, {fields: {
//       '_id': true,
//       'username': true,
//       'profile': true,
//       'profile.name': true,
//       'profile.avatar': true,
//       'profile.username': true,

//       'emails': true,
//       'emails[0].address': true,
//       'emails.address': true
//     }});
//   }catch(error){
//     console.log(error);
//   }
// });