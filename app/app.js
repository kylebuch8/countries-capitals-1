angular.module('countriesApp',['countriesList','countryDetail','home','countries'])
	.run(function($rootScope, countriesService) {
		$rootScope.$on('$routeChangeStart', function() {
      $rootScope.isLoading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function() {
      $rootScope.isLoading = false;
    });
	});
