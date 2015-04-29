angular.module('invoicemgmt')
	.directive('invoiceTableDirective', function(){
		return {
			restrict: 'E',
			//replace: true,
			scope: {
				customerDataList: '=customerDataList',
				customer: '=customer' 
			},
			templateUrl: 'app/invoicemgmt/views/invoiceTableTemplate.html',
			
			controller: function( $scope, $element, $attrs, $transclude ){
				console.log("Controller for directive ...["+$scope.customer.id+"]");
				
			},
			
			link: function(scope, element, attr){
				console.log("In Link function...."+scope.customer.id);
				scope.totalInvoices = scope.customerDataList[scope.customer.id].invoices.length;
				scope.maxSize = 2;
				scope.currentPage = 1;
				scope.invoicesPerPage = 3;
				scope.numPages = scope.invoicesPerPage * scope.totalInvoices;
				scope.filteredInvoices = angular.copy(scope.customerDataList[scope.customer.id].invoices);
				scope.pageChanged = function(){
					 var begin = ((scope.currentPage - 1) * scope.invoicesPerPage),
					     end = begin + scope.invoicesPerPage;
					 scope.filteredInvoices = scope.customerDataList[scope.customer.id].invoices.slice(begin, end);
				};
				scope.pageChanged();
			}
		};
	});