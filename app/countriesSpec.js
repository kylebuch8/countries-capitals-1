describe('countriesService', function(countries) {
	beforeEach(module('countries'));

  it('getCountries returns object', inject(function (countriesService, $q, $http) {
    countriesService.getCountries().then(function(data) {
      console.log(data);
      assert.isObject(data);
    });
  }));

  /*it('getCountry returns object', inject(function (countriesService, $q, $http) {
   countriesService.countries = [{
      countryName: 'France',
      capital: 'Paris'
    }];

    console.log(countriesService.getCountry);

    countriesService.getCountry('France').then(function(data) {
      assert.isObject(data);
    });
  }));*/

  /*it('getCapital returns object', inject(function (countriesService, $q, $http) {
    countriesService.getCapital('Paris').then(function(data) {
      console.log(data);
      assert.isObject(data);
    });
  }));

  it('getNeighbors returns object', inject(function (countriesService, $q, $http) {
    countriesService.getNeighbors().then(function(data) {
      console.log(data);
      assert.isObject(data);
    });
  }));

  it('getCountryDetails returns object', inject(function (countriesService, $q, $http) {
    countriesService.getCountryDetails().then(function(data) {
      console.log(data);
      assert.isObject(data);
    });
  }));*/

});