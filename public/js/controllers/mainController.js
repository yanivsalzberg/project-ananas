app.controller('pineAppCtrl', ['$scope', 'pineAppService', function($scope, pineAppService) {

  // $scope.clicked = false;
  //
  // $scope.play = fucntion(pBox) {
  //   if ($scope.clicked) {
  //     //$scope.changeColorWithTimer(pBox.color)
  //     if (pBox.color===selectedColor) {
  //       //$scope.vanishBoxes(pBox.id, selectedId); make them disappear with ng-show/css
  //       $scope.numPairs--;
  //       if ($scope.numPairs===0) {
  //         alert("you win the game");
  //       }//if
  //       //$scope.checkWin();
  //     } else {
  //       // restoreDefaults()
  //     }// else not of the same color
  //   }
  //   else {
  //     $scope.clicked = true;
  //     $scope.selectedId = pBox.id;
  //     $scope.selectedColor = pBox.color;
  //     // $scope.changeColor(pBox);
  //   }
  // }

  pineAppService.getPineboxes().then(function(pineboxes) {
    $scope.pineboxes = pineboxes;
    $scope.numPairs = pineboxes.length/2;
    console.log("num of pairs is: " + $scope.numPairs);
  });
}]);
