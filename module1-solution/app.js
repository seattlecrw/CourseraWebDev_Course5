(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.menu = "";
  $scope.lunchResponse = "";
  $scope.dataCheckMessage = {"color" : "black"};
  $scope.dataCheckTextBox = {"border-color" : "black"};

  $scope.checkItems = function () {
    var items = $scope.menu.split(",").filter(Boolean);

    if (items.length === 0) {
      // no data entered
      $scope.dataCheckMessage = {"color" : "red"};
      $scope.dataCheckTextBox = {"border-color" : "red"};
      $scope.lunchResponse = "Please enter data first";
    } else {
      // data entered
      $scope.dataCheckMessage = {"color" : "green"};
      $scope.dataCheckTextBox = {"border-color" : "green"};
      if (items.length <= 3) {
        $scope.lunchResponse = "Enjoy!";
      } else {
        $scope.lunchResponse = "Too much!";
      };
    };
  };
}

})();
