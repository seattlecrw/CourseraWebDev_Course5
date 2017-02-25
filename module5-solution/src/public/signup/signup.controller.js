(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);

function SignupController() {
  var signup = this;

  signup.submit = function () {
    signup.completed = true;
  };
}


})();
