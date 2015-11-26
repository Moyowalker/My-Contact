var uid = 0;
angular.module('myApp', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/index', 
	{
		controller: 'ContactController',
		templateUrl: 'index.html'
	})
	.when('/view2',
	{
		controller: 'ContactController',
		templateUrl: 'form.html'
	})
	.otherwise({ redirectTo: '/index.html' });
}])
.controller('ContactController', ['$scope','$http', function ($scope, $http) {
	console.log('Welcome');
	$scope.familyCount = 0;

	$scope.friendCount = 0;

	$scope.otherCount = 0;
	

	$scope.newcontact = {isDeleted: false};
		$scope.contacts = [];
		$scope.showForm = false;
		$scope.displayForm = function() {
			console.log('I ran')
			if ($scope.showForm === true) {
				$scope.showForm = false;
			} else {
				$scope.showForm = true;
			}
		}


		// $scope.seeForm = false;
		// // $scope.viewForm = function() {
		// // 	console.log('okies')
		// // 	if ($scope.showForm === true) {
		// // 		$scope.showForm = false;
		// // 	} else {
		// // 		$scope.showForm = true;
		// // 	}
		// // }
		//for new contact
		$scope.saveContact = function () {
			var contacts = [];
			if ($scope.newcontact.id == null) {
				$scope.newcontact.id = ++uid;
				contacts.push($scope.newcontact);
				$scope.contacts.push($scope.newcontact);
			}
			//this is for updating the contact
			else {
				for(i in $scope.contacts){
					if($scope.contact[i].id == $scope.newcontact.id) {
						$scope.contacts[i] = $scope.newcontact;
					}
				} 
			}
			console.log(contacts)
			for(var i = 0; i < contacts.length; i++){
				//console.log($scope.contacts[i]);
				if(contacts[i].group == "Family"){
					$scope.familyCount += 1;
				} else if (contacts[i].group == "Friend") {
					$scope.friendCount += 1;
				} else {
					$scope.otherCount += 1;
				}
			}
			
			$scope.newcontact = {isDeleted: false};
			}

		$scope.delete = function(id) {
			//this is for 
			// for(i in $scope.contacts) {
			// 	if($scope.contacts[i].id == id) {
					$scope.contacts.splice(id,1);
			// 		$scope.newcontact = {};
			// 	}
			// }
		}
		$scope.edit = function(id) {
			for(i in $scope.contacts) {
				if($scope.contacts[i].id == id)
				//i'm using angular.copy() to create a copy 
			{
					$scope.newcontact = angular.copy($scope.contacts[i]); 
				}
			}
		}

		$scope.doFilter = function(a){
			console.log(a);
			if(a == 0){
				$scope.filters = "";
			}else if(a == 1){
				$scope.filters = "friend";
			}else if(a == 2){
				$scope.filters = "family";
			}else{
				$scope.filters = "other";
			}
		}

		// var familyLen = function($scope){
		// 	var count = 0;
		// 	for(var i = 0; i <= $scope.contacts; i++){
		// 		//console.log($scope.contacts[i]);
		// 		if($scope.contacts[i].group == "Family"){
		// 			count++;
		// 			console.log("ah shoki");
		// 		}
		// 	}
		// 		return count;
		// }

		// var friendLen = function($scope){
		// 	var count = 0;
		// 	for(var i = 0; i <= $scope.contacts; i++){
		// 		if($scope.contacts[i].group == "Other"){
		// 			count++;
		// 			console.log("Good Good");
		// 		}
		// 	}
		// 	return count;
		// }

		// var otherLen = function($scope){
		// 	var count = 0;
		// 	for(var i = 0; i <= $scope.contacts; i++){
		// 		if($scope.contacts[i].group == "Friend"){
		// 			count++;
		// 			console.log("On the cool homey");
		// 		}
		// 	}
		// 	return count;
		// }
	}
	]);