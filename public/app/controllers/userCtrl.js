angular.module('userCtrl', ['userService'])

.controller('userController', function(user){
	var vm = this;
	vm.users={};

	user.all()
		.success(function(data){
			vm.users = data;
		})
})

.controller('userCreateController', function(user, $location, $window){

	var vm = this;

	vm.signupUser = function(){

		vm.message = '';

		user.create(vm.userData)
			.then(function(response){
				vm.userData = {};
				vm.message = response.data.message;

				$window.localStorage.setItem('token', response.data.token);
				$location.path('/');
			})
	};
})