angular.module('invoicemgmt')
	.controller('CustomerCtrl', ['$scope', 'CustomerDataService', '$state', function($scope, CustomerDataService, $state){
		$scope.customerDataList = CustomerDataService.getCustomerList();
		console.log('CustomerCtrl start...');
		console.log('----> Current State : ' + JSON.stringify($state.current));
		console.log('----> Customer List : ' + JSON.stringify($scope.customerDataList));
		$scope.success=false;
		$scope.warning=false;

		$scope.customerAdd = function(){
			if ($scope.name && $scope.address){
				$scope.customerDataList = CustomerDataService.addCustomer($scope.name, $scope.address);
				$scope.success = true;
				$scope.warning = false;

			}
			else{
				$scope.warning = true;
				$scope.success=false;
			}
		};
		
		$scope.clearMessages = function(){
			$scope.warning = false;
			$scope.success = false;
		};
	}]);