app.filter("filterByDate", function() {
  return function(collection, currentDate) {
    var filteredCollection = []

    for(var i in collection) {

      var date = collection[i]["Date"].split("-")
      var year = parseInt(date[0])
      var month = parseInt(date[1])
      var day = parseInt(date[2])

      // console.log(year, currentDate.getFullYear())
      // console.log(month, currentDate.getMonth() + 1)
      // console.log( day, currentDate.getDate())

      if(year === currentDate.getFullYear() &&
          month === currentDate.getMonth() + 1 &&
          day === currentDate.getDate()) {
        filteredCollection.push(collection[i])
      }
    }
    return filteredCollection;
  };
});