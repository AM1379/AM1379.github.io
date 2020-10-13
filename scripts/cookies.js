
'use strict'

function getExpiryDate() {
	
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+ d.toUTCString();
	return expires;
}

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
	
function saveOperationToCookie(operation, index) {
		let cookieValues = getCurrentCookieValues();
		if (cookieValues.history10.val == "0") {
			document.cookie = `history${index} = ${operation}; ${getExpiryDate()}; path=/; `;
		}
		else {
			
			for (let i = 1; i<10; i++) {
				let op = cookieValues[`history${i+1}`].val + "=" + cookieValues[`history${i+1}`].res;
				document.cookie = `history${i} = ${op}; ${getExpiryDate()}; path=/; `;
			}
			document.cookie = `history10 = ${operation}; ${getExpiryDate()}; path=/; `;
		}
	}
	
function setCookieHistory() {
		document.cookie = "history1= 0;" + getExpiryDate() + ";path=/;";
		document.cookie = "history2= 0; " + getExpiryDate() + ";path=/;";
		document.cookie = "history3= 0; " + getExpiryDate() + ";path=/;";
		document.cookie = "history4= 0; " + getExpiryDate() + ";path=/;";
		document.cookie = "history5= 0; " + getExpiryDate() + ";path=/;";
		document.cookie = "history6= 0; " + getExpiryDate() + ";path=/;";
		document.cookie = "history7= 0; " + getExpiryDate() + ";path=/;";
		document.cookie = "history8= 0; " + getExpiryDate() + ";path=/;";
		document.cookie = "history9= 0; " + getExpiryDate() + ";path=/;";
		document.cookie = "history10= 0;" + getExpiryDate() + ";path=/;";
	}
	
function isNewUser(newUser) {
	let currentUser = getCurrentCookieValues().username;
	if (!currentUser) 	return true;
	else if (newUser !=== currentUser.value) return true;
	else return false;
}
		
function setUserCookie(newUser) {
	document.cookie = `username = ${newUser}; ${getExpiryDate()}; path=/; `;
}



	