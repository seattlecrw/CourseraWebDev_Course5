(function () {
'use strict';

angular.module('data')
.controller('CategoryListController', CategoryListController);

CategoryListController.$inject = ['items'];
function CategoryListController(items) {
  var categoryList = this;
  categoryList.items = items.data;
}

})();
