(function () {
'use strict';

angular.module('data')
.component('categoryList', {
  templateUrl: 'src/menu/templates/categorylist.template.html',
  bindings: {
    items: '<'
  }
});

})();
