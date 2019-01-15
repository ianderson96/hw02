(function() {
"use strict";
// calculator mode, can be:
// num (typing a number)
// add
// sub
// mult
// div
// dec (decimal)
let mode = "num"
// number on the screen
let screenNum = 0;
// saved number to perform functions against (init as undefined)
let saved = undefined;
// saved decimal value;
let decValue = 0;
// am I editing a decimal value?
let decEditing = false;
// should current screenNum be overwritten?
let overwrite = false;
// can this statement be evaluated?
var canEval = false;
// bind event listeners on buttons
window.onload = function() {
    document.getElementById("1").addEventListener('click', function() {handleNumberClick(1)});
    document.getElementById("2").addEventListener('click', function() {handleNumberClick(2)});
    document.getElementById("3").addEventListener('click', function() {handleNumberClick(3)});
    document.getElementById("4").addEventListener('click', function() {handleNumberClick(4)});
    document.getElementById("5").addEventListener('click', function() {handleNumberClick(5)});
    document.getElementById("6").addEventListener('click', function() {handleNumberClick(6)});
    document.getElementById("7").addEventListener('click', function() {handleNumberClick(7)});
    document.getElementById("8").addEventListener('click', function() {handleNumberClick(8)});
    document.getElementById("9").addEventListener('click', function() {handleNumberClick(9)});
    document.getElementById("0").addEventListener('click', function() {handleNumberClick(0)});
    document.getElementById("decimal").addEventListener('click', function() {handleFunctionClick(".")});
    document.getElementById("C").addEventListener('click', function() {handleFunctionClick("C")});
    document.getElementById("add-equals").addEventListener('click', function() {handleFunctionClick("+/=")});
    document.getElementById("subtract").addEventListener('click', function() {handleFunctionClick("-")});
    document.getElementById("multiply").addEventListener('click', function() {handleFunctionClick("x")});
    document.getElementById("divide").addEventListener('click', function() {handleFunctionClick("/")});
};

function handleNumberClick(button) {
    if (overwrite) {
        screenNum = button;
        overwrite = false;
    }
    else {
    if (decEditing) {
        decValue = decValue * 10 + button;
        screenNum = Math.floor(screenNum) + ("." + decValue);
    }
    else {screenNum = screenNum * 10 + button;}
    }
    canEval = true;
    document.getElementById("screen").innerHTML = screenNum;
}

function handleFunctionClick(button) {
        switch(button) {
            case ".":
            decEditing = true;
            decValue = 0;
            break;
            
            case "C":
            screenNum = 0;
            saved = undefined;
            decEditing = false;
            decValue = 0;
            break;
            
            case "+/=":
            if (canEval) {
            screenNum = evaluate(saved, screenNum, mode);
            }
            saved = screenNum;
            mode = "add";
            overwrite = true;
            decEditing = false;
            break;

            case "-":
            if (canEval) {
            screenNum = evaluate(saved, screenNum, mode);
            }
            saved = screenNum;
            mode = "sub";
            overwrite = true;
            decEditing = false;
            break;

            case "x":
            if (canEval) {
            screenNum = evaluate(saved, screenNum, mode);
            }
            saved = screenNum;
            mode = "mult";
            overwrite = true;
            decEditing = false;
            break;

            case "/":
            if (canEval) {
            screenNum = evaluate(saved, screenNum, mode);
            }
            saved = screenNum;
            mode = "div";
            overwrite = true;
            decEditing = false;
            decValue = 0;
            break;
        }
        canEval = false;
        
        document.getElementById("screen").innerHTML = screenNum;
}

function evaluate(numX, numY, mode) {
    if (numX) {
    switch(mode) {
        case "add":
        return parseFloat(numX) + parseFloat(numY);
        break;
        case "sub":
        return parseFloat(numX) - parseFloat(numY);
        break;
        case "mult":
        return parseFloat(numX) * parseFloat(numY);
        break;
        case "div":
        return parseFloat(numX) / parseFloat(numY);
        break;
    }
}
else {
    saved = numY;
    return numY;
}
}
})();