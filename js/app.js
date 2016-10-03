var app = angular.module("fideligard", ["ui.router"])

app.run(function($rootScope){
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});

app.factory("_", [ "$window", function($window) {
  return $window._;
}])

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/transactions')

  $stateProvider.state("home",{
    url: "/",
    views: {
      "date": {
        templateUrl: "js/templates/date.html",
        controller: "dateCtrl"
      },

      "stocks": {
          templateUrl: "js/templates/stocks.html",
          controller: "stocksCtrl"
        },

      "portfolio": {
        templateUrl: "js/templates/portfolio.html",
        controller: "portfolioCtrl"

      }
    }
  });

  $stateProvider.state("home.trade", {
    url: "trade",
    params: {sym: "", date: "", price: "" },
    views: {
      "trade@home": {
        templateUrl: "js/templates/trade.html",
        controller: "tradeCtrl"

      }
    }
  });

  $stateProvider.state("home.transactions", {
    url: "transactions",
    params: { date: "", sym: "", type: "", quantity: "", price:"" },
    views: {
      "transactions@home": {
        templateUrl: "js/templates/transactions.html",
        controller: "transactionsCtrl"

      }
    }
  });
})