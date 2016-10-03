app.factory("transactionsService", ["stocksService", function(stocksService) {

  var _transactions = [];

  var createTransaction = function(trans) {
      if(trans["date"] === "") { return }

    _transactions.push(trans);
    return _transactions;
  };

  var getTransactions = function() {
    return _transactions;
  };

  return {
    createTransaction: createTransaction,
    getTransactions: getTransactions
  };

}]);
