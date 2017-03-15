app.controller('pineAppCtrl', ['$scope', 'pineAppService', function($scope, pineAppService) {
  $scope.clicked = false;
  $scope.checkWin = function()  {
    $scope.numPairs--;
    if ($scope.numPairs===0) {
      alert("you win the game");
    }//if
  } //checkWin
  $scope.changeColor = function(pBox) {
    if ($scope.clicked){
      pBox.display="navy";
    } else {
    pBox.display = pBox.color;
  }
  }//changeColor
  $scope.restoreDefaults = function(){
    $scope.click = false;
    //
  }//restore default setting-
  $scope.play = function(pBox) {    
    if ($scope.clicked) {
      $scope.changeColor(pBox);
      //$scope.changeColorWithTimer(pBox.color)
      if (pBox.color===$scope.selectedColor) {
        //$scope.vanishBoxes(pBox.id, selectedId); make them disappear with ng-show/css
        $scope.checkWin();
      }//if same color
      $scope.restoreDefaults();
    } else {
    $scope.clicked = true;
    $scope.selectedId = pBox.id;
    $scope.selectedColor = pBox.color;
    $scope.changeColor(pBox);

    } //else click
  } //play
  $scope.arrange = function(arr) {
    for (i = 0;i<arr.length;i++) {
      arr[i].id = i;
      arr[i].display="navy";
    } //for i
  }//arrange


  $scope.doubleArray = function(arr) {
    var res = [];
    var resIndex = 0;
    for (var i = 0;i<arr.length;i++) {
      res[resIndex] = arr[i];
      res[resIndex].id = resIndex;
      res[resIndex].display= "navy";
      resIndex++;
      res[resIndex] = arr[i];
      res[resIndex].id = resIndex;
      res[resIndex].display= "navy";
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
  /*$scope.pineboxes = [{color:"green"}, {color:"indigo"}, {color:"black"}, {color:"orange"}];
  console.log($scope.pineboxes);
  $scope.numPairs = ($scope.pineboxes.length)*2;
  $scope.pineboxes = $scope.doubleArray($scope.pineboxes);
  $scope.randomize($scope.pineboxes); */
  pineAppService.getPineboxes().then(function(pineboxes) {
    //$scope.pineboxes = $scope.doubleArray(pineboxes);
    $scope.pineboxes = $scope.randomize(pineboxes);
    $scope.arrange(pineboxes);
    $scope.numPairs = $scope.pineboxes.length/2; // alternatively: the db would contain only single values and a function would double the array and randomize it
    console.log("num of pairs is: " + $scope.numPairs);
  });
}]);
