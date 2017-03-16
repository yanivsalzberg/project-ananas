app.controller('pineAppCtrl', ['$scope', 'pineAppService', function($scope, pineAppService) {
  // $scope.checkWin = function()  {
  //   $scope.numPairs--;
  //   if ($scope.numPairs===0) {
  //     alert("you win the game");
  //   }//if
  // } //checkWin
  $scope.changeColor = function(pBox) {
    if ((pBox.display===pBox.color)&&(pBox._id!==$scope.selectedId)){
      pBox.display="navy";
    } else {
      pBox.display = pBox.color;
    }
  }//changeColor
  $scope.restoreDefaults = function(){
    $scope.defaultColorize($scope.pineboxes);
    $scope.selectedId = "";
    $scope.selectedColor="";
    $scope.$apply();
  }//restore default setting-




  $scope.dblplay = function(pBox) {

    var sound = pBox.sound;
    var audio = new Audio(sound);
    audio.play();
  }

  $scope.play = function(pBox, index) {

    if ($scope.clicked) {
      $scope.changeColor(pBox);
       if (pBox.color===$scope.selectedColor) {
         console.log("its a match!");
         $scope.clicked = false;
         var disappearColor = document.getElementById("thebody").style.backgroundColor;
         setTimeout(function(currentCardIndex){console.log(index);$scope.pineboxes[index].display=disappearColor;
                  $scope.pineboxes[$scope.index].display = disappearColor; $scope.$apply(); },1000);
       }//if same color
       else {
         setTimeout(function(){$scope.restoreDefaults();},1000);
       }
      //setTimeout(function(){window.history.go(0);},1000);
    } else {
    $scope.changeColor(pBox);
    $scope.clicked = true;
    $scope.selectedId = pBox._id;
    $scope.selectedColor = pBox.color;
    $scope.index = index;
    } //else click
  } //play

  $scope.defaultColorize = function(arr) {
    for (i = 0;i<arr.length;i++) {
      arr[i].display="navy";
    }
    $scope.clicked = false;
  }

  $scope.randomize = function(arr) {
    var randomArr = [];
    while (arr.length>0) {
    randomIndex = Math.floor(Math.random()*arr.length); //a random number between 0 and arr.length-1
    randomArr.push(arr[randomIndex]);
    arr.splice(randomIndex, 1);
    } //while
    return randomArr;
  }// randomize

  pineAppService.getPineboxes().then(function(pineboxes) {

    $scope.pineboxes = $scope.randomize(pineboxes);
    $scope.defaultColorize($scope.pineboxes);
    console.log($scope.pineboxes);
    $scope.numPairs = $scope.pineboxes.length/2; // alternatively: the db would contain only single values and a function would double the array and randomize it
    console.log("num of pairs is: " + $scope.numPairs);
  });

}]);
