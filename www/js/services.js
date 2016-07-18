var servidor = "localhost:8089";
//var servidor = "sndcoldeportes.com";
angular.module('starter.services', [])

.factory("Deportista",function($http) {
  var interfaz = {
    listadoDeportistas: function(entidad,url){
      var get_url = url;
      if(!url){
          get_url = "http://"+entidad+servidor+"/rest/deportistas/basico";
      }

      return $http({method: 'GET' , url: get_url,withCredentials: true}).then(function(response){
        return response.data;
      });
    }
  }
  return interfaz;
})

.factory("Usuario", function ($http) {
    var entidad_consultas;
    var usuario_consultas;
    var interfaz = {
      ingresoUsuario : function(usuario){
        var ing_url = "http://"+servidor+"/entidades/appMovil/login/";
        //var ing_url = "http://"+usuario.entidad+"localhost:8089/rest/api-auth/login/";
        data = {"name":usuario.username,"pw":usuario.password, "entidad": usuario.entidad};
        //data = {"usernaname":usuario.username,"password":usuario.password};
        return $http.get(ing_url,{params: data}).then(function(response){
            entidad_consultas = usuario.entidad;
            if(usuario.entidad == 'public'){
              entidad_consultas = "";
            }
            usuario_consultas = usuario;
            return response.data;
        });
      },

      getEntidad : function(){
        if(entidad_consultas == ""){
          return entidad_consultas;
        }
        return entidad_consultas + ".";
      },

      getHeader : function(peticion){
        return {
          'Authorization' : ('Basic ' + btoa(usuario_consultas.username +':' + usuario_consultas.password))
        }

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
