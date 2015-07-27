angular.module('countries', [])
    .factory('countriesService', countriesService);

countriesService.$inject = ['$http', '$filter', '$q'];
function countriesService($http, $filter, $q) {
	var countriesService = {
			countries: countries,
			currentCountry: currentCountry,
			getCountry: getCountry,
			getCountries: getCountries,
			getCapital: getCapital,
			getNeighbors: getNeighbors,
			getCountryDetails: getCountryDetails
		},
		currentCountry,
		countries;

	function searchArray(array,valuetofind) {
    for (i = 0; i < array.length; i++) {
	        if (array[i]['countryName'] === valuetofind) {
	            return array[i];
	        }
	    }
	    return -1;
	}

	function getCountryDetails(country, capital) {
		var deferred = $q.defer();

		countriesService.getCountries()
			.then(function () {
				return $q.all([
					countriesService.getCountry(country),
					countriesService.getCapital(capital)
				]).then(function () {
					return countriesService.getNeighbors(countriesService.currentCountry.countryCode);
				}).then(function(response) {
					deferred.resolve(response);
				});
			});
		return deferred.promise;
	}

	function getCountries() {
		var deferred = $q.defer();

		if (!countriesService.countries) {
			var request = $http({
				url: 'http://api.geonames.org/countryInfo',
				method: 'GET',
				cache: true,
				params: {
					username: 'sdotson2015',
					type: 'JSON'
				}
			}),
			response = request.then(countriesSuccess, promiseError);
			deferred.resolve(response);
		} else {
			response = countriesService.countries;
			deferred.resolve(response);
		};

		return deferred.promise;
	}

	function getCapital(capital) {
		var deferred = $q.defer();
		if (!capital) {
			deferred.resolve('');
		} else {
			var request = $http({
				url: 'http://api.geonames.org/searchJSON',
				method: 'GET',
				cache: true,
				params: {
					username: 'sdotson2015',
					q: capital
				}
			});

			deferred.resolve(request.then(capitalSuccess, promiseError));
		};

		return deferred.promise;
	}

	function getNeighbors(country) {
		var request = $http({
			url: 'http://api.geonames.org/neighboursJSON',
			method: 'GET',
			cache: true,
			params: {
				username: 'sdotson2015',
				country: country
			}
		});
		return request.then(neighborsSuccess, promiseError);
	}

	function neighborsSuccess(response) {
		countriesService.currentCountry.neighbors = response.data.geonames;
		return response.data.geonames;
	}

	function promiseError(response) {
		return response;
	}

	function capitalSuccess(response) {
		countriesService.currentCountry.capital = response.data.geonames[0].name;
		countriesService.currentCountry.capitalPopulation = response.data.geonames[0].population;
		return response.data.geonames[0];
	}

	function countriesSuccess(response) {
		countriesService.countries = response.data.geonames;
		return countriesService.countries;
	}

	function getCountry(countryName) {
		countriesService.currentCountry = searchArray(countriesService.countries, countryName)
		return countriesService.currentCountry;
	}

	return countriesService;
}