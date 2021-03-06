$(function() {


	// to tackle the csrf token
	var token = $('meta[name="_csrf"]').attr('content');
	var header = $('meta[name="_csrf_header"]').attr('content');
	
	if(token.length > 0 && header.length > 0) {		
		// set the token header for the ajax request
		$(document).ajaxSend(function(e, xhr, options) {			
			xhr.setRequestHeader(header,token);
			
		});				
	}
	
	
	// code for jquery dataTable

	
	var $table = $('#productsListTables');
	
	// execute the below code only where we have this table
	if($table.length) {
		console.log('Inside the table!');
		
		var jsonUrl = '';
		if(window.category_id == '') {
			jsonUrl = window.contextRoot + '/json/data/all/products';
		}
		else {
			jsonUrl = window.contextRoot + '/json/data/category/'+ window.category_id +'/products';
//		
			
		
		
		$table.DataTable( {
			
			pageLength: 5,
			ajax: {
				url: jsonUrl,
				dataSrc: ''
			},
			columns: [
			          {
			        	  data: 'code',
			        	  bSortable: false,
			        	  mRender: function(data, type, row) {
			        		  
			        		  return '<img src="'+window.contextRoot+'/resources/images/'+data+'.jpg" class="dataTableImg"/>';
			        		  
			        	  }
			          },
			          {
			        	  data: 'name'			        	  
			          },
			          {
			        	  data: 'brand'			        	  
			          },
			          {
			        	  data: 'unitPrice',
			        	  mRender: function(data, type, row) {
			        		  return 'Mt ' + data
			        	  }
			          },
			          {
			        	  data: 'quantity',
			        	  mRender: function(data, type, row) {
			        		
			        		  if(data < 1) {
			        			  return '<span style="color:red">Stock nao disponivel!</span>';
			        		  }
			        		  
			        		  return data;
			        		  
			        	  }
			          },
			          {
			        	  data: 'id',
			        	  bSortable: false,
			        	  mRender: function(data, type, row) {
			        		  
			        		  var str = '';
			        		  str += '<a href="'+window.contextRoot+ '/show/'+data+'/product" class="btn btn-primary"><span class="glyphicon glyphicon-eye-open"></span></a> &#160;';

			        		  if(userRole == 'ADMIN') {
			        			  str += '<a href="'+window.contextRoot+ '/manage/'+data+'/product" class="btn btn-warning"><span class="glyphicon glyphicon-pencil"></span></a>';
			        		  }
			        		  else {
				        		  if(row.quantity < 1) {
				        			  str += '<a href="javascript:void(0)" class="btn btn-success disabled"><span class="glyphicon glyphicon-shopping-cart"></span></a>';
				        		  }
				        		  else {
				        			  str += '<a href="'+window.contextRoot+ '/cart/add/'+data+'/product" class="btn btn-success"><span class="glyphicon glyphicon-shopping-cart"></span></a>';  
				        		  }
			        		  }
			        		  
			        		  			        		  
			        		  
			        		  return str;
			        		  
			        	  }
			        	  
			          }
			          ]
		});
	}
	
	}
});