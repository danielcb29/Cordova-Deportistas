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

.controller('DeportistaDetailCtrl', function($scope, $stateParams,$route, $state ,Deportista, Corporal, Deportivo, Academico, Adicional, Lesiones ,$ionicPopup) {

  var cambio_estado = function cambioEstado(id){
    Deportista.cambioEstado(id).then(function(response){
      $ionicPopup.alert({
      title: "El deportista se ha activado/desactado correctamente",
      template: "La operación ha resultado exitosa!"
    });
      $route.reload();
      //$state.go($state.current, {}, {reload: true});
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
    if((entidad != $stateParams.entidad) || (response.estado != 'ACTIVO' && response.estado != 'INACTIVO')){
      $scope.editable = false;
    }else{
      $scope.editable = true;
      if (response.estado == 'INACTIVO'){
        $scope.activado = false;
      }else{
        $scope.activado = true;
      }
      $scope.cambioEstado = cambio_estado;
    }

  }, function(response){
    $ionicPopup.alert({
      title: "Error en la obtención de deportista",
      template: "El servidor a fallado, intentelo de nuevo en unos minutos"
    });
  });

  Corporal.get($stateParams.deporId,$stateParams.entidad).then(function(response){
    var resultados = response.results;
    if(resultados.length > 0){
        $scope.has_corporal = true;
        $scope.corporal = response.results[0];
    }else{
      $scope.has_corporal = false;
    }
  });

  Deportivo.get($stateParams.deporId,$stateParams.entidad).then(function(response){
    var resultados = response.results;
    if(resultados.length > 0){
        $scope.has_deportivo = true;
        $scope.deportivo = response.results;
    }else{
      $scope.has_deportivo = false;
    }
  });

  Academico.get($stateParams.deporId,$stateParams.entidad).then(function(response){
    var resultados = response.results;
    if(resultados.length > 0){
        $scope.has_academico = true;
        $scope.academico = response.results;
    }else{
      $scope.has_academico = false;
    }
  });

  Adicional.get($stateParams.deporId,$stateParams.entidad).then(function(response){
    var resultados = response.results;
    if(resultados.length > 0){
        $scope.has_adicional = true;
        $scope.adicional = response.results[0];
    }else{
      $scope.has_adicional = false;
    }
  });

  Lesiones.get($stateParams.deporId,$stateParams.entidad).then(function(response){
    var resultados = response.results;
    if(resultados.length > 0){
        $scope.has_lesiones = true;
        $scope.lesiones = response.results;
    }else{
      $scope.has_lesiones = false;
    }
  });

})

.controller('GestionDeportistaCtrl', function($scope, $location,$stateParams,Deportista) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  var funciones = {

    estoy : function(ruta){
        return $location.path() == ruta;
    },

    registro : function(){

      var d =  {
            "nacionalidad": [
                "Albania",
                "Andorra"
            ],
            "ciudad_residencia": "Acacías",
            "disciplinas": [
                "Baloncesto",
                "Natación"
            ],
            "departamento": "Meta",
            "nombres": "mathew",
            "apellidos": "alba",
            "genero": "HOMBRE",
            "tipo_id": "CC",
            "identificacion": "8955412",
            "fecha_nacimiento": "2008-12-15",
            "barrio": "SDSD",
            "comuna": "10",
            "email": "",
            "telefono": "3232",
            "direccion": "SDSD",
            "lgtbi": false,
            "etnia": "",
            "video": "",
            "foto": null
        }

      Deportista.registro(d).then(function(response){
        console.log("registro ok desde controlado");
      },function(response){
        console.log("ha ocurido algun erro depor reg contorl");
        console.log(response);
      });
    },

    edicion : function(){
      var deportista = $scope.deportista;
      console.log(deportista);
      //deportista.nacionalidad = ["Colombia","Andorra"];
      //deportista.apellidos = "lopez";
      Deportista.edicion(deportista,$stateParams.deporId).then(function(response){
          console.log("edicion correcta");
          console.log(response);
        }, function(response){
          console.log("errorsini edicion");
          console.log(response);
        });

    },

    index : function() {
      if (funciones.estoy("/tab/registro")){
        funciones.registro();
      }else{
        funciones.edicion();
      }
    },

    mostrarForm: function(){
      if (funciones.estoy("/tab/registro")){

      }else{
        Deportista.get($stateParams.deporId,$stateParams.entidad).then(function(response){
          $scope.deportista = response;
        }, function(response){
          console.log("error trayendo el depor");
        });
      }
    }
  };

  $scope.gestionDeportista = funciones;

  funciones.mostrarForm();
})

.controller('IngresoCtrl', function($scope, Usuario,$window, $ionicPopup, $location){
  var vm = this;
  vm.funciones = {
    ingreso : function(){
      Usuario.ingresoUsuario(vm.usuario).then(function(response){
          $window.location.href = "#/tab/listado";
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
