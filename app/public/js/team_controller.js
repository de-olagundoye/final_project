angular.module('NoComplyApp').controller('TeamController', TeamController);

function TeamController($scope, $http) { 
  $http.get('/team.json').success(function (response) {
    $scope.team = response;
  });

  $scope.show = function (_id) {
    $scope.team.forEach(function (team){
      if (team._id === _id) {
        $scope.thisMember = team;
        $scope.imageArray = team.img
        
        console.log($scope.imageArray)
      }
    });
  };

 $scope.delete = function (data) {
    var id = $scope.team.indexOf(data);
    memberId = data._id

    if(confirm('Do you really want to delete ' + data.name +'?')){
      $scope.team.splice(id, 1);
      $http.delete('/team/' + memberId).success (function(data) {
        console.log(res.data);       
      })
    }
  }
}