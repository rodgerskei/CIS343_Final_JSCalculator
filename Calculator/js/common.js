/*
* Javascript logic for calculator
* @Author: Keith Rodgers
* @Version: 11/21/17
*/

$(function() {
	/*Declare variables*/
	var $calc = $("#calc");
	var $clear = $("#clear");
	var $userInput = $("#userInput");
	var $results = $("#results");
	var $total = $("#total");
	var runningTotal = 0;
	var outputArray = [3];
	var results = 0;

	/*Function that modifies styling of input box*/
	var checkValidInput = function(goodFlag) {
		if (goodFlag == false) {
			$userInput.addClass('bad');
			return false;
		} else {
			$userInput.removeClass('bad')
			return true;
		}
	}

	/*Function that interprets input*/
	var regexInputString = function(input) {
        // Regex statements
		var plusRegex = /(-*[0-9\.]+)\s*([+])\s*(-*[0-9\.]+)/g;
		var minusRegex = /(-*[0-9\.]+)\s*([-])\s*(-*[0-9\.]+)/g;
		var multiplyRegex = /(-*[0-9\.]+)\s*([*])\s*(-*[0-9\.]+)/g;
		var divideRegex = /(-*[0-9\.]+)\s*([\/])\s*(-*[0-9\.]+)/g;
		var exponentRegex = /(-*[0-9\.]+)\s*([\^])\s*(-*[0-9\.]+)/g;
		
		// Check for match
		var plusMatch = plusRegex.exec(input);
		var minusMatch = minusRegex.exec(input);
		var multiplyMatch = multiplyRegex.exec(input);
		var divideMatch = divideRegex.exec(input);
		var exponentMatch = exponentRegex.exec(input);

		// Parse matches
		if(plusMatch != null) {
			checkValidInput(true);
			outputArray[0] = 1;
			outputArray[1] = plusMatch[1];
			outputArray[2] = plusMatch[2];
			outputArray[3] = plusMatch[3];
		}

		else if(minusMatch != null) {
			checkValidInput(true);
			outputArray[0] = 1;
			outputArray[1] = minusMatch[1];
			outputArray[2] = minusMatch[2];
			outputArray[3] = minusMatch[3];
		}

		else if(multiplyMatch != null) {
			checkValidInput(true);
			outputArray[0] = 1;
			outputArray[1] = multiplyMatch[1];
			outputArray[2] = multiplyMatch[2];
			outputArray[3] = multiplyMatch[3];
		}

		else if(divideMatch != null) {
			if(divideMatch[3] == 0) {
				checkValidInput(false);
				outputArray[0] = 0;
			}
			else {
				checkValidInput(true);
				outputArray[0] = 1;
				outputArray[1] = divideMatch[1];
				outputArray[2] = divideMatch[2];
				outputArray[3] = divideMatch[3];
			}			
		}

		else if(exponentMatch != null) {
			checkValidInput(true);
			outputArray[0] = 1;
			outputArray[1] = exponentMatch[1];
			outputArray[2] = exponentMatch[2];
			outputArray[3] = exponentMatch[3];
		}

		else {
			checkValidInput(false);
			outputArray[0] = 0;
		}
		return (outputArray);
	}

	/*Function that computes results*/
	var computeOutput = function() {
		if(outputArray[0] == 0) {
			results = "Invalid input"
		}
		else {
			if(outputArray[2] == "+"){				
				results = (parseInt(outputArray[1]) + parseInt(outputArray[3]));
			}

			else if(outputArray[2] == "-"){
				results = (outputArray[1] - outputArray[3]);
			}

			else if(outputArray[2] == "*"){
				results = (outputArray[1] * outputArray[3]);
			}

			else if(outputArray[2] == "/"){
				results = (outputArray[1] / outputArray[3]);
			}

			else if(outputArray[2] == "^"){
				results = Math.pow(outputArray[1] , outputArray[3]);
			}
			else {
				checkValidInput(false);
				results = "Invalid input";
			}
			return results;
		}
	}

	/*Function that clears results*/
	var clearAll = function() {
		results = 0;
		runningTotal = 0;
		$results.empty();
		$total.empty();
		$('#userInput').val("");
		checkValidInput(true);
		alert("Cleared!");
	}

	/*Function that displays results*/
	var displayResults = function() {
		var userInput = $userInput.val();

		// Clear dom
		regexInputString(userInput);
		computeOutput();

		if (results != "Invalid input") { 
			runningTotal = runningTotal + results;
		}

		// Print results
		$results.empty();
		$total.empty();
		$results.append("Result = " + results + "<br/>");
		$total.append("Running Total = " + runningTotal + "<br/>");
	}

	// Clear the outputs
	$clear.on('click', clearAll);
	// Calculate results
	$calc.on('click', displayResults);
});