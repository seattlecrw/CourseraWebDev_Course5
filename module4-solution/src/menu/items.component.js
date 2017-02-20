(function () {
'use strict';

angular.module('data')
.component('items', {
  templateUrl: 'src/menu/templates/items.template.html',
  bindings: {
    items: '<'
  }
});

})();
