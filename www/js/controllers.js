angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})


.controller('PlaylistsCtrl', function($scope, $http, $log) {

  var superheroes = [];
  var timestamp = Date.now();
  var public_key = "0f3ada3d3a88add4430fa9b49de33558";
  var private_key = "8e65faa79eaa382e9a6b215cb545b5ec06d4afb5";

  var characters_url = "http://gateway.marvel.com/v1/public/characters";

  var hash = md5(timestamp.toString() + private_key + public_key);

  var data = {
    ts : timestamp,
    apikey : public_key,
    hash : md5(timestamp.toString() + private_key + public_key),
    limit : "10"
  };

  var params = "?" + $.param(data);

  $http.get(characters_url + params).
  success(function(data, status, header, config){
    $log.log(data.data.results);
    $log.log("status " + status);
    $log.log(config);

    $scope.superheroes = data.data.results;
  }).
  error(function(data, status, header, config){
    $log.log(data);
    $log.log("status " + status);
    $log.log(config);
  });


})

.controller('PlaylistCtrl', function($scope, $stateParams, $http, $log) {

  var superheroes = [];
  var timestamp = Date.now();
  var public_key = "0f3ada3d3a88add4430fa9b49de33558";
  var private_key = "8e65faa79eaa382e9a6b215cb545b5ec06d4afb5";

  var characters_url = "http://gateway.marvel.com/v1/public/characters/1011334";

  var hash = md5(timestamp.toString() + private_key + public_key);

  var data = {
    id : $stateParams.playlistId,
    ts : timestamp,
    apikey : public_key,
    hash : md5(timestamp.toString() + private_key + public_key),
    limit : "10"
  };

  $log.info($stateParams)

  var params = "?" + $.param(data);

  $http.get(characters_url + params).
  success(function(data, status, header, config){
    $log.log(data.data);
    $log.log("status " + status);
    $log.log(config);

    $scope.superheroe = data.data.results[0];
  }).
  error(function(data, status, header, config){
    $log.log(data);
    $log.log("status " + status);
    $log.log(config);
  });

});
