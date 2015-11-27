// Code to run when the app first starts

if (Meteor.isServer) {
  Meteor.startup(function () {
    // blank
  });
}

if (Meteor.isClient) {
  Meteor.startup(function () {

    document.title = "Cornell Course Review";

    Session.set('coursesReady', false);

    return SEO.config({
      title: 'Cornell Course Review',
      meta: {
        'description': "Cornell Course Review is a collaborative website where Cornell students read and write reviews about Cornell courses, so they can better select which classes to enroll."
      },
      og: {
        'image': 'http://cornellcoursereview.me/fbimg.png',
        'title': 'Cornell Course Review',
        'type': 'website',
        'url': 'http://cornellcoursereview.me/',
        'site_name': 'Cornell Course Review'
      }
    });
  });
}