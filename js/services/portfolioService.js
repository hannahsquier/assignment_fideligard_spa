app.factory("portfolioService", ["stocksService", function(stocksService) {

  var _portfolio = {}


  var addStock = function(stock) {

    if(_portfolio[stock.sym]) {
      _addToExistingStock(stock)
    } else {
      _addNewStock(stock)
    }

  }

  var _addNewStock = function(stock) {
    _portfolio[stock.sym] = {
      sym: stock.sym,
      quantity: stock.quantity,
      profit: 0,
      date: stock.date,
      transactions: [stock.id],
      buyPrice: stocksService.getPrice(stock.sym, stock.date),
      stockInfo: {
        currentPrice: stocksService.getPrice(stock.sym, stock.date),
        "1d": stocksService.getDelta(stock.date, 1)[stock.sym],
        "7d": stocksService.getDelta(stock.date, 5)[stock.sym],
        "30d": stocksService.getDelta(stock.date, 20)[stock.sym],
      }
    }
  }

  var _addToExistingStock = function(stock) {
    var oldQuantity = _portfolio[stock.sym].quantity
    var newQuantity = stock.quantity
    var oldBuyPrice = _portfolio[stock.sym].buyPrice
    var newBuyPrice =  stocksService.getPrice(stock.sym, stock.date)

    _portfolio[stock.sym].buyPrice =  (oldQuantity * oldBuyPrice + newQuantity * newBuyPrice) / (oldQuantity + newQuantity)
    _portfolio[stock.sym].quantity += newQuantity
    console.log(_portfolio.transactions)
    _portfolio[stock.sym].transactions.push(stock.id)
  }


  var updatePortfolio = function(date) {
    for(var stock in _portfolio) {
      _portfolio[stock].stockInfo = {
        currentPrice: stocksService.getPrice(_portfolio[stock].sym, date),
        "1d": stocksService.getDelta(date, 1)[_portfolio[stock].sym],
        "7d": stocksService.getDelta(date, 5)[_portfolio[stock].sym],
        "30d": stocksService.getDelta(date, 20)[_portfolio[stock].sym],
      }
    }
    return _portfolio
  }

  var buildPortfolioFromTransactions = function(transactions) {

  }

  var getPortfolio = function() {
    return _portfolio
  }

  return {
    addStock: addStock,
    getPortfolio: getPortfolio,
    updatePortfolio: updatePortfolio
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
