angular.module('countries',[])
	.factory('countriesService', countriesService);

countriesService.$inject = ['$http','$filter','$q'];
function countriesService($http, $filter, $q) {
	var countriesService = {
			countries: countries,
			currentCountry: currentCountry,
			getCountry: getCountry,
			getCountries: getCountries,
			getCapital: getCapital,
			getNeighbors: getNeighbors
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
			response = request.then(countriesSuccess,countriesError);
			deferred.resolve(response);
		} else {
			response = countriesService.countries;
			deferred.resolve(response);
		};

		return deferred.promise;
	}

	function getCapital(capital) {
		var request = $http({
			url: 'http://api.geonames.org/searchJSON',
			method: 'GET',
			cache: true,
			params: {
				username: 'sdotson2015',
				q: capital
			}
		});
		return request.then(capitalSuccess,capitalError);
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
		return request.then(neighborsSuccess,neighborsError);
	}

	function neighborsSuccess(response) {
		countriesService.currentCountry.neighbors = response.data.geonames;
		return response.data.geonames;
	}

	function neighborsError(response) {
		console.log(response);
		return response;
	}

	function capitalSuccess(response) {
		countriesService.currentCountry.capital = response.data.geonames[0].name;
		countriesService.currentCountry.capitalPopulation = response.data.geonames[0].population;
		return response.data.geonames[0];
	}

	function capitalError(response) {
		return response;
	}

	function countriesSuccess(response) {
		console.log('countriesSuccess executed');
		countriesService.countries = response.data.geonames;
		return countriesService.countries;
	}

	function countriesError(response) {
		console.log('error');
		console.log(response);
		return response;
	}

	function getCountry(countryName) {
		countriesService.currentCountry = searchArray(countriesService.countries, countryName)
		return countriesService.currentCountry;
	}

	return countriesService;
}
