app.factory("transactionsService", ["stocksService", function(stocksService) {

  var _transactions = {};
  var _lastId = 0

  var createTransaction = function(trans) {
      if(trans["date"] === "") { return }

    _transactions[String(_lastId)] = {
      id: _lastId,
      sym: trans.sym,
      type: trans.type,
      date: trans.date,
      quantity: trans.quantity,
      price: stocksService.getPrice(trans.sym, trans.date)
    };

    _lastId++;
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

// id: {
//   id:
//   sym:
//   type:
//   date:
//   price:
// }
