angular.module('mainCtrl', [])

.controller('mainController', function($rootScope, $location, auth){
	var vm = this;

	vm.loggedIn = auth.isLoggedIn();
	
	vm.loginData = {};

	$rootScope.$on('$routeChangeStart', function(){

		vm.loggedIn = auth.isLoggedIn();

		auth.getUser()
			.then(function(data){
				vm.user = data.data;
			});
	});

	vm.doLogin = function(){

		vm.error = '';

		auth.login(vm.loginData.username, vm.loginData.password)
			.success(function(data){

				auth.getUser()
					.then(function(data){
						vm.user = data.data;
					});

				if(data.success)
					$location.path('/');
				else
					vm.error = data.message;
			});
	};

	vm.doLogout = function(){
		auth.logout();
		$location.path('/logout');
	};

});