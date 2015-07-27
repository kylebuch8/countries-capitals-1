describe("countriesList", function() {
  beforeEach(module("countriesList"));

  describe("/countries route", function() {
    it('should load the template',
    inject(function($location, $rootScope, $httpBackend, $route, countriesService) {
      $httpBackend.whenGET('countries-list/countries-list.html').respond('...');
      $httpBackend.expectGET('http://api.geonames.org/countryInfo?type=JSON&username=sdotson2015').respond({});

      $rootScope.$apply(function() {
        $location.path('/countries');
      });

      expect($route.current.controller).toBe("CountriesCtrl");
      expect($route.current.loadedTemplateUrl).toBe("countries-list/countries-list.html");

      $httpBackend.verifyNoOutstandingExpectation();
    }));
  });

  /*describe('CountriesCtrl', function() {
      var ctrl, scope;
      beforeEach(inject(function($controller, $rootScope, countriesService) {
          scope = $rootScope.$new();
          ctrl = $controller('CountriesCtrl', {
              $scope : scope
          });
      }));

      it('should redirect to country detail page', function() {
        inject(function($location, $rootScope, $httpBackend, $route, countriesService) {
          $httpBackend.whenGET('country-detail/country-detail.html').respond('...');
          $httpBackend.expectGET('http://api.geonames.org/countryInfo?type=JSON&username=sdotson2015').respond({});

          $rootScope.$apply(function($location) {
            scope.redirect({
              countryName : "France",
              capital : "Paris"
            });
          });

          expect($route.current.loadedTemplateUrl).toBe("countries-list/countries-list.html");

          $httpBackend.verifyNoOutstandingExpectation();
        });
      });
  });*/

});