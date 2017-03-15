app.controller('pineAppCtrl', ['$scope', 'pineAppService', function($scope, pineAppService) {
  $scope.clicked = false;

  $scope.changeColor = function($index) {
    console.log("here");
    $scope.pineboxes[$index].clicked = !$scope.pineboxes[$index].clicked;
  }

  $scope.checkWin = function()  {
    $scope.numPairs--;
    if ($scope.numPairs===0) {
      alert("you win the game");
    }//if
  } //checkWin
  $scope.restoreDefaults = function(){
    $scope.clicked = false;
    //
  }//restore default setting-
  $scope.play = function(pBox) {
    if ($scope.clicked) {
      //$scope.changeColorWithTimer(pBox.color)
      if (pBox.color===$scope.selectedColor) {
        //$scope.vanishBoxes(pBox.id, selectedId); make them disappear with ng-show/css
        $scope.checkWin();
      } else {
       $scope.restoreDefaults();
      }// else not of the same color
    } else {
    $scope.clicked = true;
    $scope.selectedId = pBox.id;
    $scope.selectedColor = pBox.color;
    // $scope.changeColor(pBox);
    } //else click
  } //play

  //$scope.styles = {'background-color': getBackgroundColor()};

  $scope.setStyle1 = function($index) {
    console.log($index);
      $scope.myStyle = {
          'background-color': $scope.pineboxes[$index].color
      };
  }

  $scope.setStyle2 = function($index) {
    console.log($index);
      $scope.myStyle2 = {
          'background-color': $scope.pineboxes[$index + 1].color
      };
  }
  //$scope.flipped = false;
  //$scope.play = fucntion(pBox) {
  //  if ($scope.clicked) {
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

  $scope.doubleArray = function(arr) {
    var res = [];
    var resIndex = 0;
    for (var i = 0;i<arr.length;i++) {
      res[resIndex] = arr[i];
      res[resIndex].id = resIndex;
      resIndex++;
      res[resIndex] = arr[i];
      res[resIndex].id = resIndex;
      resIndex++;
    } //for i
    return res;
  }// doubleArray  // OPTIONAL FEATURE
  $scope.randomize = function(arr) {
    var randomArr = [];
    while (arr.length>0) {
    randomIndex = Math.floor(Math.random()*arr.length); //a random number between 0 and arr.length-1
    randomArr.push(arr[randomIndex]);
    arr.splice(randomIndex, 1);
    } //while
    return randomArr;
  }// randomize
//  $scope.pineboxes = $scope.doubleArray($scope.pineboxes);
//  $scope.randomize($scope.pineboxes);
  pineAppService.getPineboxes().then(function(pineboxes) {
    $scope.pineboxes = $scope.randomize(pineboxes);
    $scope.numPairs = pineboxes.length/2; // alternatively: the db would contain only single values and a function would double the array and randomize it
    console.log("num of pairs is: " + $scope.numPairs);
    // for (var i = 0; i < pineboxes.length; i++) {
    //   console.log("hello");
    //   $scope.pineboxes[i].clicked = false;
    // }
  });
}]);
