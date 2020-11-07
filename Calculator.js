class Calculator {
  constructor (previousOperandTextElement, currentOperandTextElement, equalButton, previousOperand, currentOperand) {
    this.previousOperandTextElement = previousOperandTextElement // Allows us to access every function and manipulate every object created in the process through multiple instances of each important variable
    this.currentOperandTextElement = currentOperandTextElement
    this.equalButton = equalButton
    this.previousOperand = previousOperand
    this.currentOperand = currentOperand
    this.clear()
  }

  clear () {
    this.currentOperand = ''
    this.previousOperand = '' //Empties the form input
    this.operation = undefined
  }

  delete () {
    this.currentOperand = this.currentOperand.toString().slice(0, -1) // Converts number into string, and deletes the whole number, character by character
  }

  appendNumber (number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString() // Allows us to add another number
  }

  chooseOperation (operation) {
    if (this.currentOperand === '') return // if the second entry inputted is acceptable, and the first one isn't, callback to the compute function
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute (current, prev) {
    let computation
    prev = parseFloat(this.previousOperand) // Converts this string into a tangible number
    current = parseFloat(this.currentOperand) // Converts this string into a tangible number
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) { // switch statement that sets up any instance of every calculation that can be made with every operation possible
      case '+':
        computation = prev + current
        break
    }
    this.compute()
    this.currentOperand = current
    this.operation = undefined
    this.previousOperand = prev
    prev = parseFloat(this.previousOperand)
    current = parseFloat(this.currentOperand)
    switch (this.operation) {
      case '-':
        computation = prev - current
        break
    }
    this.compute()
    this.currentOperand = current
    this.operation = undefined
    this.previousOperand = prev
    prev = parseFloat(this.previousOperand)
    current = parseFloat(this.currentOperand)
    switch (this.operation) {
      case '*':
        computation = prev * current
        break
      default:
        return computation
    }
    this.compute()
    this.currentOperand = current
    this.operation = '÷'
    this.previousOperand = prev
    prev = parseFloat(this.previousOperand)
    current = parseFloat(this.currentOperand)
    switch (this.operation) {
      case '÷':
        computation = prev * current
        break
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = computation
  }

  getDisplayNumber (number) {
    const stringNumber = number.toString() // take any number inputted, and interpret it as a string
    const integerDigits = parseFloat(stringNumber.split('.')[0]) // put a decimal ahead of the number
    const decimalDigits = stringNumber.split('.')[1] // Put a decimal after the number
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = '' // If there's no number ahead of the decimal, leavae the blank space
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}` // return number with decimal
    } else {
      return integerDisplay // return number with no digit in front of the decimal
    }
  }

  updateDisplay () {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand) // number on the bottom of the display
    if (this.operation != null) { // if an operation is entered, then--
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`// display the first number, the operation and the second number
    } else {
      this.previousOperandTextElement.innerText = '' // clear the bottom of the display
    }
  }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equal]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {                                                           // handles the activity for each button on the calculator, utilizing inheritance  
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {                                                         // handles the activity for each button on the calculator, utilizing inheritance
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalButton.addEventListener('click', button => {                                             // handles the activity for each button on the calculator, utilizing inheritance
  calculator.updateDisplay() 
  calculator.compute()
})

allClearButton.addEventListener('click', button => {                                         // handles the activity for each button on the calculator, utilizing inheritance
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {                                           // handles the activity for each button on the calculator, utilizing inheritance
  calculator.delete()
  calculator.updateDisplay()
})
