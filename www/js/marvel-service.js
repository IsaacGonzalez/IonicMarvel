(function(){

    var app = angular.module('marvelService', []);


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
            limit: "10",
            orderBy: "-modified"
        };

        var params = "?" + $.param(data);

        return ($http.get(apiMarvelConfigService.marvelUrlAPI + '/characters' + params).then(handleSuccess, handleError));
    };

    this.getCharacter=function(marvelSuperHeroeId) {
        var data = {
            ts: apiMarvelConfigService.marvelTimeStamp,
            apikey: apiMarvelConfigService.marvelPublicKey,
            hash: apiMarvelConfigService.marvelHash,
            limit: "1"
        };

        var params = "?" + $.param(data);

        return ($http.get(apiMarvelConfigService.marvelUrlAPI + '/characters/'+marvelSuperHeroeId + params).then(handleSuccess, handleError));
    };

    this.getCharacterByName=function(marvelHeroeName) {
        var data = {
            ts: apiMarvelConfigService.marvelTimeStamp,
            apikey: apiMarvelConfigService.marvelPublicKey,
            hash: apiMarvelConfigService.marvelHash,
            limit: "10",
            nameStartsWith:marvelHeroeName
        };

        var params = "?" + $.param(data);

        return ($http.get(apiMarvelConfigService.marvelUrlAPI + '/characters'+ params).then(handleSuccess, handleError));
    };


    this.getComic=function(marvelComicId) {
        var data = {
            ts: apiMarvelConfigService.marvelTimeStamp,
            apikey: apiMarvelConfigService.marvelPublicKey,
            hash: apiMarvelConfigService.marvelHash,
            limit: "1"
        };

        var params = "?" + $.param(data);

        return ($http.get(apiMarvelConfigService.marvelUrlAPI + '/comics/'+marvelComicId + params).then(handleSuccess, handleError));
    };

    this.getComicsBySuperheroe=function(marvelSuperHeroeId) {
        var data = {
            ts: apiMarvelConfigService.marvelTimeStamp,
            apikey: apiMarvelConfigService.marvelPublicKey,
            hash: apiMarvelConfigService.marvelHash,
            limit: "1"
        };

        var params = "?" + $.param(data);

        return ($http.get(apiMarvelConfigService.marvelUrlAPI + '/characters/' + marvelSuperHeroeId + '/comics' + params).then(handleSuccess, handleError));
    };

    function handleError(response) {
        if (!angular.isObject(response.data) ||
            !response.data.message
        ) {
            return null /* ($q.reject("An unknown error occurred.")) */;
        }
        return null /*($q.reject(response.data.message))*/;

    }

    function handleSuccess(response) {
        $log.info(response);
        return (response.data.data.results);
    }

}]);
  })();