var expression = [];
var copy_expression = [];
// This function is used for creating a expression by pushing all the elemnts in a global array
// const create_expression = (element) => {
//     expression.push(element);
//     copy_expression.push(element);
// }

// This function used for checking wherther the given expressin is valid or not
const check_valadity = () => {
    let regex = /(\+\-)|(\+\*)|(\+\/)|(\+\+)|(\-\-)|(\-\*)|(\-\/)|(\-\+)|(\*\-)|(\*\*)|(\*\/)|(\*\+)|(\/\-)|(\/\*)|(\/\/)|(\/\+)/g;
    let st_regex = /\+|\-|\*|\//;
    if (st_regex.test(expression[0]) || st_regex.test(expression.reverse()[0]) || regex.test(expression.toString().replace(/,/g, "")))
        return false;
    else
        return true;
}

//This function is for pushing the values of the button when clicked
const push_value = (value) => {
    expression.push(value.target.firstChild.wholeText);
    document.getElementById("calculate").innerHTML += value.target.firstChild.wholeText;
}

// this function is to optimize the array for calculation
const optimize_array = () => {
    let reg = /\+|\-|\*|\//g;
    let rep = ',$&,';
    expression = document.getElementById("calculate").innerHTML.replace(reg, rep).split(',');
}

//Functioin to operate maths on the passed values
const operate = (a, b, c) => {
    switch (b) {
        case '+': return a + c;
            break;
        case '-': return a - c;
            break;
        case '*': return a * c;
            break;
        case '/': return a / c;
            break;
    }
}

// Function to recive indexes of a particular math operator in the expression
function getAllIndexes(arr, val) {
    var indexes = [], i;
    for (i = 0; i < arr.length; i++)
        if (arr[i] == val)
            indexes.push(i);
    return indexes;
}

//Function to calculate the input
const calculate = () => {
    if (check_valadity()) {
        optimize_array();
        let bodmas = ['/', '*', '+', '-'];
        bodmas.forEach((pelement) => {
            let index = getAllIndexes(expression, pelement);
            index.forEach((celement) => {
                let a = parseFloat(expression[celement - 1]);
                let b = expression[celement];
                let c = parseFloat(expression[celement + 1]);
                let result = operate(a, b, c);
                expression.splice(celement - 1, 3, result);
                index.forEach((el, ind) => {
                    if (ind != index.length - 1)
                        index[ind + 1] -= 2;
                })
            })
        })
        document.getElementById("output").innerHTML = expression[0];
    }
    else
    {
        document.getElementById("output").innerHTML = 'INVALID INPUT!!';
    }

}


// This section is to set Event Listners on the buttons
// For numbers
document.getElementById("zero").addEventListener('click', (e) => { push_value(e) });
document.getElementById("one").addEventListener('click', (e) => { push_value(e) });
document.getElementById("two").addEventListener('click', (e) => { push_value(e) });
document.getElementById("three").addEventListener('click', (e) => { push_value(e) });
document.getElementById("four").addEventListener('click', (e) => { push_value(e) });
document.getElementById("five").addEventListener('click', (e) => { push_value(e) });
document.getElementById("six").addEventListener('click', (e) => { push_value(e) });
document.getElementById("seven").addEventListener('click', (e) => { push_value(e) });
document.getElementById("eight").addEventListener('click', (e) => { push_value(e) });
document.getElementById("nine").addEventListener('click', (e) => { push_value(e) });
document.getElementById("decimal").addEventListener('click', (e) => { push_value(e) });
//For operators
document.getElementById("plus").addEventListener('click', (e) => { push_value(e) });
document.getElementById("minus").addEventListener('click', (e) => { push_value(e) });
document.getElementById("mult").addEventListener('click', (e) => { push_value(e) });
document.getElementById("divide").addEventListener('click', (e) => { push_value(e) });
//For functionality buttons
document.getElementById("equal").addEventListener('click', calculate);
document.getElementById("del").addEventListener('click', () => {
    expression.pop()
    document.getElementById("calculate").innerHTML = expression.toString().replace(/,/g, "");;
});

document.getElementById("reset").addEventListener('click', () => {
    document.getElementById("calculate").innerHTML = "";
    document.getElementById("output").innerHTML = "";
    expression = [];
});