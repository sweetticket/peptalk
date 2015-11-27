if (Meteor.isClient) {
  var options = {
    keepHistory: 1000 * 60 * 5,
    localSearch: true
  };
  var fields = ['titleLong', 'catalog', 'catalogNbr'];

  CourseSearch = new SearchSource('courses', fields, options);
}

if (Meteor.isServer) {

  SearchSource.defineSource('courses', function(searchText, options) {
    var options = {
      fields: {'catalog':1, 'titleLong':1, 'catalogNbr':1},
      limit: 8
    };
    
    if (searchText) {
      console.log("query:", searchText);

      var regExp = buildRegExp(searchText);

      var selector = {$or: [
        {titleLong: { $regex: regExp } },
        {catalog: { $regex: regExp } },
        {catalogNbr: { $regex: regExp } }
      ]}
      
      return Courses.find(selector, options).fetch();
    } else {
      // return Courses.find({}, options).fetch();
      return [];
    }
  });

  function buildRegExp(searchText) {
    var words = searchText.trim().split(/[ \-\:]+/);
    var exps = _.map(words, function(word) {
      return "(?=.*" + word + ")";
    });
    var fullExp = exps.join('') + ".+";
    return new RegExp(fullExp, "i");
  }

}
