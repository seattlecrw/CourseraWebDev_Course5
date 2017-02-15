(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiPath', "https://davids-restaurant.herokuapp.com/menu_items.json");

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrowed = this;
  var mySearch = null;
  var searched = false;
  narrowed.found = {};

  // Add ability to select search term
  narrowed.getItems = function() {
    // set search parameter
    if (narrowed.searchTerm === null || narrowed.searchTerm === "") {
      mySearch = null;
    } else  {
      mySearch = narrowed.searchTerm;
    }

    // resolve promise from http call
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

MenuSearchService.$inject = ['$http', 'ApiPath'];
function MenuSearchService($http, ApiPath) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {
    return $http({
      method: "GET",
      url: ApiPath,
    }).then(function (result) {
      // process result and only keep items that match
      if (searchTerm !== null) {
        var items = result.data.menu_items;
        var foundItems = [];
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          if (item.description.toLowerCase().indexOf(searchTerm) != -1) {
             foundItems.push(item);
          };
        };
      };
      // return processed items
      return foundItems;
    });
  }
}

FoundItemsDirective.$inject = [];
function FoundItemsDirective() {
  var ddo = {
    restrict: 'E',
    scope: {
      found: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'narrowed',
    bindToController: true,
    templateUrl: 'foundItems.html'
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var narrowed = this;

	narrowed.showEmpty = function() {
    return (narrowed.found === undefined || narrowed.found.length === 0);
	}
}

})();
