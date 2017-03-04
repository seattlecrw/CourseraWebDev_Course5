(function () {
"use strict";

angular.module('common')
.service('UserService', UserService);

UserService.$inject = ['$http', '$q', 'ApiPath'];
function UserService($http, $q, ApiPath) {
  var service = this;
  var currentUser;

  service.saveFormData = function (userInfo) {
    currentUser = userInfo;
  }

  service.getCurrentUser = function() {
    return currentUser;
  }

}

})();
