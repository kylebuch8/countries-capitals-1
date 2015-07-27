describe("countryDetail", function() {
  beforeEach(module("countryDetail"));

  describe("/countries route", function() {
    it('should load the template',
    inject(function($location, $rootScope, $httpBackend, $route) {
      $httpBackend.whenGET('country-detail/country-detail.html').respond('...');
      $httpBackend.expectGET('http://api.geonames.org/countryInfo?type=JSON&username=sdotson2015').respond({});

      $rootScope.$apply(function() {
        $location.path('/countries/France/Paris');
      });
      
      expect($route.current.controller).toBe("DetailCtrl");
      expect($route.current.loadedTemplateUrl).toBe("country-detail/country-detail.html");

      $httpBackend.verifyNoOutstandingExpectation();
    }));
  });
});