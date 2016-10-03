app.controller("portfolioCtrl", ["$scope", "$state", "viewService", "portfolioService", "dateService", "_", function($scope, $state, viewService, portfolioService, dateService, _) {
  $scope.view = $state.current.name;

  $scope.changeView = function(view) {
      viewService.changeView(view);
    }

  $scope.portfolio = _.values(portfolioService.getPortfolio());

  $scope.dateInfo = dateService.getDateInfo();

  $scope.$watch("dateInfo.currentDate", function() {
    $scope.portfolio = _.values(portfolioService.updatePortfolio($scope.dateInfo.currentDate));
  })
}])