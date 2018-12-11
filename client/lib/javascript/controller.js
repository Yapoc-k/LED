
angular.module("myApp").controller('monControl', function($scope, $http) {
    $scope.switch= function() {
    $http({
        method: 'POST',
        url: 'https://api.particle.io/v1/devices/2a0043000f47363333343437/led?access_token=691443f08c9facdc097192e19076258105bb0bc3',
        data: {"arg":$scope.modelONoff}
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          console.log(response)
          // when the response is available
        }, function errorCallback(response) {
          // called asynchronously if an error occurs

          // or server returns response with an error status.
        });}
  });
