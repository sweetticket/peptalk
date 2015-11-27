Notifications = new Mongo.Collection("notifications");

Meteor.methods({
  createNotification: function (recipientId, senderId, type, message, link) {

    var notification = {
      recipient: recipientId,
      sender: senderId,
      type: type,
      message: message,
      href: link,
      isRead: false,
      createdAt: new Date()
    };

    Notifications.insert(notification);

  },

  markRead: function (notificationId) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    var notif = Notifications.findOne({"_id": notificationId});
    if (Meteor.userId() == notif.recipient) {
      Notifications.update(notificationId, {
        $set: {'isRead': true },
      });
    }
  },
  
});