app.controller("portfolioCtrl", ["$scope", "$state", "viewService", "portfolioService", "dateService", "_", function($scope, $state, viewService, portfolioService, dateService, _) {
  $scope.view = $state.current.name;

  $scope.changeView = function(view) {
      viewService.changeView(view);
    }

  $scope.portfolio = _.values(portfolioService.getPortfolio());

  $scope.overallStats = portfolioService.getOverall();
  $scope.dateInfo = dateService.getDateInfo();


  $scope.$watch("dateInfo.currentDate", function() {
   new Promise(function() {
    portfolioService.buildPortfolioFromTransactions($scope.dateInfo.currentDate)}).then(
      $scope.portfolio = _.values(portfolioService.getPortfolio())).then(
      $scope.overallStats = portfolioService.getOverall()
    );
  })
}])