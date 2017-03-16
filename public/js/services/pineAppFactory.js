app.factory('pineAppService', function($http) {
  var pineAppService = {};

  pineAppService.getPlayers = function() {
    return $http.get('/players')
      .then(function(response) {
        console.log(response.data);
        return response.data;
      }, function(err) {
          console.error(err);
      });
  };

  pineAppService.getPlayer = function(name) {
    return $http.get('/players/'+name)
      .then(function(response) {
        console.log(response.data);
        return response.data;
      }, function(err) {
          console.error(err);
      });
  };
  pineAppService.PlayerWin = function(player) {
    return $http.put('/players/'+name)
      .then(function(response) {
        console.log(response.data);
        return response.data;
      }, function(err) {
          console.error(err);
      });
  };



  pineAppService.getPineboxes = function() {
    return $http.get('/pineboxes')
      .then(function(response) {
        console.log(response.data);
        return response.data;
      }, function(err) {
          console.error(err);
      });
  };
  pineAppService.postPineapple = function(pBox) {
    return $http.post('/pineboxes', pBox).then(function(response){
      return response.data;
    },function(err){
      console.err(err);
    })
  };

  return pineAppService;
});
