angular.module('NoComplyApp').controller('TeamController', TeamController);

function TeamController($scope, $http) { 
  $http.get('/theteam').success(function (response) {
    $scope.team = response;
  })

  $scope.show = function (_id) {
    $scope.team.forEach(function (team){
      if (team._id === _id) {
        $scope.thisMember = team
        console.log(team.imgOne)
      }
    })
  }
}