angular.module('invoicemgmt')
	.factory('CustomerDataService', [function(){
		var customerList, customerIdName=[];
		//window.localStorage.removeItem('customers');
		if (window.localStorage.getItem('customers')){
			customerList = JSON.parse(window.localStorage.getItem('customers'));
			customerIdName = JSON.parse(window.localStorage.getItem('customerIdNameMapping'));
		}
		else{
			customerList = {
					1429615302759: {name: 'John', address: 'Pune', invoices: []},
					1429615309246: {name: 'Scott', address: 'Pune', invoices: []},
					1429615311599: {name: 'Rishikesh', address: 'Pune', invoices: []}
			};
			for (var cusId in customerList){
				customerIdName.push({id: cusId, name: customerList[cusId].name});
			}
			window.localStorage.setItem('customers', JSON.stringify(customerList));
			window.localStorage.setItem('customerIdNameMapping', JSON.stringify(customerIdName));
		}
		
		//console.log("customerList of Customers : " + JSON.stringify(customerList));
		return {
			getCustomerList : function(){
				return JSON.parse(window.localStorage.getItem('customers'));
			},

			getCustomerListArray : function(){
				return JSON.parse(window.localStorage.getItem('customerIdNameMapping'));
			},

			addCustomer : function(name1, address1){
				customerList = JSON.parse(window.localStorage.getItem('customers'));
				customerIdName = JSON.parse(window.localStorage.getItem('customerIdNameMapping'));
				var cusId = new Date().getTime();
				customerList[cusId] = {name: name1, address: address1, invoices: []};
				customerIdName.push({id: cusId, name: name1});
				window.localStorage.setItem('customers', JSON.stringify(customerList));
				window.localStorage.setItem('customerIdNameMapping', JSON.stringify(customerIdName));
				//console.log("Customer Added : " + JSON.stringify(window.localStorage.getItem('customers')));
				return customerList;
			},
			
			updateCustomer:  function(customerList){
				window.localStorage.setItem('customers', JSON.stringify(customerList));
				customerList = JSON.parse(window.localStorage.getItem('customers'));
				return customerList;
			}
		};
	}])
	.factory('InvoiceService', ['CustomerDataService', function(CustomerDataService){
		var invoiceList, invoiceCustomerLink;
		
		//List of invoices
		if (window.localStorage.getItem('invoices')){
			invoiceList = JSON.parse(window.localStorage.getItem('invoices'));
		}
		else{
			invoiceList = {};
			window.localStorage.setItem('invoices', JSON.stringify(invoiceList));
		}
		
		//HAsh containing link between invoice and customer
		if (window.localStorage.getItem('invoiceCustomerLink')){
			invoiceCustomerLink = JSON.parse(window.localStorage.getItem('invoiceCustomerLink'));
		}
		else{
			invoiceCustomerLink = {};
			window.localStorage.setItem('invoiceCustomerLink', JSON.stringify(invoiceCustomerLink));
		}
		
		return {
			addInvoice : function(customerId, items){
				console.log("addInvoice service : customer Id : ["+ customerId +"], items : "+JSON.stringify(items)+"]" );
				var invoiceId = 'INV'+ new Date().getTime();
				
				//Set the invoices
				invoiceList = JSON.parse(window.localStorage.getItem('invoices'));
				invoiceList[invoiceId] = items;
				window.localStorage.setItem('invoices', JSON.stringify(invoiceList));
				
				//Update the invoices array in CustomerList
				var customersList = CustomerDataService.getCustomerList();
				customersList[customerId].invoices.push(invoiceId);
				
				//Map Invoices to corresponding customer
				invoiceCustomerLink = JSON.parse(window.localStorage.getItem('invoiceCustomerLink'));
				invoiceCustomerLink[invoiceId] = customerId;
				window.localStorage.setItem('invoiceCustomerLink', JSON.stringify(invoiceCustomerLink));
				
				//return the updated customerlist
				return CustomerDataService.updateCustomer(customersList);
			},
			
			getInvoiceDetails  : function(customerId){
				invoiceCustomerLink = JSON.parse(window.localStorage.getItem('invoiceCustomerLink'));
				return invoiceCustomerLink;
				
			},
			
			getInvoices : function(){
				invoiceList = JSON.parse(window.localStorage.getItem('invoices'));
				return invoiceList;
			}
		};
	}]);