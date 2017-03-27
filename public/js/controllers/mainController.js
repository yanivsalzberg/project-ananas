app.controller('pineAppCtrl', ['$scope', 'pineAppService', function($scope, pineAppService) {

  $scope.selectedIndexes = [];

  $scope.clicked = false;

  $scope.errorSound = ["assets/sounds/nope1.mp3", "assets/sounds/nope2.mp3", "assets/sounds/nope3.mp3",
                      "assets/sounds/noway.mp3", "assets/sounds/honk.mp3", "assets/sounds/error1.mp3",
                      "assets/sounds/error2.mp3","assets/sounds/error3.mp3","assets/sounds/error4.mp3",
                      "assets/sounds/error5.mp3","assets/sounds/error6.mp3","assets/sounds/error7.mp3",
                      "assets/sounds/error8.mp3","assets/sounds/error9.mp3","assets/sounds/error10.mp3",
                      "assets/sounds/error11.mp3","assets/sounds/error12.mp3","assets/sounds/nope4.mp3"]

  $scope.matchSound = "assets/sounds/cheer1.mp3"

  $scope.winSound = "assets/sounds/ananasSing.mp3"

  $scope.checkWin = function()  {
    $scope.numPairs--;
    if ($scope.numPairs===0) {
      console.log("you win the game");
      $scope.playWinAudio($scope.winSound);
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

  $scope.playErrorAudio = function(errorSoundPath) {
    var audioError = new Audio(errorSoundPath);
    audioError.play();

  }

  $scope.playMatchAudio = function(matchSoundPath) {
    var audioMatch = new Audio(matchSoundPath);
    audioMatch.play();
  }

  $scope.playWinAudio = function(winSoundPath) {
    var audioWin = new Audio(winSoundPath);
    audioWin.play();

  }

  $scope.mute = function() {
    $scope.errorSound = "";
  }


  $scope.play = function(pBox, index) {
    if (!$scope.selectedIndexes.includes(index)) {
      if ($scope.clicked) {
        $scope.changeColor(pBox);
         if (pBox.color===$scope.selectedColor) {
           if (pBox._id!==$scope.selectedId){
             console.log("its a match!");

             $scope.playMatchAudio($scope.matchSound);

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

            $scope.randomSoundNumber = Math.floor(Math.random() * 18)
            $scope.playErrorAudio($scope.errorSound[$scope.randomSoundNumber]);
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
