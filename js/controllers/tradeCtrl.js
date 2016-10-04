app.controller("tradeCtrl", ["$scope", "tradeService", "$stateParams", "dateService", "viewService", "$state", "portfolioService", function($scope, tradeService, $stateParams, dateService, viewService,$state, portfolioService) {
    var sym = $stateParams.sym
    // var date = $stateParams.date
    // var price = $stateParams.price

    $scope.dateInfo = dateService.getDateInfo();

    $scope.$watch("dateInfo.currentDate", function() {
      $scope.tradeData = tradeService.getTradeData(sym, $scope.dateInfo.currentDate)

    })
    $scope.validate = function() {
      $scope.validator = tradeService.validate($scope.quantity, $scope.type)
    }

    $scope.overallStats = portfolioService.getOverall();

    $scope.quantity = 10
    $scope.type = "buy"
    $scope.validator = tradeService.validate($scope.quantity, $scope.type)

    $scope.view = $state.current.name;

    $scope.changeView = function(view) {
      viewService.changeView(view);
    }
}])
