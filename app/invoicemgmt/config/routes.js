angular.module('invoicemgmt')
	.config(function($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise('/customer');
		
		$stateProvider
			.state('customer', {
				url: '/customer',
				templateUrl: 'app/invoicemgmt/views/customer.html',
				controller: function($scope, $rootScope, $state){
					//console.log("In Customer Controller !!");
					$rootScope.tabSelected='Customer';
					
					$scope.highlightSubTab = function(subTabSelected){
						//console.log('--->HighlightSubTab function called!!');
						$rootScope.subTabSelected = subTabSelected;
					};
					//if page refresh on customer.add/list then the highlighting should be preserved
					if ($state.current.name === 'customer.add' || $state.current.name === 'customer.list'){
						$scope.highlightSubTab($state.current.data.stateSelected);
					}
					
				},

				onEnter: function(){
					console.log('Entered Customer state !!');
				}
			})
			.state('customer.add', {
				url: '/add',
				templateUrl: 'app/invoicemgmt/views/customerAdd.html',
				controller: 'CustomerCtrl',
				data: {
					stateSelected : 'CustomerAdd'
				},
				onExit: function($state){
					//console.log('Exiting CustomerAdd state =' + $state.current.name + ", Data  : " + $state.current.data.stateSelected);
				}
			})
			.state('customer.list', {
				url: '/list',
				templateUrl: 'app/invoicemgmt/views/customerList.html',
				controller: 'CustomerCtrl',
				data: {
					stateSelected : 'CustomerList'
				}
			})
			.state('invoice', {
				url: '/invoice',
				templateUrl: 'app/invoicemgmt/views/invoice.html',
				controller: function($scope, $rootScope, $state){

					$rootScope.tabSelected='Invoice';

					$scope.highlightSubTab = function(subTabSelected){
						console.log('--->Invoice HighlightSubTab function called - !!' + subTabSelected);
						$rootScope.subTabSelected = subTabSelected;
					};
					
					if ($state.current.name === 'invoice.add' || $state.current.name === 'invoice.list' || 
							$state.current.name === 'invoice.list.showInvoiceDetails' || $state.current.name === 'invoice.list.showCustomerDetails'){
						$scope.highlightSubTab($state.current.data.stateSelected);
					}
				}
			})
			.state('invoice.add', {
				url: '/add',
				templateUrl: 'app/invoicemgmt/views/invoiceAdd.html',
				controller: 'InvoiceCtrl',
				data: {
					stateSelected : 'InvoiceAdd'
				}
			})
			.state('invoice.list', {
				url: '/list',
				templateUrl: 'app/invoicemgmt/views/invoiceList.html',
				data: {
					stateSelected : 'InvoiceList'
				},
				controller: 'InvoiceListCtrl'
			})
			.state('invoice.list.showCustomerDetails', {
				url: '/showCustomerDetails/:cusId',
				templateUrl: 'app/invoicemgmt/views/showCustomerDetails.html',
				controller: function($scope, $stateParams, $state, CustomerDataService){
					$scope.customerDataList = CustomerDataService.getCustomerList()[$stateParams.cusId];
				}
			})
			.state('invoice.list.showInvoiceDetails', {
				url: '/showInvoiceDetails/:invoiceId',
				templateUrl: 'app/invoicemgmt/views/showInvoiceDetails.html',
				controller: function($scope, $stateParams, $state, InvoiceService){
					$scope.invoiceList = InvoiceService.getInvoices()[$stateParams.invoiceId];
					$scope.totalCost = 0;
					for(var i=0; i<$scope.invoiceList.length; i++){
						$scope.totalCost += $scope.invoiceList[i].itemCost;
					}
				}
			});
	})
	.run(function($rootScope){
		//console.log("RUN CALLED !!!!");
		$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
			//console.log("STATE CHANGE SUCCESS !!!");
			//console.log("From State :" + fromState.name);
			//console.log("To State :" + toState.name);
			if (toState.name === 'customer' || toState.name === 'invoice'){
				//console.log("Remove SUB tab selection !!!");
				$rootScope.subTabSelected = '';
			}
		});
	});