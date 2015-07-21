angular.module('countryDetail',['ngRoute','countries'])
	.config(config)
	.controller(DetailCtrl);

config.$inject = ['$routeProvider'];
function config($routeProvider) {
	$routeProvider.when('/countries/:country/:capital', {
		templateUrl: 'country-detail/country-detail.html',
		controller: DetailCtrl,
		resolve: {
			detail: ['countriesService', '$route', '$q', function (countriesService, $route, $q) {
				return countriesService.getCountries()
					.then(function () {
						return $q.all([
							countriesService.getCountry($route.current.params.country),
							countriesService.getCapital($route.current.params.capital)
						]).then(function () {
							return countriesService.getNeighbors(countriesService.currentCountry.countryCode);
						});
					});
			}]
		}
	});
}

DetailCtrl.$inject = ['$scope', 'countriesService'];

function DetailCtrl($scope, countriesService) {
	$scope.country = countriesService.currentCountry;
}
