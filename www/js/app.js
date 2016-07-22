// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCookies','ngRoute'])

.run(function($ionicPlatform, $http, $cookies) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    $http.defaults.headers.post['X-CSRFToken'] = $cookies.get("csrftoken");
    $http.defaults.headers.put['X-CSRFToken'] = $cookies.get("csrftoken");
    //$http.defaults.headers.delete['X-CSRFToken'] = $cookies.csrftoken;

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.provider('myCSRF',[function(){
  var headerName = 'X-CSRFToken';
  var cookieName = 'csrftoken';
  var allowedMethods = ['GET','POST','DELETE'];

  this.setHeaderName = function(n) {
    headerName = n;
  }
  this.setCookieName = function(n) {
    cookieName = n;
  }
  this.setAllowedMethods = function(n) {
    allowedMethods = n;
  }
  this.$get = ['$cookies', function($cookies){
    return {
      'request': function(config) {
        if(allowedMethods.indexOf(config.method) === -1) {
          // do something on success
          config.headers[headerName] = $cookies[cookieName];
        }
        return config;
      }
    }
  }];
  this.$post = ['$cookies', function($cookies){
    return {
      'request': function(config) {
        if(allowedMethods.indexOf(config.method) === -1) {
          // do something on success
          config.headers[headerName] = $cookies[cookieName];
        }
        return config;
      }
    }
  }];
}])
.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $httpProvider.interceptors.push('myCSRF');
  $httpProvider.defaults.cookieName = 'sessionid';
  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  $httpProvider.defaults.withCredentials = true;


  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

   .state('ingreso', {
    url: '/ingreso',
    templateUrl: 'templates/ingreso.html',
    controllerAs: "vm",
    controller: 'IngresoCtrl'
  })
  // Each tab has its own nav history stack:

  .state('tab.listado', {
    url: '/listado',
    views: {
      'tab-listado': {
        templateUrl: 'templates/tab-listado.html',
        controller: 'ListadoCtrl'
      }
    }
  })

  .state('tab.depor-detail', {
    url: '/listado/:deporId/:entidad',
    views: {
      'tab-listado': {
        templateUrl: 'templates/depor-detail.html',
        controller: 'DeportistaDetailCtrl'
      }
    }
  })

  .state('tab.registro', {
      url: '/registro',
      views: {
        'tab-registro': {
          templateUrl: 'templates/tab-registro.html',
          controller: 'GestionDeportistaCtrl'
        }
      }
    })


  .state('tab.salir', {
    url: '/salir',
    views: {
      'tab-salir': {
        templateUrl: 'templates/tab-account.html',
        controller: 'SalirCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/ingreso');

});
