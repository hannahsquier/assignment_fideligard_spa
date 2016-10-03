app.controller("tradeCtrl", ["$scope", "tradeService", "$stateParams", "dateService", function($scope, tradeService, $stateParams, dateService) {
    var sym = $stateParams.sym
    // var date = $stateParams.date
    var price = $stateParams.price

    $scope.dateInfo = dateService.getDateInfo();

   $scope.$watch("dateInfo.currentDate", function() {
    $scope.tradeData = tradeService.getTradeData(sym, $scope.dateInfo.currentDate, price)

  })
    $scope.quantity = 10
    $scope.type = "BUY"
}])
