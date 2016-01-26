angular.module('NoComplyApp').controller('EventsController', EventsController);

function EventsController($scope, $http) { 
  $http.get('/events.json').success(function (response) {
    $scope.events = response;
  });
}