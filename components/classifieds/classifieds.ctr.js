(function() {

  "use strict";

  angular
    .module('ngClassifieds')
    .controller('classifiedsController', function(auth, $scope, $mdSidenav, $mdDialog, $state, $mdToast, classifiedsFactory) {

      var vm = this;

      vm.openSidebar = openSidebar;
      vm.showFilters = false;
      
      vm.auth = auth.ref;
      
      // This is the async way of getting the
      // current user's auth data
      auth.ref.$onAuth(function(authData) {
        vm.authData = authData;
      });
      
      vm.classifieds = classifiedsFactory.ref;
      vm.classifieds.$loaded().then(function(classifieds) {
        vm.categories = getCategories(classifieds);
        console.log(classifieds);
      });

      $scope.$on('newClassified', function(event, data) {
        vm.classifieds.$add(data);
        showToast('Classified Saved');
      });

      $scope.$on('editSaved', function(event, message) {
        showToast(message);
      });

      vm.sidebarTitle;

      function showToast(message) {
        $mdToast.show(
          $mdToast.simple()
            .content(message)
            .position('top, right')
            .hideDelay(3000)
        );
      }

      function openSidebar() {
        vm.sidebarTitle = 'Add a Classified';
        $state.go('classifieds.new');
      }

      function getCategories(classifieds) {

        var categories = [];

        angular.forEach(classifieds, function(ad) {
          angular.forEach(ad.categories, function(category) {
            categories.push(category);
          });
        });

        return _.uniq(categories);
      }

    });

})();