var servidor = "172.18.1.224:8089";
//var servidor = "sndcoldeportes.com";
var entidad_consultas;
var token;

angular.module('starter.services', [])

.factory("Deportista",function($http, $cookies) {
  var interfaz = {
    listadoDeportistas: function(url){
      var get_url = url;
      if(!url){
          get_url = "http://"+entidad_consultas+servidor+"/rest/deportistas/basico/";
      }
      console.log(token);
      console.log(get_url);
      return $http({method: 'GET' , url: get_url,withCredentials: true, headers: {'authorization': 'Token ' + token }}).then(function(response){
        return response.data;
      });
    },

    get : function(id,entidad){
      var get_url = "http://"+entidad_consultas+servidor+"/rest/deportistas/basico/"+id+"/?entidad="+entidad;
      return $http({method: 'GET',url:get_url, headers: {'authorization': 'Token ' + token }}).then(function(response){
        return response.data;
      });
    },

    cambioEstado : function(id){
      var delete_url = "http://"+entidad_consultas+servidor+"/rest/deportistas/basico/"+id+"/";
      return $http({method:"DELETE", url:delete_url, headers: {'authorization': 'Token ' + token }}).then(function(response){
        return response.data;
      });
    },

    registro : function(deportista){
      var post = "http://"+entidad_consultas+servidor+"/rest/deportistas/basico/";
      return $http({method: 'POST', url:post, data:deportista, headers: {'Content-Type': 'application/json','authorization': 'Token ' + token } }).then(function(response){
        return response.data;
      });
    },

    edicion : function(deportista, id){
      var put = "http://"+entidad_consultas+servidor+"/rest/deportistas/basico/"+id+"/";
      return $http({method:'PUT',url: put, data:deportista,headers: {'Content-Type': 'application/json','authorization': 'Token ' + token }}).then(function(response){
        return response.data;
      })
    },

    getEntidad : function(){
      if(entidad_consultas == ""){
        return "Publica";
      }else{
        return entidad_consultas.slice(0,-1);
      }

    }
  }
  return interfaz;
})

.factory("Corporal", function($http){
  var interfaz = {
    get : function(id,entidad){
      var get_url = "http://"+entidad_consultas+servidor+"/rest/deportistas/corporal/?deportista="+id+"&entidad="+entidad;
      return $http({method:'GET', url:get_url,headers: {'authorization': 'Token ' + token } }).then(function(response){
        return response.data;
      })
    }
  }

  return interfaz;
})

.factory("Deportivo", function($http){
  var interfaz = {
    get : function(id,entidad){
      var get_url = "http://"+entidad_consultas+servidor+"/rest/deportistas/deportivo/?deportista="+id+"&entidad="+entidad;
      return $http({method:'GET', url:get_url,headers: {'authorization': 'Token ' + token }} ).then(function(response){
        return response.data;
      })
    }
  }

  return interfaz;
})

.factory("Academico", function($http){
  var interfaz = {
    get : function(id,entidad){
      var get_url = "http://"+entidad_consultas+servidor+"/rest/deportistas/academico/?deportista="+id+"&entidad="+entidad;
      return $http({method:'GET', url:get_url,headers: {'authorization': 'Token ' + token }} ).then(function(response){
        return response.data;
      })
    }
  }

  return interfaz;
})

.factory("Adicional", function($http){
  var interfaz = {
    get : function(id,entidad){
      var get_url = "http://"+entidad_consultas+servidor+"/rest/deportistas/adicional/?deportista="+id+"&entidad="+entidad;
      return $http({method:'GET', url:get_url,headers: {'authorization': 'Token ' + token }} ).then(function(response){
        return response.data;
      })
    }
  }

  return interfaz;
})

.factory("Lesiones", function($http){
  var interfaz = {
    get : function(id,entidad){
      var get_url = "http://"+entidad_consultas+servidor+"/rest/deportistas/lesiones/?deportista="+id+"&entidad="+entidad;
      return $http({method:'GET', url:get_url,headers: {'authorization': 'Token ' + token }} ).then(function(response){
        return response.data;
      })
    }
  }

  return interfaz;
})

.factory("Usuario", function ($http) {
    var interfaz = {
      ingresoUsuario : function(usuario){
        var url = "http://"+usuario.entidad+"."+servidor+"/rest/token-auth/"
        return $http.post(url,usuario).then(function(response){
          entidad_consultas = usuario.entidad + ".";
          if(usuario.entidad == 'public'){
            entidad_consultas = "";
          }
          token = response.data.token;
          return response.data;
        });
      },

      getEntidad : function(){
        return entidad_consultas;
      }
    }

    return interfaz;
});
