app.controller('pineAppCtrl', ['$scope','pineAppService', function($scope, pineAppService) {

  pineAppService.getPineboxes().then(function(pineboxes) { // I got from the server's response beers (to be shown)
    $scope.pineboxes = pineboxes;
  });
}]);
