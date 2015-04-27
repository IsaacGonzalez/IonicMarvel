var marvelApp = angular.module('starter.controllers', ['marvelService']);


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
