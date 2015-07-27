angular.module('countryDetail',['ngRoute','countries'])
	.config(config)
	.controller(DetailCtrl);

config.$inject = ['$routeProvider'];
function config($routeProvider) {
	$routeProvider.when('/countries/:country/:capital?', {
		templateUrl: 'country-detail/country-detail.html',
		controller: DetailCtrl,
		resolve: {
			detail: ['countriesService', '$route', '$q', function (countriesService, $route, $q) {
				return countriesService.getCountryDetails($route.current.params.country, $route.current.params.capital);
			}]
		}
	});
}

DetailCtrl.$inject = ['$scope', 'countriesService'];

function DetailCtrl($scope, countriesService) {
	$scope.country = countriesService.currentCountry;
}