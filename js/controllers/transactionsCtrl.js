app.controller("transactionsCtrl", ["$scope", "$stateParams",  "transactionsService", "viewService", "$state", "_", function($scope,$stateParams, transactionsService, viewService, $state, _) {

    $scope.transData = transactionsService.createTransaction($stateParams)
    $scope.transactions = _.values(transactionsService.getTransactions());

    $scope.view = $state.current.name;

    $scope.changeView = function(view) {
      viewService.changeView(view);
    }
}])