angular.module('todoApp',['ngRoute','btford.socket-io']);

angular.module('todoApp').config(function($routeProvider){
    $routeProvider.when('/',{
        templateUrl:'templates/home.html',
        controller:'homeCtrl'
    })
})

angular.module('todoApp').factory('socket', function (socketFactory) {
  return socketFactory({
    
    ioSocket: io.connect('localhost:7000')
  });
});

angular.module('todoApp').controller('homeCtrl',function($http,$scope,socket){
	var name=window.prompt('enter your name:');
	socket.emit('login',name);
	socket.on('joinchat',function(users){
		$scope.users=users;
		
	});
$scope.send=function(){
	socket.emit('msg',{
		'name':name,
		'msg':$scope.msg


		})}
	socket.on('msgs',function(msgs){
		$scope.msgs=msgs;

	});

});