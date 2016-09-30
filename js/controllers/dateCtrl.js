app.controller("dateCtrl", ["$scope", "dateService", "stocksService", function($scope, dateService, stocksService) {
  $scope.minDate = dateService.getDateRange().min
  $scope.maxDate = dateService.getDateRange().max

  stocksService.retrieveStockData().then( function() {

    $scope.dates = dateService.getDates(stocksService.getStockData()[0])
    console.log($scope.dates)
    $scope.index = $scope.dates.length / 2;

    $scope.$watch("index", function() {
      $scope.currentDate = dateService.setCurrentDate($scope.dates[$scope.index])
    })

  })



}])