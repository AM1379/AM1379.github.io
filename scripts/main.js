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
		let d = new Date();
		d.setStime(d.getTime() + (30*24*60*60*1000));
		let expires = "expires="+d.toUTCString();
	document.cookie = "history1= 1+2;" + expires + ";path=/;";
	document.cookie = "history2= 0; " + expires + ";path=/;";
	document.cookie = "history3= 0; " + expires + ";path=/;";
	document.cookie = "history4= 0; " + expires + ";path=/;";
	document.cookie = "history5= 0; " + expires + ";path=/;";
	document.cookie = "history6= 0; " + expires + ";path=/;";
	document.cookie = "history7= 0; " + expires + ";path=/;";
	document.cookie = "history8= 0; " + expires + ";path=/;";
	document.cookie = "history9= 0; " + expires + ";path=/;";
	document.cookie = "history10= 0;" + expires + ";path=/;";
	}

	//get cookie values
	function getCurrentCookieValues() {
	let cookieValues = document.cookie
			.split(';')
			.map(cookie => cookie.split('='))
			.reduce((accumulator, [key, value, result]) => (
			{...accumulator, [key.trim()]: { 
			val: decodeURIComponent(value), 
			res: decodeURIComponent(result) } 
			}), 
			{});
	
	return cookieValues;
	}

	//assign cookie values to history
	function recreateHistoryFromCookies(){
		let cookieValues = getCurrentCookieValues();
		for (let i = 1; i <= 10; i++) {
			if (cookieValues[`history${i}`]['val'] == "0") break;
			else {
				saveToHistory(cookieValues[`history${i}`]['val'] + " = " + cookieValues[`history${i}`]['res'] );
				console.log(numOperationsHistory);
			}
		}
	}
	
	recreateHistoryFromCookies();
	
	function saveOperationToCookie(operation, index) {
		let cookieValues = getCurrentCookieValues();
		if (cookieValues['history10']['val'] == "0") {
			document.cookie = `history${index} = ${operation}; `;
		}
		else {
			
			for (let i = 1; i<10; i++) {
				let op = cookieValues[`history${i+1}`]['val'] + "=" + cookieValues[`history${i+1}`]['res'];
				document.cookie = `history${i} = ${op}; `;
			}
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