(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

function FoundItemsDirective() {
  var ddo = {
    restrict: 'E',
    scope: {
      found: '<',
      onRemove: '&'
    },
    controller: NarrowItDownController,
    controllerAs: 'narrowed',
    bindToController: true,
    templateUrl: 'foundItems.html'
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrowed = this;
  var mySearch = null;
  narrowed.found = {};

  // Add ability to select search term
  narrowed.getItems = function() {
    mySearch = narrowed.searchTerm;

    var promise = MenuSearchService.getMatchedMenuItems(mySearch);
    promise.then(function (response) {
      narrowed.found = response;
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
  };

  // function to remove unwanted items
  narrowed.removeItem = function (itemIndex) {
    narrowed.found.splice(itemIndex, 1);
  };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
    }).then(function (result) {
      // process result and only keep items that match
      var items = result.data.menu_items;
      var foundItems = [];
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (item.description.toLowerCase().indexOf(searchTerm) != -1) {
           foundItems.push(item);
        };
      };
      // return processed items
      return foundItems;
    });
  }
}

})();
