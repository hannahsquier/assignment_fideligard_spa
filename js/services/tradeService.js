app.factory("tradeService", ["stocksService", function(stocksService) {
  var _tradeData = {};

  var getTradeData = function(sym, date, price) {
    _tradeData["Symbol"] = sym
    _tradeData["Date"] = date
    _tradeData["Price"] = price;
    return _tradeData
  }

  return {
    getTradeData: getTradeData
  }

}]);
