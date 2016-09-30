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
    }).then(function() {

    });
  }

  var getStockData = function() {
    return _stockData;
  }

  var _getOpenPrices = function(date) {
    var openPrices = {};
    for(var sym in _stockData){
      for(var i in _stockData[sym]) {
        tempDate = new Date(_stockData[sym][i]["Date"])

        if(_datesMatch(tempDate, date)) {
          openPrices[_stockData[sym][i]["Symbol"]] = _stockData[sym][i]["Open"]
        }
      }
    }
    return openPrices
  }


  var _datesMatch = function(date1, date2) {
    return (date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate())
  }


  var _getPastDate = function(date, days) {
    var dates = []

    for(var i in _stockData[0]) {
      var tempDate = new Date(_stockData[0][i]["Date"]+ "T22:56:02.038Z");

      if(_datesMatch(tempDate, date)) { break; }

      dates.push(new Date(_stockData[0][i]["Date"] + "T22:56:02.038Z"))
    }
    console.log(i)
    return dates[ i - days ]
  }

  var getDelta = function(currentDate, days) {
    var pastData = {}
    var pastDate = _getPastDate(currentDate, days);
    console.log(pastDate)

    // new Date(currentDate)
    // pastDate.setDate(pastDate.getDate() - days)

    for(var sym in _stockData){
      for(var i in _stockData[sym]) {
        var symbol = _stockData[sym][i]["Symbol"]
        var tempDate = new Date(_stockData[sym][i]["Date"]+ "T22:56:02.038Z");

        if(_datesMatch(tempDate, pastDate)) {
           pastData[symbol] = (_getOpenPrices(currentDate)[symbol] - _getOpenPrices(pastDate)[symbol]);
        }
      }
    }
    return pastData;
  }

  return {
    retrieveStockData: retrieveStockData,
    getStockData: getStockData,
    getDelta: getDelta,
  }
}])