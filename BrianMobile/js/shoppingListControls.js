var localStorageKey = new String();
var listLocalStorageKey = "multiList";

function DefineLocalStorageKey (keyValue) {
	localStorageKey = keyValue;    
}

function showStoreValue() {	
	var currentLists = JSON.parse(localStorage.getItem(listLocalStorageKey));
	var proceed = false;
	$.each(currentLists, function (index, value) {
		if (value.ListName == localStorageKey) {
			proceed = true;
			localStorageKey = value.ListName;
		}
	});
	if (proceed) {
		var item = localStorage.getItem(localStorageKey);
		
		item = $.parseJSON(item);		
		$('.shoppingListWrapper').empty();
		$.each(item, function(index, value) {        
			$('.shoppingListWrapper').append('<tr><td>' + '<input type="radio" value=' + value.itemid + 'text=' + value.qty + '/></td><td>' + value.itemid + '</td><td>' + value.qty + '</td></tr><tr><td colspan="3"><hr /></td></tr>');		
		});
	}
	else {
		if (localStorage.getItem("Default") == null) {
			getInitialLocalStorage();
			item = JSON.parse(localStorage.getItem(localStorageKey));		
		}
		else {
			var itemDefault = localStorage.getItem("Default");
		
			itemDefault = $.parseJSON(itemDefault);		
			$('.shoppingListWrapper').empty();
			$.each(itemDefault, function(index, value) {        
				$('.shoppingListWrapper').append('<tr><td>' + '<input type="radio" value=' + value.itemid + 'text=' + value.qty + '/></td><td>' + value.itemid + '</td><td>' + value.qty + '</td></tr><tr><td colspan="3"><hr /></td></tr>');		
			});       
		}
	}
    
}

$(document).bind('pageinit', function() {
	var ListNameValue = window.location.search.substring(1).toString();
	ListNameValue = ListNameValue.substring(ListNameValue.indexOf('=') + 1, ListNameValue.length);    	
	DefineLocalStorageKey(ListNameValue);
    
	if ($('#headingName').length) {
		document.getElementById("headingName").innerHTML = ListNameValue;            
	}    
	showStoreValue();
	if ($('#addToStorage').length) {
		$('#addToStorage').click(function(e) {
			var addedItem = $('#entry').val();
			var itemValues = addedItem.split(",");
			var currentItems = JSON.parse(localStorage.getItem(localStorageKey));
			var obj = {'itemid': itemValues[0], 'qty': itemValues[1]};
			currentItems.push(obj);
			localStorage.setItem(localStorageKey, JSON.stringify(currentItems));
			showStoreValue();
			e.preventDefault();
		});
	}       
});

function getInitialLocalStorage() {
	$.getJSON('Data/shoppingList.json', function(result) {
		localStorage.setItem("Default", JSON.stringify(result));
	});   
}