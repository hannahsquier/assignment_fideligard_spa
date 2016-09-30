app.factory("stocksService", ["$http", function($http) {
  var _stockData = [];
  var _dates = [];

  var retrieveStockData = function(stock) {
    return $http.get("http://query.yahooapis.com/v1/public/yql?q=%20select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20=%20%22"
      + stock + "%22%20and%20startDate%20=%20%222014-01-01%22%20and%20endDate%20=%20%222014-12-31%22%20&format=json%20&diagnostics=true%20&env=store://datatables.org/alltableswithkeys%20&callback=")

    .then( function(response){
      angular.copy(response.data.query.results.quote, _stockData)
    })
  }

  var getStockData = function(date) {
    return _stockData
  }



  return {
    retrieveStockData: retrieveStockData,
    getStockData: getStockData
  }
}])