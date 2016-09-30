app.controller("stocksCtrl", ["$scope", "stocksService", "dateService", "_", function($scope, stocksService, dateService, _) {
  stocksService.retrieveStockData("AAPL");

  $scope.dateInfo = dateService.getDateInfo();
console.log($scope.dateInfo)
  $scope.currentDate = dateService.getCurrentDate();

  stocksService.retrieveStockData().then( function() {
    $scope.stockData = _.flattenDeep(stocksService.getStockData());
  })

}])