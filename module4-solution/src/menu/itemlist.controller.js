(function () {
'use strict';

angular.module('data')
.controller('ItemListController', ItemListController);

ItemListController.$inject = ['$stateParams', 'items'];
function ItemListController($stateParams, items) {
  var itemList = this;
  itemList.items = items.data.menu_items;
  itemList.symbol = $stateParams.short_name;
}

})();
