describe("home", function() {
  beforeEach(module("home"));

  describe("/ route", function() {
    it('should load the template',
    inject(function($location, $rootScope, $httpBackend, $route) {
      $httpBackend.whenGET('home/home.html').respond('...');

      $rootScope.$apply(function() {
          $location.path('/');
      });
      
      expect($route.current.controller).toBe("HomeCtrl");
      expect($route.current.loadedTemplateUrl).toBe("home/home.html");

      $httpBackend.verifyNoOutstandingExpectation();
    }));
  });
});