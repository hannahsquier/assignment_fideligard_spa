app.factory("tradeService", ["stocksService", "transactionsService", "portfolioService", function(stocksService, transactionsService, portfolioService) {
  var _tradeData = {};

  var getTradeData = function(sym, date) {
    _tradeData["Symbol"] = sym;
    _tradeData["Date"] = date;
    _tradeData["Price"] = stocksService.getPrice(sym, date);
    return _tradeData;
  }

  var validate = function(quantity, type) {
    var portfolio = portfolioService.getPortfolio();
    var bank = portfolioService.getOverall().bank;
    var validator = {}

    if(type === "buy") {
      if(bank >= quantity * _tradeData.Price) {
        validator.valid = true;
      } else {
        validator.valid = false;
        validator.message = "You do not have enough money in the bank to buy this much stock."
      }
    } else if (type === "sell") {
      console.log(portfolio[_tradeData.Symbol].quantity, quantity)

      if(portfolio[_tradeData.Symbol] && portfolio[_tradeData.Symbol].quantity >= quantity) {
        validator.valid = true
      } else {
        validator.valid = false
        validator.message = "You cannot sell more stock than you have."
      }
    }
    return validator
  }


  return {

    getTradeData: getTradeData,
    validate: validate
  }
}])