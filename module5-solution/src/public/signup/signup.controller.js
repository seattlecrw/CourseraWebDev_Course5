(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['MenuService', 'UserService'];
function SignupController(MenuService, UserService) {
  var $ctrl = this;

  $ctrl.submit = function () {
    // test favorite item
    var promise = MenuService.getFavorite($ctrl.favorite.toUpperCase());
    promise.then(function (response) {
      $ctrl.favoriteError = false;
      $ctrl.favorite_item = response;

      var userInfo = {
        firstname: $ctrl.firstname,
        lastname: $ctrl.lastname,
        email: $ctrl.email,
        phone: $ctrl.phone,
        favorite: $ctrl.favorite
      };
      UserService.saveFormData(userInfo);

      $ctrl.completed = true;
    })
    .catch(function (error) {
      $ctrl.favoriteError = true;
    });

  };
}


})();
