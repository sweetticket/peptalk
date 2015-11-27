if (Meteor.isClient) {
  Template.Admin.helpers({
    users: function() {
      return Meteor.users.find({}, {sort: {createdAt: -1}});
    },
    comments: function() {
      return Comments.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.Admin.events({
    "click button.show-review-els": function(e, target) {
      $('.all-review-els').toggle();
    },
    "click button.show-user-els": function(e, target) {
      $('.all-user-els').toggle();
    },
  })
}
