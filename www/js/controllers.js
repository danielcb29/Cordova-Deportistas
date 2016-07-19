angular.module('starter.controllers', [])

.controller('ListadoCtrl', function($scope,Deportista, $ionicPopup, $cookies) {
  var entidad = Deportista.getEntidad();
  $scope.entidad = entidad;

  var get_page = function getPage(url){
    return loadList(url);
  };

  function loadList(url){
    Deportista.listadoDeportistas(url).then(function(response){
      $scope.deportistas = response.results;
      $scope.anterior = response.previous;
      $scope.despues = response.next;
      $scope.getPage = get_page;
    },function(response){
      $ionicPopup.alert({
        title: "Error en la obtención de deportistas",
        template: "El servidor a fallado, intentelo de nuevo en unos minutos"
      });
    });
  };

  loadList(null);


})

.controller('DeportistaDetailCtrl', function($scope, $stateParams, Deportista, $ionicPopup) {
  
  var cambio_estado = function cambioEstado(id){
    Deportista.cambioEstado(id).then(function(response){
      $ionicPopup.alert({
      title: "El deportista de ha activado/desactado correctamente",
      template: "La operación ha resultado exitosa!"
    });
    },function(response){
      $ionicPopup.alert({
      title: "Error en la activacion/desactivacion de deportista",
      template: "El servidor a fallado, intentelo de nuevo en unos minutos"
    });
    });
  };

  Deportista.get($stateParams.deporId,$stateParams.entidad).then(function(response){
    $scope.deportista = response;
    var entidad = Deportista.getEntidad();
    console.log(entidad);
    console.log(response.estado);
    if((entidad != $stateParams.entidad) || (response.estado != 1 && response.estado != 0)){
      $scope.editable = false;  
    }else{
      $scope.editable = true;
      if (response.estado == 1){
        $scope.activado = true;
      }else{
        $scope.activado = false;
      }
      $scope.cambioEstado = cambio_estado;
    }
    
  }, function(response){
    $ionicPopup.alert({
      title: "Error en la obtención de deportista",
      template: "El servidor a fallado, intentelo de nuevo en unos minutos"
    });
  });
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

.controller('IngresoCtrl', function($scope, Usuario,$window, $ionicPopup, $location){
  var vm = this;
  vm.funciones = {
    ingreso : function(){
      Usuario.ingresoUsuario(vm.usuario).then(function(response){
        if(response.id !=null){
          //$location.path("#/tab/listado");
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



.controller('SalirCtrl', function($scope,$window) {
  $window.location.href = "#/ingreso";
});
