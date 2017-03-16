app.factory('pineAppService', function($http) {

var pineAppService = {};

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
