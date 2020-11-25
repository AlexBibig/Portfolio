class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.readyToReset = false;
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
    this.readyToReset = false;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.currentOperand !== '' && this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      case 'xn':
        computation = prev ** current;
        break;
      default:
        return;
    }
    this.readyToReset = true;

    let n = computation.toString().split('.').pop().length;
    if (n >= 10) {
      n = 10;
    }

    Number.isInteger(computation)
      ? (this.currentOperand = computation)
      : (this.currentOperand = Number(computation.toFixed(n)));

    this.operation = undefined;
    this.previousOperand = '';
  }

  squareRoot() {
    const current = parseFloat(this.currentOperand);

    if (isNaN(current)) return;
    if (current < 0) {
      this.readyToReset = true;
      this.currentOperand = 'Error';
      this.operation = undefined;
      this.previousOperand = '';
      this.currentOperandTextElement.innerText = this.currentOperand;
    } else {
      this.readyToReset = true;
      this.currentOperand = Math.sqrt(current);
      this.operation = undefined;
      this.previousOperand = '';
      this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
    }

  }

  minusPlus() {
    let number = this.currentOperand;
    number *= -1;
    this.currentOperand = number;
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${
        this.operation
      }`;
    } else {
      this.previousOperandTextElement.innerText = '';
    }
  }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const squareRoot = document.querySelector('[data-operation-square-root]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (
      calculator.previousOperand === '' &&
      calculator.currentOperand !== '' &&
      calculator.readyToReset
    ) {
      calculator.currentOperand = '';
      calculator.readyToReset = false;
    }
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (button.innerText === "-/+") {
      calculator.minusPlus();
      calculator.updateDisplay();
    } else {
      calculator.chooseOperation(button.innerText);
      calculator.updateDisplay();
    }
  });
});

equalsButton.addEventListener('click', (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

squareRoot.addEventListener('click', (button) => {
  calculator.squareRoot();
});

allClearButton.addEventListener('click', (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
