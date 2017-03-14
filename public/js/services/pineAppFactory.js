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

  return pineAppService;
});
