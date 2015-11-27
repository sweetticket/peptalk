if (Meteor.isClient) {
    
  Template.AllNotifications.helpers({
    isUpvote: function() {
      if (this && this.type) {
        return this.type == 'upvote';
      }
    }
  });

  Template.AllNotifications.helpers({
    isDownvote: function() {
      if (this && this.type) {
        return this.type == 'downvote';
      }
    }
  });
  
  Template.AllNotifications.rendered = function () {
    //FOR EACH NOTIF, MARK AS READ
    
  }

Template.AllNotifications.helpers({

      'notifications': function() {
        // var reviews = Comments.find({owner: userId});
        var notifications = Notifications.find();
        return notifications;
      }
  });

Template.AllNotifications.rendered = function() {
    var notif = UI.getData();
    var date = notif.createdAt;
    var formattedDate = moment(date).format('MMMM Do YYYY, h:mm a');
    $('.notif-date').text(formattedDate);
  }
    
}