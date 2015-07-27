angular.module('countriesList',['ngRoute','countries'])
	.config(config)
	.controller('CountriesCtrl', CountriesCtrl);

config.$inject = ["$routeProvider"];
function config($routeProvider) {
	$routeProvider.when('/countries', {
		templateUrl: 'countries-list/countries-list.html',
		controller: CountriesCtrl,
		resolve: {
			countries: function(countriesService) {
				return countriesService.getCountries();
			}
		}
	});
}

CountriesCtrl.$inject = ['$scope','$location', 'countries'];
function CountriesCtrl($scope, $location, countries) {
	$scope.countries = countries;

	$scope.redirect = function (obj) {
		countriesService.currentCountry = obj;
		$location.path('countries/' + obj.countryName + '/' + obj.capital);
	}
};