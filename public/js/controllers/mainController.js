app.controller('pineAppCtrl', ['$scope', 'pineAppService', function($scope, pineAppService) {
  $scope.clicked = false;
  $scope.checkWin = function()  {
    $scope.numPairs--;
    if ($scope.numPairs===0) {
      alert("you win the game");
    }//if
  } //checkWin
  $scope.restoreDefaults = function(){
    $scope.click = false;
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
  $scope.pineboxes = [{color:"green"}, {color:"indigo"}, {color:"black"}, {color:"orange"}];
  console.log($scope.pineboxes);
  $scope.numPairs = ($scope.pineboxes.length)*2;
  $scope.pineboxes = $scope.doubleArray($scope.pineboxes);
  $scope.randomize($scope.pineboxes);
  // pineAppService.getPineboxes().then(function(pineboxes) {
  //   $scope.pineboxes = pineboxes;
  //   $scope.numPairs = pineboxes.length/2; // alternatively: the db would contain only single values and a function would double the array and randomize it
  //   console.log("num of pairs is: " + $scope.numPairs);
  // });
}]);
