(function () {
"use strict";

angular.module('public')
.controller('UserController', UserController);

UserController.$inject = ['user', 'MenuService', 'UserService', 'ApiPath'];
function UserController(user, MenuService, UserService, ApiPath) {
  var $ctrl = this;
  $ctrl.user = user;
  $ctrl.basePath = ApiPath;

  if (user != undefined) {
    // no data access error
    $ctrl.dataError = false;
    $ctrl.dataFound = true;

    // get additional info for favorite menu item
    var promise = MenuService.getFavorite(user.favorite.toUpperCase());
    promise.then(function (response) {
      $ctrl.favorite = response;
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
  } else {
    $ctrl.dataFound = false;
    $ctrl.dataError = true;
  }
}


})();
