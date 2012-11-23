var listLocalStorageKey = "multiList";
 
function showListValue() {
	var itemList = localStorage.getItem(listLocalStorageKey);
	if (itemList == null) {
		getInitialListLocalStorage();
		itemList = JSON.parse(localStorage.getItem(listLocalStorageKey));
	}
	else if (itemList.length === 0) {
		itemList = 'List contains empty value';
	}
	else {
		itemList = $.parseJSON(itemList);
	}
	$('.multiListWrapper').empty();
	var finalHTML = "";
	$.each(itemList, function(index, value) {        
		        
		finalHTML = finalHTML + '<tr>';
		finalHTML = finalHTML + '<td class=\"multiListColumnThin\"><a href=\"#\" id=\"deleteList' + index + '\" data-role=\"button\" data-icon=\"delete\" data-iconpos=\"notext\" onClick=\"DeleteListFromDataBase(\'' + value.ListName + '\'' + ');\">Delete</a></td>';
		finalHTML = finalHTML + '<td class=\"multiListColumnThin\">&nbsp;</td>';
		finalHTML = finalHTML + '<td class=\"multiListColumnThick\">' + value.ListName + '</td>';
		finalHTML = finalHTML + '<td class=\"multiListColumnThin\"><a href=\"ShoppingList2.html?ListName=' + value.ListName + '\" id=\"GoToList' + index + '\" data-role=\"button\" data-icon=\"arrow-r\" data-iconpos=\"notext\">Go To</a></td>';
		finalHTML = finalHTML + '</tr>';
		finalHTML = finalHTML + '<tr>';
		finalHTML = finalHTML + '<td colspan=\"4\"><hr /></td>';
		finalHTML = finalHTML + '</tr>';        		       		
	});
	$('.multiListWrapper').append(finalHTML);
	$('.multiListWrapper').trigger('create');
}

$( document ).bind( "mobileinit", function(){
   $.mobile.popup.prototype.options.initSelector = "#cat";
});

$(document).bind('pageinit', function() {    
	showListValue(); 
	defineDialog();
	if ($('#PopupOpen').length) {                
		$('#PopupOpen').click(function(e) {	
			
            $('#AddListDialog').popup("open");
			e.preventDefault();
			return false;
		});
	}
    
    if ($('#CreateList').length) {                
		$('#CreateList').click(function(e) {	
			
            
			var addedList = $('#NewListName').val();
			var listArray = JSON.parse(localStorage.getItem(listLocalStorageKey));
			var obj = {'ListName' : addedList};            
			listArray.push(obj);
			localStorage.setItem(listLocalStorageKey, JSON.stringify(listArray));
			$('#AddListDialog').popup("close");
            showListValue();	            
			e.preventDefault();
			return false;
		});
	}
    
    
	$('#ListViewParent').listview('refresh');
});									

function getInitialListLocalStorage() {      
	AddListToDataBase("Default");
}

function AddListToDataBase(listValue) {
	var databaseObject = {"ListName" : listValue};
	localStorage.setItem(listLocalStorageKey, JSON.stringify(databaseObject));
	return true;
    
}

function DeleteListFromDataBase(listValue) {    	    
    
	var currentItems = JSON.parse(localStorage.getItem(listLocalStorageKey));
    
	$.each(currentItems, function (index, value) {
    
		if (value.ListName == listValue) {
    
			currentItems.splice(index, 1);            
			localStorage.setItem(listLocalStorageKey, JSON.stringify(currentItems));
			showListValue();            
			return true;
		}
	});
}

function defineDialog() {    
	$('#AddListDialog').popup({
        corners: true
    });
}