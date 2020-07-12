class Calculator{
    constructor(previousOperandText,currentOperandText) {
        this.previousOperandText = previousOperandText
        this.currentOperandText = currentOperandText
        this.clear()
    }

    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }

    appendText(number){
        if(number === '.' && this.currentOperand.includes('.')) return
        if(number === '.' && this.currentOperand[0] === ' ') return
        this.currentOperand = (this.currentOperand + number).toString()
    }

    chooseOperation(operation){
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.calculate()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    calculate(){
        let result
        const prev = parseFloat(this.previousOperand)
        const curr = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(curr)) return
        switch (this.operation) {
            case '+':
                result = prev + curr
                break
            case '-':
                result = prev - curr
                break
            case '*':
                result = prev * curr
                break
            case '÷':
                if(curr === 0){
                    alert("Division by zero, the result is infinity")
                    result = ''
                    break
                }
                result = prev / curr
                break
            default:
                return;
        }
        this.currentOperand = result
        this.operation = undefined
        this.previousOperand = ''
    }

    getOutput(number){
        const strNum = number.toString()
        const intPart = parseFloat(strNum.split('.')[0])
        const decPart = strNum.split('.')[1]
        let intOutput
        if(isNaN(intPart)){
            intOutput = ''
        } else{
            intOutput = intPart.toLocaleString('en',{maximumFractionDigits: 0})
        }
        if(decPart != null){
            return `${intOutput}.${decPart}`
        }else{
            return intOutput
        }
    }

    updateOutput(){
        this.currentOperandText.innerText = this.getOutput(this.currentOperand)
        if(this.operation != null){
            this.previousOperandText.innerText = `${this.getOutput(this.previousOperand)} ${this.operation}`
        }else {
            this.previousOperandText.innerText = ''
        }
    }

}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-clear]')
const previousOperandText = document.getElementById('previous-operand')
const currentOperandText = document.getElementById('current-operand')

const calculator = new Calculator(previousOperandText,currentOperandText)

numberButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.appendText(button.innerText)
        calculator.updateOutput()
    })
})

operationButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.chooseOperation(button.innerText)
        calculator.updateOutput()
    })
})

allClearButton.addEventListener('click', ()=>{
    calculator.clear()
    calculator.updateOutput()
})

equalsButton.addEventListener('click', ()=>{
    calculator.calculate()
    calculator.updateOutput()
})

deleteButton.addEventListener('click', ()=>{
    calculator.delete()
    calculator.updateOutput()
})