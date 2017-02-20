(function () {
'use strict';

angular.module('data')
.component('categoryList', {
  templateUrl: 'src/menu/templates/categoryList.template.html',
  bindings: {
    items: '<'
  }
});

})();
