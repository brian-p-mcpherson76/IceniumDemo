var finalCoupons = "";
//http://markdalgleish.com/2011/04/document-ready-for-jquery-mobile/
var filterQueryString = "filter=";
var pageSizeQueryString = "pageSize=";
var currentPageQueryString = "currentPage=";
var sortQueryString = "sort=";
var brandNameQueryString = "brandName=";
var couponsArray;

function GetCouponList() {	
	$.getJSON('Data/data.json', function(result) {
		var finalOutput = "<ul data-role=\"listview\" data-theme=\"b\" class=\"ui-listview\">";
		for (var i = 0; i < result.CouponsGrid.length; i++) {

			finalOutput = finalOutput + "<li class=\"ui-li-count ui-li ui-li-static ui-body ui-li-has-count ui-btn-up-c ui-btn-corner-all\">" + "Save $" + parseFloat(result.CouponsGrid[i].Discount).toFixed(2) + " on "

						  + result.CouponsGrid[i].BrandName + " Expires On " + convertDate(result.CouponsGrid[i].ExpirationDate) + "</li>";

		}

		finalOutput = finalOutput + "</ul>";
		if ($('#couponList').length) {
			document.getElementById("couponList").innerHTML = finalOutput;
            finalOutput.trigger('create');
		}		
	});   	
}

$(document).bind('pageinit', function() {

	GetCouponList();

});

function convertDate(dateValue) {

	var fullDate = new Date(parseInt(dateValue.substr(6)));    

	return fullDate.getMonth().toString() + '/' + fullDate.getDate().toString() + '/' + fullDate.getFullYear().toString();

}