app.factory("stocksService", ["$http", "$q", "_", function($http, $q, _) {
  var _stockData = [];
  var _stockObj = {};
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

  var retrieveStockObj = function() {
    var requests = [];
    for(var s in _symbols) {
      requests.push($http.get("/data/" + _symbols[s] + ".json"))
    }
    return $q.all(requests).then( function(response){
      for (var i = 0 in response) {
        _stockObj[response[i].data.query.results.quote[0].Symbol] = {}

        for(var j in response[i].data.query.results.quote) {
          _stockObj[response[i].data.query.results.quote[0].Symbol][response[i].data.query.results.quote[j].Date] =
          response[i].data.query.results.quote[j]
        }
      }
    })
  };

  var getStockObj = function() {
    return _stockObj;
  }

  var getStockData = function() {
    return _stockData;
  }

  var _getClosePrices = function(date) {
    var closePrices = {};
    for(var sym in _stockData){
      for(var i in _stockData[sym]) {
        tempDate = new Date(_stockData[sym][i]["Date"])

        if(_datesMatch(tempDate, date)) {
          closePrices[_stockData[sym][i]["Symbol"]] = _stockData[sym][i]["Close"]
        }
      }
    }
    return closePrices
  }


  var _datesMatch = function(date1, date2) {
    return (date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate())
  }


  var _getPastDate = function(date, days) {
    var dates = _.map(Object.keys(_stockObj.AAPL).sort(), function(elem) { return new Date(elem + "T22:56:02.038Z") })
    for(var i in dates) {
      if(_datesMatch(dates[i], date)) { var index = i}
    }
    return dates[index - days]
  }

  var _kabobify = function(date) {
    month = date.getMonth() + 1
    day = date.getDate()
    if(month / 10 < 1) { month = "0" + String(month)}
    if(day / 10 < 1) { day = "0" + day}
    return [date.getFullYear(), month, day ].join("-")
  }

  var getDelta = function(currentDate, days) {
    var pastData = {}
    var pastDate = _getPastDate(currentDate, days);

    for(var sym in _stockObj){
      var closePast = _stockObj[sym][_kabobify(pastDate)]["Close"];
      var closeCurrent = _stockObj[sym][_kabobify(currentDate)]["Close"];

      pastData[sym] = (closeCurrent - closePast);

    }
    return pastData;
  }




  return {
    retrieveStockData: retrieveStockData,
    retrieveStockObj: retrieveStockObj,
    getStockData: getStockData,
    getDelta: getDelta,
    getStockObj: getStockObj,
  }
}])