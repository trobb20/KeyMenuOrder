
/*

VARIABLES

*/
var order;
var email;
var number;
var dataList=[];
var menu = [];
var signIn = false;
/*

INIT

*/
function init(){
	$('.menu').hide();
	
	$.ajax({
		url:'menu.txt',
		success: function (data){
			dataList=data.split('\n');
			};
		}
	});
}
$(document).ready(init)
/*
Classes
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

PASTE MENU INFO BELOW HERE


var pizza = new Item("pizza",2.0);
var wrap = new Item("wrap",1.5);
var icecream = new Item("icecream",0.5);
var water = new Item("water",2.0);
var chips = new Item("chips",1.75);
var candy = new Item("candy",0.75);
var salad = new Item("salad",2.5);
var apple = new Item("apple",1.5);
var cookie = new Item("cookie",1.0);
var gatorade = new Item("gatorade",2.0);
var menu = [pizza, wrap, icecream, water, chips, candy, salad, apple, cookie, gatorade];

/*

END MENU INFO

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
		//alert(number);
		if(number > 0){
			for(var j = 1; j<=number; j++){
				items.push(menu[i]);}
		}
	}
	//alert(items[0].name);
	order = new Order(items, email);
	$('.order').html('You ordered: '+order.list()+'. <br> That totals: $'+order.calcTotal());
	$('.confirm').html('<button onclick="confirmOrder()">Confirm Order</button>');
}

function confirmOrder(){
	alert("Your order of "+order.list()+" was confirmed for "+order.email);
}

