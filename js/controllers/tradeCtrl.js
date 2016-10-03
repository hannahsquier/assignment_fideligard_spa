app.controller("tradeCtrl", ["$scope", "tradeService", "$stateParams", "dateService", "viewService", "$state", function($scope, tradeService, $stateParams, dateService, viewService, $state) {
    var sym = $stateParams.sym
    // var date = $stateParams.date
    // var price = $stateParams.price

    $scope.dateInfo = dateService.getDateInfo();

    $scope.$watch("dateInfo.currentDate", function() {
      $scope.tradeData = tradeService.getTradeData(sym, $scope.dateInfo.currentDate)

    })

    $scope.quantity = 10
    $scope.type = "BUY"

    $scope.view = $state.current.name;

    $scope.changeView = function(view) {
      viewService.changeView(view);
    }
}])
