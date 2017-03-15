app.controller('pineAppCtrl', ['$scope', 'pineAppService', function($scope, pineAppService) {
  $scope.clicked = false;

  $scope.checkWin = function()  {
    $scope.numPairs--;
    console.log("numpairs is: " + $scope.numPairs);
    if ($scope.numPairs===0) {
      alert("you won the game");
    }//if
  } //checkWin
  $scope.changeColor = function(pBox) {
    if (pBox.display===pBox.color){
      pBox.display="navy";
    } else {
    pBox.display = pBox.color;
  }
  }//changeColor
  $scope.restoreDefaults = function(){
    console.log("here");
    for (i = 0;i<$scope.pineboxes.length;i++) {
      $scope.pineboxes[i].display="navy";
    } //for i //hard reset
    $scope.clicked = false;
    $scope.selectedId = "";
    $scope.selectedColor="";
    //restore both or all tile to original color and restore scope variables
    //
  }//restore default setting-
  $scope.play = function(pBox) {
    //angular.element(".boxes").css("background-color", "blue");
    if ($scope.clicked) {
      $scope.changeColor(pBox);
       if (pBox.color===$scope.selectedColor) {
         console.log("It's a match!");
         $scope.checkWin();
         $scope.clicked = false;
         $scope.selectedId = "";
         $scope.selectedColor="";

      //   //$scope.vanishBoxes(pBox.id, selectedId); make them disappear with ng-show/css
      //   $scope.checkWin();
      // //window.setTimeout('delay', 1000);
      // setTimeout(function(){   // console.log("here");
      //   //  for (i = 0;i<$scope.pineboxes.length;i++) {
      //     //  console.log("displayed");
      //     //  $scope.pineboxes[i].display="navy";
      //   //  } //for i //hard reset
      //   //  $scope.clicked = false;
      //   //  $scope.selectedId = "";
      //     $(".boxes").css("background-color", "blue");}, 3000);
       }//if same color
    } else {
       $scope.restoreDefaults();
        $scope.changeColor(pBox);
        $scope.clicked = true;
        $scope.selectedId = pBox._id;
        console.log("now selected id is: " + $scope.selectedId);
        $scope.selectedColor = pBox.color;
        console.log("now selected color is:" + $scope.selectedColor);
    } //else click
  } //play
  $scope.arrange = function(arr) {
    for (i = 0;i<arr.length;i++) {
      arr[i].id = i;
      arr[i].display="navy";
    } //for i
  }//arrange


  // $scope.doubleArray = function(arr) {
  //   var res = [];
  //   var resIndex = 0;
  //   for (var i = 0;i<arr.length;i++) {
  //     res[resIndex] = arr[i];
  //     res[resIndex].id = resIndex;
  //     res[resIndex].display= "navy";
  //     resIndex++;
  //     res[resIndex] = arr[i];
  //     res[resIndex].id = resIndex;
  //     res[resIndex].display= "navy";
  //     resIndex++;
  //   } //for i
  //   return res;
  // }// doubleArray  // OPTIONAL FEATURE

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
    $scope.numPairs = pineboxes.length/2;
    $scope.pineboxes = $scope.randomize(pineboxes);
  //  $scope.numPairs = pineboxes.length/2; // alternatively: the db would contain only single values and a function would double the array and randomize it
    console.log("num of pairs is: " + $scope.numPairs);
  });
}]);
