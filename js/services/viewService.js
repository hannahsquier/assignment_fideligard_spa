app.factory("viewService", ["$state", function($state) {

  var changeView = function(view) {
    $state.go(view)
  }

  return {
    changeView: changeView
  }
}]);