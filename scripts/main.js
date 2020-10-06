'use strict'

$(document).ready(function() {
	
	//global variables
	let result = null;
	let operand_2;
	let operator = "";
	let operation = $("#operation");
	let display = $("#display");
	let numOperationsHistory = 0;


	//declare cookie variables
	if (!document.cookie) {
	document.cookie = "history1= 1+2 = 3; ";
	document.cookie = "history2= 0; ";
	document.cookie = "history3= 0; ";
	document.cookie = "history4= 0; ";
	document.cookie = "history5= 0; ";
	document.cookie = "history6= 0; ";
	document.cookie = "history7= 0; ";
	document.cookie = "history8= 0; ";
	document.cookie = "history9= 0; ";
	document.cookie = "history10= 0;";
	}

	//get cookie values
	function getCurrentCookieValues() {
	let cookieValues = document.cookie
			.split(';')
			.map(cookie => cookie.split('='))
			.reduce((accumulator, [key, value]) =>
				({...accumulator, [key.trim()]: decodeURIComponent(value)}),
	{});
	
	return cookieValues;
	}

	//assign cookie values to history
	function recreateHistoryFromCookies(){
		let cookieValues = getCurrentCookieValues();
		for (let i = 1; i <= 10; i++) {
			if (cookieValues[`history${i}`] == "0") break;
			else {
				saveToHistory(cookieValues[`history${i}`]);
				console.log(numOperationsHistory);
			}
		}
	}
	
	recreateHistoryFromCookies();
	
	function saveOperationToCookie(operation, index) {
		let cookieValues = getCurrentCookieValues();
		if (cookieValues['history10'] == "0") {
			document.cookie = `history${index} = ${operation}; `;
		}
		else {
			document.cookie = `history1 = ${cookieValues['history2']}; `;
			document.cookie = `history2 = ${cookieValues['history3']}; `;
			document.cookie = `history3 = ${cookieValues['history4']}; `;
			document.cookie = `history4 = ${cookieValues['history5']}; `;
			document.cookie = `history5 = ${cookieValues['history6']}; `;
			document.cookie = `history6 = ${cookieValues['history7']}; `;
			document.cookie = `history7 = ${cookieValues['history8']}; `;
			document.cookie = `history8 = ${cookieValues['history9']}; `;
			document.cookie = `history9 = ${cookieValues['history10']}; `;
			document.cookie = `history10 = ${operation}; `;
		}
	}
	
	
	//click on a number
	$("input.number").on('click', function () {
		if (operator == '=') resetCalculator();
			
		let num = $(this).attr("value");
		display.attr("value", display.attr("value") + num);		
		
		//$(this).attr("value","b"); //test
	} );

	//click on an operator
	$("input.operator").on('click', function () {
		if (operator == '=') operation.attr('value', "");
		if ( $(this).attr('value') == '-' && display.attr('value') == "") {
		    display.attr('value', '-');	
		} else {
		    chooseOperation();
            updateOperator($(this).attr('value'));
            operation.attr('value',operation.attr('value') + display.attr('value')+" " + operator + " ");
            display.attr('value', "");
        }
    });
			
	function chooseOperation () {
		switch (operator) {
			case '=' : ;
		    case "" : updateResult(+display.attr('value'));
			break;
			case '+': sum (result, +display.attr("value"));
		    break;
		    case '-': subtract(result, +display.attr("value"));
		    break;
		    case '*': multiply(result, +display.attr("value"));
		    break;
		    case '/': divide(result, +display.attr("value"));
		    break;
		    case '^': power(result, +display.attr("value"));
		    break;
		}
	}
	
	
	function sum(a,b){
		updateResult(a + b);
	    }
	
	function subtract(a,b) {
		updateResult(a - b);
	}
	
	function multiply(a,b) {
		updateResult(a * b);
	}
	
	function divide(a,b) {
		updateResult(a / b); // confirm this one
	}
	
	function power(a,b) {
		updateResult(a ** b);
	}
        //when click '%'
$('#percent').on('click', function() {
	display.attr('value', display.attr('value') / 100);
 	});
	
	function updateResult(number) {
		result = number;
		console.log(result);
	}
	
	function updateOperator(signal){
		operator = signal;
		console.log(operator);
	}
	 
	function showResult(){
		chooseOperation();
	    display.attr("value", result);
	}
		//when click '='
	$('input#enter').on('click', function() {
		operation.attr('value',operation.attr('value') + display.attr('value')+" = " );
		showResult();
		updateOperator("=");
		saveToHistory(operation.attr('value') + result);
		saveOperationToCookie(operation.attr('value') + result, numOperationsHistory); 
	});
	
	function resetCalculator() {
		display.attr('value', "");
		operation.attr('value', "");
		updateResult(null);
		operator = "";
	}
	
	//erase last character
	$("#C").on('click', function () {
		display.attr("value", display.attr("value").slice(0,-1));
	} );

	
	//erase everything
	$("#CE").on('click', function () {
		display.attr("value", "");
		operation.attr("value", "");
		updateResult(null);
		updateOperator("");
	} );
		
	
	function saveToHistory(value) {
		
		let maxOperationsHistory = 10;
		
		if (numOperationsHistory < maxOperationsHistory) {
			let li = document.createElement('li');
			li.innerHTML = "<p>" + value + "</p>";
			$('ul').prepend(li);	
			numOperationsHistory++;
		}
		else {
			$("ul li:last-child").remove();
			let li = document.createElement('li');
			li.innerHTML = "<p>" + value + "</p>";
			$('ul').prepend(li);
		}
	}

	

	function currentTime() {

        let date = new Date();
	    let hour = date.getHours();
	    let min = date.getMinutes();
	    let sec = date.getSeconds();

		hour = updateTime(hour);
		min = updateTime(min);
		sec = updateTime(sec);

        $('#clock').html("<p>" + hour +":" + min + ":" + sec);

	    function updateTime(k) {
		    if (k < 10) return '0'+ k;
		    else return k;
	    }

	    var t = setTimeout(function(){ currentTime() }, 1000);
	}

	currentTime();
	

   
    	
	
	

} );