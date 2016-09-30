app.factory("dateService", ["stocksService", function(stocksService) {
  // put into date info obj

  var _minDate = new Date("January 1 , 2014")
  var _maxDate = new Date("December 31 , 2014")
  var _dates = []
  var _currentDate = new Date();

  var _dateInfo = {
    minDate: _minDate,
    maxDate: _maxDate,
    currentDate: _currentDate
  }

  var getDateInfo = function() {
    return _dateInfo;
  }

  var getDateRange = function() {
    return { min: _dateInfo.minDate, max: _dateInfo.maxDate }
  }


  var _getDatesFromStockData = function(stockData) {
    for(var i in stockData) {
      _dates.push(new Date(stockData[i]["Date"] + "T22:56:02.038Z"))
    }
  }

  var getDates = function(stockData) {
    _getDatesFromStockData(stockData);
    return _dates.reverse();
  }

  var setCurrentDate = function(date) {
    _dateInfo.currentDate = date
    return _dateInfo.currentDate
  }

  var getCurrentDate = function() {
    return _dateInfo.currentDate
  }

  return {
    getDateRange: getDateRange,
    getDates: getDates,
    setCurrentDate: setCurrentDate,
    getCurrentDate: getCurrentDate,
    getDateInfo: getDateInfo
  }
}])