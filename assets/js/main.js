'use strict'

const display = document.getElementById('display')
const numbers = document.querySelectorAll('[id*=key]')
const operators = document.querySelectorAll('[id*=operator]')

let newNumber = true
let operator
let firstNum
let currentNumber

const pendingOperation = () => operator != undefined


const calculate = () => {
    if (pendingOperation()) {
        let currentNumber = Number(display.textContent.replace(',', '.'))
        newNumber = true
        if (operator == '+') {
            updateDisplay(firstNum + currentNumber)
        }else if (operator == 'x') {
            updateDisplay(firstNum * currentNumber)
        }else if (operator == '-') {
            updateDisplay(firstNum - currentNumber)
        }else if (operator == '/') {
            updateDisplay(firstNum / currentNumber)
        } else if (operator == '=') {
            updateDisplay()
        } else if (operator == '%') {
            updateDisplay((firstNum/100)*currentNumber)
        }
    }
}

const updateDisplay = (text) => {
    if (newNumber){
        display.textContent = text
        newNumber = false
    } else {
        display.textContent += text
    }
}

const insertNumber = (event) => updateDisplay(event.target.textContent)
numbers.forEach (num => num.addEventListener('click', insertNumber))

const selectOperator = (event) => {
    if (!newNumber)
        calculate()
        newNumber = true
        operator = event.target.textContent
        firstNum = Number(display.textContent.replace(',', '.'))
}
operators.forEach (operator => operator.addEventListener('click', selectOperator))


const activeClear = () => {
    const clearDisplay = () => display.textContent = ''
    clearDisplay()
    firstNum = undefined
    operator = undefined
    reverseSignal = undefined
    currentNumber = undefined
}
document.getElementById('clearCalc').addEventListener('click', activeClear)

const backspace = () => display.textContent = display.textContent.slice(0, -1)
document.getElementById('backspace').addEventListener('click', backspace)

const addDecimal = (event) => updateDisplay(event.target.textContent)
document.getElementById('decimal').addEventListener('click', addDecimal)
let invert = true
let reverseSignal = () => {
    newNumber = true
    updateDisplay(display.textContent* -1)
}
document.getElementById('reverse').addEventListener('click', reverseSignal)



const keyboardMap = {
    '0'         : 'key0',
    '1'         : 'key1',
    '2'         : 'key2',
    '3'         : 'key3',
    '4'         : 'key4',
    '5'         : 'key5',
    '6'         : 'key6',
    '7'         : 'key7',
    '8'         : 'key8',
    '9'         : 'key9',
    '='         : 'operatorEqual',
    'Enter'     : 'operatorEqual',
    '*'         : 'operatorTimes',
    'x'         : 'operatorTimes',
    '+'         : 'operatorPlus',
    '-'         : 'operatorMinus',
    '/'         : 'operatorDivided',
    'Backspace' : 'backspace',
    'Escape'    : 'clearCalc',
    ','         : 'decimal',
    '%'         : 'operatorPercentage'
}

const keyboardMapping = (event) => {
    const key = event.key
    
    const allowedKey = () => Object.keys(keyboardMap).indexOf(key) != -1
    if (allowedKey()) {
        document.getElementById(keyboardMap[key]).click()
    }
}

document.addEventListener('keydown', keyboardMapping)





















