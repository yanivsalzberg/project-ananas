app.controller('pineAppCtrl', ['$scope', 'pineAppService', function($scope, pineAppService) {
  //document.getElementById("myModal").modal();
  $scope.selectedIndexes = [];

  $scope.checkWin = function()  {
    $scope.numPairs--;
    if ($scope.numPairs===0) {
      console.log("you win the game");
      pineAppService.getPineboxes().then(function(pineboxes) {
        $scope.initGame(pineboxes);
      });
    }
  }

  $scope.changeColor = function(pBox) {
    if ((pBox.display===pBox.color)&&(pBox._id!==$scope.selectedId)){
      pBox.display="navy";
    } else {
      pBox.display = pBox.color;
    }
  }

  $scope.restoreDefaults = function(){
    $scope.clicked = false;
    $scope.defaultColorize($scope.pineboxes);
    $scope.selectedId = "";
    $scope.selectedColor="";
    $scope.$apply();
  }//restore default settings

  $scope.playAudio = function(pBox) {
    var sound = pBox.sound;
    var audio = new Audio(sound);
    audio.play();
  }

  $scope.play = function(pBox, index) {
    if (!$scope.selectedIndexes.includes(index)) {
      if ($scope.clicked) {
        $scope.changeColor(pBox);
         if (pBox.color===$scope.selectedColor) {
           if (pBox._id!==$scope.selectedId){
             console.log("its a match!");
             $scope.clicked = false;
             $scope.selectedIndexes.push(index);
             $scope.selectedIndexes.push($scope.index);
             console.log($scope.selectedIndexes);
             var disappearColor = document.getElementById("thebody").style.backgroundColor;
             setTimeout(function(currentCardIndex){console.log(index);$scope.pineboxes[index].display=disappearColor;
                $scope.pineboxes[$scope.index].display = disappearColor;
                $scope.checkWin();
                $scope.$apply(); }, 1000);
          }
          else {
            $scope.playAudio(pBox);
          }
        }//if same color
        else {
          setTimeout(function(){$scope.restoreDefaults();}, 1000);
        }
      }
      else {
        $scope.changeColor(pBox);
        $scope.clicked = true;
        $scope.selectedId = pBox._id;
        $scope.selectedColor = pBox.color;
        $scope.index = index;
      } //else click
    }
  } //play

  $scope.defaultColorize = function(arr) {
    for (var i = 0; i <arr.length; i++) {
      if (!$scope.selectedIndexes.includes(i)) {
          arr[i].display="navy";
        }
    }
  }

  $scope.randomize = function(arr) {
    var randomArr = [];
    while (arr.length > 0) {
    randomIndex = Math.floor(Math.random() * arr.length); //a random number between 0 and arr.length-1
    randomArr.push(arr[randomIndex]);
    arr.splice(randomIndex, 1);
    }
    return randomArr;
  }

  $scope.initGame = function(pineboxes) {
    $scope.selectedIndexes = [];
    $scope.pineboxes = $scope.randomize(pineboxes);
    $scope.defaultColorize($scope.pineboxes);
    $scope.numPairs = $scope.pineboxes.length/2;
  }

  pineAppService.getPineboxes().then(function(pineboxes) {
    $scope.initGame(pineboxes);
  });
}]);
