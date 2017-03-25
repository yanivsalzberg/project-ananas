app.controller('pineAppCtrl', ['$scope', 'pineAppService', function($scope, pineAppService) {
  $scope.selectedIndexes = [];
  $scope.errorSound = "assets/sounds/honk.mp3";
  $scope.isMuteOff = true;

  // $scope.errorSound = ["assets/sounds/nope1.mp3", "assets/sounds/nope2.mp3", "assets/sounds/nope3.mp3",
  //                   "assets/sounds/noway.mp3", "assets/sounds/honk.mp3", "assets/sounds/error1.mp3",
  //                   "assets/sounds/error2.mp3","assets/sounds/error3.mp3","assets/sounds/error4.mp3",
  //                   "assets/sounds/error5.mp3","assets/sounds/error6.mp3","assets/sounds/error7.mp3",
  //                   "assets/sounds/error8.mp3","assets/sounds/error9.mp3","assets/sounds/error10.mp3",
  //                   "assets/sounds/error11.mp3","assets/sounds/error12.mp3","assets/sounds/nope4.mp3"]
  $scope.matchSound = "assets/sounds/cheer1.mp3";
  $scope.winSound = "assets/sounds/ananasSing.mp3";

  var audio = new Audio($scope.errorSound);
  audio.play();

  $scope.checkWin = function()  {
    $scope.numPairs--;
    if ($scope.numPairs===0) {
      console.log("you win the game");
      if ($scope.currentPlayer) {
        pineAppService.playerWin($scope.currentPlayer);
      }
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
  }//restore default setting-

  $scope.playAudio = function(pBox) {
    var sound = pBox.sound;
    var audio = new Audio(sound);
    audio.play();
  }


  $scope.playErrorAudio = function(errorSoundPath) {
    var audioError = new Audio(errorSoundPath);
    audioError.play();

  }

  $scope.mute = function() {
    $scope.errorSound = "";
    $scope.isMuteOff =!$scope.isMuteOff;
  }

  $scope.unmute = function() {
    $scope.errorSound = "assets/sounds/honk.mp3";
    $scope.isMuteOff =!$scope.isMuteOff;
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
            $scope.playAudio(pBox)
          }
        }  ///// if inner
        else {
          $scope.playErrorAudio($scope.errorSound);
          setTimeout(function(){$scope.restoreDefaults();}, 1000);
        }// else restore defaults

      }//if clicked

      else {
      $scope.changeColor(pBox);
      $scope.clicked = true;
      $scope.selectedId = pBox._id;
      $scope.selectedColor = pBox.color;
      $scope.index = index;
    } //else click
  }//if indices
}//play

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
  }// randomize


  $scope.initGame = function(pineboxes) {
    $scope.selectedIndexes = [];
    $scope.pineboxes = $scope.randomize(pineboxes);
    $scope.defaultColorize($scope.pineboxes);
    $scope.numPairs = $scope.pineboxes.length/2;
  }


  pineAppService.getPineboxes().then(function(pineboxes) {
    $scope.initGame(pineboxes);
  });


  $scope.getAllPlayers = function(){
    pineAppService.getPlayers().then(function(response){
      $scope.playerList = response;
      $scope.playerList.sort(function(a,b) {
        return b.score - a.score;
      });
    },function(err){
      console.error(err);
    })// err
  }//getAllPlayers
  //$scope.getAllPlayers();

  $scope.getPlayer = function() {
    console.log($scope.playerName);
    pineAppService.getPlayer($scope.playerName).then(function(response){ //response would be an array of found players
      console.log("Welcome, "+ response[0].name+". you have "+ response[0].score+" points!");
      $scope.currentPlayer = response[0];
    },function(err){
      console.error(err);
    })
  } // getPlayer

}]);
