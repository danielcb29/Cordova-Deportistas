angular.module('starter.controllers', [])

.controller('ListadoCtrl', function($scope) {
  console.log("listado");
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('IngresoCtrl', function($scope, Usuario,$window){
  var vm = this;
  vm.funciones = {
    ingreso : function(){
      console.log("submit");
      Usuario.ingresoUsuario(vm.usuario).then(function(response){
        console.log(response.id);
        $window.location.href = "#/tab/listado";
      }, function(response){
          console.log("Error en la peticion login");
      })
    }
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
