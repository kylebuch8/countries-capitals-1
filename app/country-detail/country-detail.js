angular.module('countryDetail',['ngRoute','countries'])
	.config(config)
	.controller(DetailCtrl);

config.$inject = ['$routeProvider'];
function config($routeProvider) {
	$routeProvider.when('/countries/:country/:capital', {
		templateUrl: 'country-detail/country-detail.html',
		controller: DetailCtrl,
		resolve: {
			detail: ['countriesService', '$route', function (countriesService, $route) {
				return countriesService.getCountries()
					.then(function () {
						return countriesService.getCountry($route.current.params.country);
					})
					.then(function () {
						return countriesService.getCapital($route.current.params.capital);
					})
					.then(function () {
						return countriesService.getNeighbors(countriesService.currentCountry.countryCode);
					});
			}]
			// },
			// country: function(countriesService, $route) {
			// 	return countriesService.getCountry($route.current.params.country);
			// },
			// capital: function($route, countriesService) {
			// 	return countriesService.getCapital($route.current.params.capital);
			// },
			// neighbors: function($route, countriesService) {
			// 	console.log('country: ' + countriesService.currentCountry);
			// 	return countriesService.getNeighbors(countriesService.currentCountry.countryCode);
			// },
		}
	});
}

/*countryController.$inject = [''];*/
function DetailCtrl($scope, countriesService) {
	$scope.country = countriesService.currentCountry;
	// $scope.capital = capital;
	// $scope.neighbors = neighbors;
}
