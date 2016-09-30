app.controller("tradeCtrl", ["$scope", "stocksService", "$stateParams",  "tradeService", function($scope, stocksService,$stateParams, tradeService) {

  stocksService.retrieveStockData().then( function() {

    var sym = $stateParams.sym
    var date = $stateParams.date
    var price = $stateParams.price
//    console.log(stocksService.getStockData())

    $scope.tradeData = tradeService.getTradeData(sym, date, price)
  })
}])