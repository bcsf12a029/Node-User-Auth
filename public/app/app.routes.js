angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider){

	$routeProvider

		.when('/', {

			templateUrl: 'app/views/pages/home.html',
			controller: 'mainController',
			controllerAs: 'main'
		})

		.when('/login', {

			templateUrl: 'app/views/pages/login.html',
			controller: 'mainController',
			controllerAs: 'loginCtrl'
		})

		.when('/signup', {

			templateUrl: 'app/views/pages/signup.html',
			controller: 'userCreateController',
			controllerAs: 'user'
		})

		.otherwise({
			redirectTo: '/'
		})

});