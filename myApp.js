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
	
	$scope.myData = new Firebase("https://my-contact-manager.firebaseio.com/Contacts")

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
		var contacts = [];
		$scope.saveContact = function () {
			console.log("What is happening?")
			contacts.push($scope.newcontact);
			$scope.myData.push($scope.newcontact);
			// {
			// 	Name:$scope.newcontact.newContactName,
			// 	Address:$scope.newcontact.newContactAddress,
			// 	Phone:$scope.newcontact.newContactPhone,
			// 	Email:$scope.newcontact.newContactEmail,
			// 	Group:$scope.newcontact.newContactGroup});
		};

		$scope.myData.on("value", function(snapshot) {
			$scope.contactg = snapshot.val();
	 		$scope.contacts = [];
			angular.forEach($scope.contactg , function(i){
				$scope.contacts.push(i);
			})
			
			for(var i = 0; i < $scope.contacts.length; i++){
				//console.log($scope.contacts[i]);
				if($scope.contacts[i].group == "Family"){
					$scope.familyCount += 1;
				} else if ($scope.contacts[i].group == "Friend") {
					$scope.friendCount += 1;
				} else {
					$scope.otherCount += 1;
				}
			}
			$scope.$apply();

		});
			// var contacts = [];
			// if ($scope.newcontact.id == null) {
			// 	$scope.newcontact.id = ++uid;
			// 	contacts.push($scope.newcontact);
			// 	$scope.contacts.push($scope.newcontact);
			// }
			//this is for updating the contact
			// else {
			// 	for(i in $scope.contacts){
			// 		if($scope.contact[i].id == $scope.newcontact.id) {
			// 			$scope.contacts[i] = $scope.newcontact;
			// 		}
			// 	} 
			// }
			//console.log(contacts)

			$scope.newcontact = {isDeleted: false};
			

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