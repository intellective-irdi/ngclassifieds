(function() {

  "use strict";

  angular
    .module('ngClassifieds', ['ngMaterial','ui.router'])
    .config(function($mdThemingProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('orange');
    });
        
})();

