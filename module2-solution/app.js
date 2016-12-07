(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;

  toBuy.itemsToBuy = ShoppingListCheckOffService.getItemsToBuy();

  toBuy.buyItem = function (itemIndex) {
    ShoppingListCheckOffService.buyItem(itemIndex);
  };
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBought = this;

  alreadyBought.itemsBought = ShoppingListCheckOffService.getItemsBought();
}


function ShoppingListCheckOffService() {
  var service = this;

  // List of items to buy or already bought
  var itemsToBuy = [ {name: "cookies", quantity: 10},
                     {name: "milk", quantity: 2},
                     {name: "bread", quantity: 1},
                     {name: "carrots", quantity: 5},
                     {name: "coffee", quantity: 20} ];
  var itemsBought = [];

  service.buyItem = function (itemIndex) {
    var item = itemsToBuy[itemIndex];
    itemsToBuy.splice(itemIndex, 1);
    itemsBought.push(item);
  };

  service.getItemsToBuy = function () {
    return itemsToBuy;
  };

  service.getItemsBought = function () {
    return itemsBought;
  };
}

})();
