angular.module('invoicemgmt')
	.controller('InvoiceCtrl', ['$scope', 'CustomerDataService', '$state', 'InvoiceService', function($scope, CustomerDataService, $state, InvoiceService){
		//console.log("Invoice Controller");
		$scope.items = [];
		$scope.totalCost = 0;
		$scope.itemCost = 0;
		$scope.customerDataList = CustomerDataService.getCustomerList();
		//console.log("Customer List : " + JSON.stringify($scope.customerDataList));
		$scope.customerListArray = CustomerDataService.getCustomerListArray();
		
		//$state.go('customer.list');
		$scope.disableNameInput = false;
		$scope.itemSuccess = false;
		$scope.warning = false;
		$scope.invoiceSuccess = false;
		
		$scope.disableSubmitBtn = false;
		$scope.disableAnotherItemBtn = false;
		//$scope.disableAnotherInvoiceBtn = true;
		
		$scope.onSelect = function ($item, $model, $label) {
			//console.log("$item : " + JSON.stringify($item));
			//console.log("$model : " + $model);
			//console.log("$label : " + $label);
			$scope.customer = $scope.customerDataList[$item['id']];
			$scope.customerId = $item['id'];
			//console.log("Customer : " + JSON.stringify($scope.customer));
			$scope.model = $model;
			$scope.label = $label;
			$scope.address = $scope.customer.address;
			$scope.disableNameInput = true;
		};
		
		$scope.addItem = function(){
			//console.log("Items : " + JSON.stringify($scope.items));
			if (!$scope.itemName || !$scope.itemCost) {
				return $scope.displayWarning();
			}
			$scope.items.push({itemName : $scope.itemName, itemCost : $scope.itemCost});
			$scope.totalCost += $scope.itemCost;
			$scope.itemName = '';
			$scope.itemCost = 0;
			$scope.itemSuccess = true;
			$scope.warning = false;
			$scope.invoiceSuccess = false;
		};
		
		$scope.addInvoice = function(){
			if (!$scope.validateDetails()) {
				return $scope.displayWarning();
			}
			//console.log("Current Items in the invoice are --> "+ JSON.stringify($scope.items));
			$scope.items.push({itemName : $scope.itemName, itemCost : $scope.itemCost});
			$scope.totalCost += $scope.itemCost;
			$scope.customerDataList = InvoiceService.addInvoice($scope.customerId, $scope.items);
			$scope.itemSuccess = false;
			$scope.warning = false;
			$scope.invoiceSuccess = true;
			$scope.disableSubmitBtn = true;
			$scope.disableAnotherItemBtn = true;
		};
		
		$scope.displayWarning = function() {	
			$scope.warning=true;
			$scope.itemSuccess = false;
			$scope.invoiceSuccess = false;
			return;
		};
		
		$scope.validateDetails = function(){
			if (!$scope.itemName || !$scope.itemCost || !$scope.address || !$scope.label) {
				return false;
			}
			return true;
		};
		
		$scope.reset = function(){
			$scope.disableSubmitBtn = false;
			$scope.disableAnotherItemBtn = false;
			$scope.warning=false;
			$scope.itemSuccess = false;
			$scope.invoiceSuccess = false;
			$scope.model = '';
			$scope.label = '';
			$scope.address = '';
			$scope.itemName = '';
			$scope.itemCost = 0;
			$scope.totalCost = 0;
			$scope.nameSelected = '';
			$scope.disableNameInput = false;
			$scope.items = [];
		};
		

	}])
	.controller('InvoiceListCtrl', ['$scope', 'CustomerDataService', '$state', 'InvoiceService', function($scope, CustomerDataService, $state, InvoiceService){
		$scope.customerDataList = CustomerDataService.getCustomerList();
		$scope.invoiceList = InvoiceService.getInvoices();
		$scope.customerIdNameMap = CustomerDataService.getCustomerListArray();
		//console.log("[InvoiceListCtrl] Invoice List : " + JSON.stringify($scope.invoiceList));
		$scope.invoiceCostMap ={};
		//console.log("[InvoiceListCtrl] Customer Data List : " + JSON.stringify($scope.customerDataList));
		//console.log("[InvoiceListCtrl] CustomerID Name Map : " + JSON.stringify($scope.customerIdNameMap));
		$scope.trimCustomerWithNoInvoice = function(){
			for (var cusId in $scope.customerDataList){
				if ($scope.customerDataList[cusId].invoices.length === 0){
					delete $scope.customerDataList[cusId];
					
				}
			}			
		};
		
		$scope.trimCustomerWithNoInvoice();
		
		$scope.calculateInvoiceCost = function(){
			var totalCost = 0;
			for(var invoiceId in $scope.invoiceList){
				for(var i=0 ; i<$scope.invoiceList[invoiceId].length; i++){					
					totalCost += $scope.invoiceList[invoiceId][i].itemCost;
				}
				$scope.invoiceCostMap[invoiceId] = totalCost;
				totalCost = 0;
			}
		};
		$scope.calculateInvoiceCost();

	}]);
