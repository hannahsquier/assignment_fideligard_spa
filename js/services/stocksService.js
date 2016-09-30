app.factory("stocksService", ["$http", "$q", "_", function($http, $q, _) {
  var _stockData = [];
  var _dates = [];

 var _symbols = [
      'a',
      'aapl',
      'abc',
      'bac',
      'cbs',
      'fb',
      'goog',
      'nflx',
      'nke',
      'sam',
      'twtr',
      'tsla',
      'wfm'
    ];
// "http://query.yahooapis.com/v1/public/yql?q=%20select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20=%20%22"
//       + _symbols[s] + "%22%20and%20startDate%20=%20%222014-01-01%22%20and%20endDate%20=%20%222014-12-31%22%20&format=json%20&diagnostics=true%20&env=store://datatables.org/alltableswithkeys%20&callback="

  var retrieveStockData = function() {

    var requests = [];
    for(var s in _symbols) {
      requests.push($http.get("/data/" + _symbols[s] + ".json"))
    }

    return $q.all(requests).then( function(response){
      _stockData = []
      for (var i = 0 in response) {
          _stockData.push(response[i].data.query.results.quote);
        }
    })
  }

  var getStockData = function(date) {
    return _stockData;
  }



  return {
    retrieveStockData: retrieveStockData,
    getStockData: getStockData
  }
}])