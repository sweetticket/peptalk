Courses = new Mongo.Collection("courses");

Meteor.methods({
  addCourse: function (data, callback) {
    var course = {
      "networkId": data["networkId"],
      "title": data["title"],
      "catalog": data["catalog"],
      "categories":[],
    };

    Courses.insert(course);
  },

  deleteCourse: function (courseId) {
    Courses.remove({"_id": courseId});
  },

  addCategory: function (courseId, category) {
    var course = Courses.findOne({"_id": courseId});
    course.categories.push(category);
    Courses.update(courseId, {
      $set: {'categories': course.categories}
    });
  }


  
});