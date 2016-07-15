angular.module('starter.controllers', [])

.controller('ListadoCtrl', function($scope) {
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

.controller('IngresoCtrl', function($scope, Usuario,$window, $ionicPopup){
  var vm = this;
  vm.funciones = {
    ingreso : function(){
      Usuario.ingresoUsuario(vm.usuario).then(function(response){
        if(response.id !=null){
          $window.location.href = "#/tab/listado";
        }else{
          $ionicPopup.alert({
            title: "Error en el inicio de sesión",
            template: "El usuario, la contraseña o la entidad estan erradas"
          });
        }
      }, function(response){
        $ionicPopup.alert({
          title: "Error en el inicio de sesión",
          template: "El usuario, la contraseña o la entidad estan erradas"
        });
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
