
'use strict'

$(document).ready(function() {
	
	//global variables
	let result = null;
	let operand_2;
	let operator = "";
	let operation = $("#operation");
	let display = $("#display");
	let numOperationsHistory = 0;
	let urlParams = new URLSearchParams(window.location.search);
	let username = urlParams.get('username') );
	let maxAge = "max-age="+ (30*24*60*60);
	
	
	//function declarations
	
	function recreateHistoryFromCookies(){
		let cookieValues = getCurrentCookieValues();
		for (let i = 1; i <= 10; i++) {
			if (cookieValues[`history${i}`].val == "0") break;
			else {
				saveToHistory(cookieValues[`history${i}`].val + " = " + cookieValues[`history${i}`].res );
				console.log(numOperationsHistory);
			}
		}
	}
	
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
	
	function resetCalculator() {
		display.attr('value', "");
		operation.attr('value', "");
		updateResult(null);
		operator = "";
	}
	
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
	
	function updateClock() {

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
	
	//check cookies
	if ( isNewUser(username) ) {
		setUserCookie(username);
		setCookieHistory();
	} else {
		recreateHistoryFromCookies();
	}
	
	// set username text on document
	$('#user').text(username);
	
	
	//click on a number
	$("input.number").on('click', function () {
		if (operator == '=') {
			resetCalculator();
		}
		let num = $(this).attr("value");
		display.attr("value", display.attr("value") + num);
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
			
	
        //click '%'
		$('#percent').on('click', function() {
			display.attr('value', display.attr('value') / 100);
		});
	
	
		//click '='
		$('input#enter').on('click', function() {
			operation.attr('value',operation.attr('value') + display.attr('value')+" = " );
			showResult();
			updateOperator("=");
			saveToHistory(operation.attr('value') + result);
			saveOperationToCookie(operation.attr('value') + result, numOperationsHistory); 
		});
	
	
	
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
		
		updateClock();
	
} );
