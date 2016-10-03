app.controller("stocksCtrl", ["$scope", "stocksService", "dateService", "_", function($scope, stocksService, dateService, _) {


  stocksService.retrieveStockData().then( function() {
    $scope.dateInfo = dateService.getDateInfo();
    $scope.stockData = _.flattenDeep(stocksService.getStockData());

    stocksService.retrieveStockObj().then (function() {
      $scope.stockObj = stocksService.getStockObj()

      $scope.$watch("dateInfo.currentDate", function() {

        $scope.deltaData = { "1": stocksService.getDelta($scope.dateInfo.currentDate, 1),
                         "7": stocksService.getDelta($scope.dateInfo.currentDate, 5),
                        "30": stocksService.getDelta($scope.dateInfo.currentDate, 20)}
    })


    })
  })

}])