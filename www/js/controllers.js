var marvelApp = angular.module('starter.controllers', []);

marvelApp.service('apiMarvelConfigService', function() {
    var self = this;
    var timestamp = Date.now();
    var public_key = "0f3ada3d3a88add4430fa9b49de33558";
    var private_key = "8e65faa79eaa382e9a6b215cb545b5ec06d4afb5";
    this.marvelUrlAPI = "http://gateway.marvel.com/v1/public";
    this.marvelTimeStamp = timestamp;
    this.marvelPublicKey = public_key;
    this.marvelPrivateKey = private_key;
    this.marvelHash = md5(timestamp.toString() + private_key + public_key);
});



marvelApp.service('apiMarvelCharactersService', ['$http', '$log', 'apiMarvelConfigService', function($http, $log, apiMarvelConfigService) {
    this.topTenCharacters;
    var self = this;
    this.getTopTenCharacters = function() {
        var data = {
            ts: apiMarvelConfigService.marvelTimeStamp,
            apikey: apiMarvelConfigService.marvelPublicKey,
            hash: apiMarvelConfigService.marvelHash,
            limit: "10"
        };

        var params = "?" + $.param(data);

        return ($http.get(apiMarvelConfigService.marvelUrlAPI + '/characters' + params).then(handleSuccess, handleError));
    };

    this.getCharacter=function(marvelSuperHeroeId) {
        var data = {
            ts: apiMarvelConfigService.marvelTimeStamp,
            apikey: apiMarvelConfigService.marvelPublicKey,
            hash: apiMarvelConfigService.marvelHash,
            limit: "10"
        };

        var params = "?" + $.param(data);

        return ($http.get(apiMarvelConfigService.marvelUrlAPI + '/characters/'+marvelSuperHeroeId + params).then(handleSuccess, handleError));
    };

    function handleError(response) {
        if (!angular.isObject(response.data) ||
            !response.data.message
        ) {
            return ($q.reject("An unknown error occurred."));
        }
        return ($q.reject(response.data.message));

    }

    function handleSuccess(response) {
        $log.info(response);
        return (response.data.data.results);
    }

}]);



marvelApp.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
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
});

marvelApp.controller('PlaylistsCtrl', ['$scope', '$http', '$log', 'apiMarvelCharactersService', function($scope, $http, $log, apiMarvelCharactersService) {

    $scope.superheroes = [];
    // apiMarvelCharactersService.getTopTenCharacters($scope.superheroes);
    $scope.refreshTopTenSuperHeroes = function() {

        // The friendService returns a promise.
        apiMarvelCharactersService.getTopTenCharacters().then(function(superheroes) {
            $scope.superheroes = superheroes;
        });
    }
    $scope.refreshTopTenSuperHeroes();

}]);

marvelApp.controller('PlaylistCtrl',['$scope', '$http', '$log','$stateParams', 'apiMarvelCharactersService', function($scope, $http, $log,$stateParams, apiMarvelCharactersService){
    // apiMarvelCharactersService.getTopTenCharacters($scope.superheroes);
    $log.info($stateParams);
    $scope.refreshHeroe = function() {

        // The friendService returns a promise.
        apiMarvelCharactersService.getCharacter($stateParams.playlistId).then(function(superheroes) {
            $scope.superheroe = superheroes[0];
        });
    }
    $scope.refreshHeroe();

}]);
