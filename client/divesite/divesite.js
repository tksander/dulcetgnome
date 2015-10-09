// this module controlls the popup divesite information that appears below the map when you click on a map marker

angular.module('divestop.divesite', ['ngMap'])
  .controller('DiveSiteController', function($scope, SharedProperties, DiveSites, AppMap) {
    $scope.currentSite = SharedProperties.currentSite;
    $scope.showForm = SharedProperties.showForm;
    $scope.bars = [];

    // $scope.templateUrl = 'divesite/divesite.html';
    // This is called by ng-show in the HTML to indicate that a marker for a divesite has actually been selected.
    // It then gives the information to the view to display the information for that specific dive site.
    $scope.isSiteAvailable = function() {
      return $scope.currentSite.site.hasOwnProperty('name');
    };
    $scope.$on("mapInitialized", function(e, map) {
      // make API call to google maps on drag event
      console.log('this got called');
      google.maps.event.addListener(map, 'dragend', function() {
        var custom = {lat: map.getCenter().lat(), lng: map.getCenter().lng()};
        AppMap.getMap(function () {
          console.log('IN THE CALLBACK');
          DiveSites.getDiveSites(custom).then(function(results) {
            console.log('in the right place');
            console.log(results);
          });
        }, map, custom);
      });
      // if map is initialized getMap without custom drag location
      AppMap.getMap(function () {
        var center = {lat: map.getCenter().lat(), lng: map.getCenter().lng()};
          console.log('IN THE CALLBACK');
          DiveSites.getDiveSites(center).then(function(results) {
            console.log('in the right place');
            console.log(results);
          });
        }, map);  
    });
    // $scope.getNearbyDives = function () {
    //   // get list of all divesites nearby
    //   var called = false;
    //   var func = function() {
    //   console.log('in here');
    //   console.log(SharedProperties.inserted);
    //     if(SharedProperties.inserted && !called) {
    //       DiveSites.getDiveSites([SharedProperties.map.center.J, SharedProperties.map.center.M])
    //         .then(function(results) {
    //         console.log("in divesites");
    //         console.log(results);
    //         called = true;
    //       });
    //     }
    //   };
    //   $timeout(func, 2000);
    // };
    // $scope.getNearbyDives();
  });