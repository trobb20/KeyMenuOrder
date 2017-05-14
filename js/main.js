
/*

VARIABLES

*/
var order;
var email;
var number;
var menu = [];
var signIn = false;
/*

CLASSES

*/
function Order(items, email){
	this.items=items
	this.email=email
	this.calcTotal = function(){
		var itemsLength = items.length;
		var total = 0;
		for(var i = 0; i<itemsLength; i++){
			total = total + items[i].price
		}
		return total
	}
	this.list = function () {
		var list = [];
		var itemsLength = items.length;
		for(var i = 0; i<itemsLength; i++){
			list.push(items[i].name)
		}
		return list
	}
}
function Item(name, price){
	this.name=name;
	this.price=price;
}
/*

INIT

*/
function makeMenu(dataList){
	for(var i = 0; i<dataList.length;i++){
		var objList = dataList[i].split(',')
		var name = objList[0];
		var price = parseFloat(objList[1]);
		window[name]=new Item(name, price);
		menu.push(window[name]);
	}
	
	var htmlString='';
	
	for(var i = 0;i<menu.length;i++){
		htmlString=htmlString+'<label>'+menu[i].name+'</label><input type="number" id="'+menu[i].name+'Num" value="0"><br>';
	}
	
	$('.menuHTML').html(htmlString);
}
function init(){
	$('.menu').hide();
	
	$.ajax({
		url:'menu.txt',
		success: function (data){
			var dataList=data.split('\n');
			//alert('success')
			makeMenu(dataList)
			//parse your data here
			//you can split into lines using data.split('\n') 
			//an use regex functions to effectively parse it
		}
	});
}
$(document).ready(init);
/*

FUNCTIONS

*/
function submitEmail(){
	signIn=true;
	$('.menu').fadeIn(1000);
	email=document.getElementById('email').value;
}

function makeOrder(){
	var items = [];
	for(var i = 0; i<menu.length; i++){
		number = document.getElementById(menu[i].name+'Num').value;
		if(number > 0){
			for(var j = 1; j<=number; j++){
				items.push(menu[i]);}
		}
	}
	order = new Order(items, email);
	$('.order').html('You ordered: '+order.list()+'. <br> That totals: $'+order.calcTotal());
	$('.confirm').html('<button onclick="confirmOrder()">Confirm Order</button>');
}

function confirmOrder(){
	alert("Your order of "+order.list()+" was confirmed for "+order.email);
}



