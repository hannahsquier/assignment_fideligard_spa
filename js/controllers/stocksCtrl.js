app.controller("stocksCtrl", ["$scope", "stocksService", "dateService", function($scope, stocksService, dateService) {
  stocksService.retrieveStockData("AAPL");

  $scope.dateInfo = dateService.getDateInfo();
  $scope.currentDate = dateService.getCurrentDate();
  $scope.stockData = stocksService.getStockData();

}])