var servidor = "localhost:8089";
var entidad_consultas;
//var servidor = "sndcoldeportes.com";
angular.module('starter.services', [])

.factory("Deportista",function($http, $cookies) {
  var interfaz = {
    listadoDeportistas: function(url){
      var get_url = url;
      if(!url){
          get_url = "http://"+entidad_consultas+servidor+"/rest/deportistas/basico";
      }

      return $http({method: 'GET' , url: get_url,withCredentials: true}).then(function(response){
        return response.data;
      });
    },

    get : function(id,entidad){
      var get_url = "http://"+entidad_consultas+servidor+"/rest/deportistas/basico/"+id+"/?entidad="+entidad;
      return $http.get(get_url).then(function(response){
        return response.data;
      });
    },

    cambioEstado : function(id){
      console.log($cookies.get("csrftoken"));
      var delete_url = "http://"+entidad_consultas+servidor+"/rest/deportistas/basico/"+id;
      return $http.delete(delete_url).then(function(response){
        return response.data;
      });
    },

    registro : function(deportista){
      var post = "http://"+entidad_consultas+servidor+"/rest/deportistas/basico";
      return $http.post(post,deportista).then(function(response){
        return response.data;
      });
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
      return $http.get(get_url).then(function(response){
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
      return $http.get(get_url).then(function(response){
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
      return $http.get(get_url).then(function(response){
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
      return $http.get(get_url).then(function(response){
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
      return $http.get(get_url).then(function(response){
        return response.data;
      })
    }
  }

  return interfaz;
})

.factory("Usuario", function ($http) {
    var interfaz = {
      ingresoUsuario : function(usuario){
        var ing_url = "http://"+servidor+"/entidades/appMovil/login/";
        data = {"name":usuario.username,"pw":usuario.password, "entidad": usuario.entidad};
        return $http.get(ing_url,{params: data}).then(function(response){
            entidad_consultas = usuario.entidad + ".";
            if(usuario.entidad == 'public'){
              entidad_consultas = "";
            }
            return response.data;
        });
      },

      getEntidad : function(){
        return entidad_consultas;
      }
    }

    return interfaz;
})


.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
