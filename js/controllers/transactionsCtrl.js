app.controller("transactionsCtrl", ["$scope", "stocksService", "$stateParams",  "transactionsService", function($scope, stocksService,$stateParams, transactionsService) {

    $scope.transData = transactionsService.createTransaction($stateParams)
    $scope.transactions = transactionsService.getTransactions();
}])