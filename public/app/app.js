angular.module('testApp', ['authService', 'mainCtrl', 'appRoutes', 'userCtrl'])

.config(function($httpProvider){

	$httpProvider.interceptors.push('AuthInterceptor');
});