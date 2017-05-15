
/*

VARIABLES

*/
var order;
var email;
var number;
var frontEnd;
var menu = [];
var signIn = false;
/*

CLASSES

*/
function Order(items, frontEnd){
	this.items=items
	this.frontEnd=frontEnd
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
	$('.confirm').hide();
	
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
	email=document.getElementById('email').value;
	var backEnd = email.substr(email.length-14,email.length-1);
	frontEnd = email.substr(0,email.length-14);
	if (backEnd==='@keyschool.org'){
		signIn=true;
		$('.menu').fadeIn(1000);
	}
	else {
		alert("Invalid email. Make sure it ends with '@keyschool.org'. Please retype and hit submit email.");
	}
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
	order = new Order(items, frontEnd);
	$('.order').html('You ordered: '+order.list()+'. <br> That totals: $'+order.calcTotal());
	$('.confirm').show();
}

function confirmOrder(){
	
	//OUTPUT DATA TO DATA.TXT
	
	var dataToBeSent = order.frontEnd+':'+order.list()
	
	$.ajax({
		dataType: "text",
		url: 'data.txt',
		type: 'POST',
		data: dataToBeSent,
		success: function () {
			alert("Your order of "+order.list()+" was confirmed for "+order.frontEnd);
			alert(dataToBeSent)
		}
	})
	
}



