app.factory("portfolioService", ["stocksService", "transactionsService", function(stocksService, transactionsService) {

  var _portfolio = {}
  var _overall = { bank: 1000 }


  var _addTransaction = function(trans, date) {

    if(_portfolio[trans.sym] && trans.type === "buy") {
      _addToExistingStock(trans, date)
    } else if(trans.type === "buy") {
      _addNewStock(trans, date)

    } else if (trans.type === "sell") {
      _sellStock(trans, date)

    }
    return _portfolio
  }

  var _sellStock = function(stock, date) {
      _overall.bank += (stocksService.getPrice(stock.sym, date) - _portfolio[stock.sym].buyPrice) * stock.quantity

    if(stock.quantity === _portfolio[stock.sym].quantity) {
      delete _portfolio[stock.sym]
    } else {
      _portfolio[stock.sym].quantity -= stock.quantity
    }
  }

  var _addNewStock = function(stock, date) {

     _overall.bank -= stock.quantity * stocksService.getPrice(stock.sym, stock.date)

    _portfolio[stock.sym] = {
      sym: stock.sym,
      quantity: stock.quantity,
      profit: 0,
      date: stock.date,
      transactions: [stock.id],
      buyPrice: stocksService.getPrice(stock.sym, stock.date),
      stockInfo: {
        currentPrice: stocksService.getPrice(stock.sym, date),
        "1d": stocksService.getDelta(date, 1)[stock.sym],
        "7d": stocksService.getDelta(date, 5)[stock.sym],
        "30d": stocksService.getDelta(date, 20)[stock.sym],
      }
    }
  }

  var _addToExistingStock = function(stock) {
    var oldQuantity = _portfolio[stock.sym].quantity
    var newQuantity = stock.quantity
    var oldBuyPrice = _portfolio[stock.sym].buyPrice
    var newBuyPrice =  stocksService.getPrice(stock.sym, stock.date)

    _overall.bank -= newQuantity * newBuyPrice

    _portfolio[stock.sym].buyPrice =  (oldQuantity * oldBuyPrice + newQuantity * newBuyPrice) / (oldQuantity + newQuantity)
    _portfolio[stock.sym].quantity += newQuantity
    _portfolio[stock.sym].transactions.push(stock.id)
  }

  var buildPortfolioFromTransactions = function(currentDate) {
    _portfolio = {}
    _overall = { bank: 1000 }

    var transactions = transactionsService.getTransactions();
    for(var t in transactions) {
      if(transactions[t].date <= currentDate) {
         _addTransaction(transactions[t], currentDate)
      }
    }
  }

  var getPortfolio = function() {
    return _portfolio
  }

  var getOverall = function() {
    return _overall
  };

  return {
    buildPortfolioFromTransactions: buildPortfolioFromTransactions,
    getPortfolio: getPortfolio,
    getOverall: getOverall
  }

}]);




// {
//   "sym": {
//     sym:
//     quantity:
//     profit:
//    transactions: []
//     stockInfo: {
//       currentPrice:
//       1d:
//       7d:
//       30d:
//     }
//   }
// }
