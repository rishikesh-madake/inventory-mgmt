angular.module('invoicemgmt')
	.filter('checkInvoices',['CustomerDataService','InvoiceService', function(CustomerDataService, InvoiceService){
		return function(input){
			var out=[];
			var customerList = CustomerDataService.getCustomerList();
			for (var i=0; i<input.length; i++){
				if (customerList[input[i].id].invoices.length > 0){
					out.push(input[i]);
				}
			}
			return out;
		};
	}]);