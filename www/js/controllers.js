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
marvelApp.controller('BrowseCtrl', ['$scope', '$http', '$log', 'apiMarvelCharactersService', function($scope, $http, $log, apiMarvelCharactersService) {

    $scope.refreshComic = function() {

        apiMarvelCharactersService.getComic(51630).then(function(comic) {
            $scope.comicBrowse1 = comic[0];
        });
        apiMarvelCharactersService.getComic(51808).then(function(comic) {
            $scope.comicBrowse2 = comic[0];
        });
        apiMarvelCharactersService.getComic(52459).then(function(comic) {
            $scope.comicBrowse3 = comic[0];
        });
        apiMarvelCharactersService.getComic(51855).then(function(comic) {
            $scope.comicBrowse4 = comic[0];
        });
        apiMarvelCharactersService.getComic(51972).then(function(comic) {
            $scope.comicBrowse5 = comic[0];
        });
        apiMarvelCharactersService.getComic(51538).then(function(comic) {
            $scope.comicBrowse6 = comic[0];
        });
        apiMarvelCharactersService.getComic(51801).then(function(comic) {
            $scope.comicBrowse7 = comic[0];
        });
        apiMarvelCharactersService.getComic(47113).then(function(comic) {
            $scope.comicBrowse8 = comic[0];
        });
    }
    $scope.refreshComic();

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

marvelApp.controller('SearchCtrl',['$scope', '$http', '$log','$stateParams', 'apiMarvelCharactersService', function($scope, $http, $log,$stateParams, apiMarvelCharactersService){
    $scope.superHereoName='';
    $scope.searchSuperHeroe = function(superHereoName) {
        // The friendService returns a promise.
        apiMarvelCharactersService.getCharacterByName(superHereoName).then(function(superheroes) {
            $scope.superheroes = superheroes;
            $log.info(superheroes);
        });
    }

}]);
