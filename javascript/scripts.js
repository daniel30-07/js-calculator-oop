class Calculator {
  constructor() {
    this.upperValue = document.querySelector('#upper-number')
    this.resultValue = document.querySelector('#result-number')
    this.reset = 0
  }

  //metodo de soma
  sum(n1, n2) {
    return parseFloat(n1) + parseFloat(n2)
  }

  //metodo de subtração
  subtraction(n1, n2) {
    return parseFloat(n1) - parseFloat(n2)
  }

  //metodo de multiplicação
  multiplication(n1, n2) {
    return parseFloat(n1) * parseFloat(n2)
  }

  //metodo de divisão
  division(n1, n2) {
    return parseFloat(n1) / parseFloat(n2)
  }

  //atualiza valores
  refreshValues(total) {
    this.upperValue.textContent = total
    this.resultValue.textContent = total
  }

  resolution() {
    //transforma a string em um array 
    let upperValueArray = (this.upperValue.textContent).split(' ')
    //armazena resultado operação
    let result = 0

    for(let i = 0; i <= upperValueArray.length; i++) {

      let operation = 0;
      let actualItem = upperValueArray[i];

      // faz a multiplicação
      if(actualItem == "x") {
        result = calc.multiplication(upperValueArray[i - 1], upperValueArray[i + 1]);
        operation = 1;
      // faz a divisão
      } else if(actualItem == "/") {
        result = calc.division(upperValueArray[i - 1], upperValueArray[i + 1]);
        operation = 1;
      // checa se o array ainda tem multiplicação e divisão a ser feita
      } else if(!upperValueArray.includes('x') && !upperValueArray.includes('/')) {
        // soma e subtração
        if(actualItem == "+") {
          result = calc.sum(upperValueArray[i - 1], upperValueArray[i + 1]);
          operation = 1;
        } else if(actualItem == "-") {
          result = calc.subtraction(upperValueArray[i - 1], upperValueArray[i + 1]);
          operation = 1;
        }
      }

      // atualiza valores do array para proxima iteração
      if(operation) {
        // indice anterior no resultado da operação
        upperValueArray[i - 1] = result;
        // remove os itens já utilizado para a operação
        upperValueArray.splice(i, 2);
        // atualizar o valor do índice
        i = 0;
      }

    }

    if (result) {
      calc.reset = 1
    }

    calc.refreshValues(result)

  }

  clearValues() {
    this.upperValue.textContent = '0'
    this.resultValue.textContent = '0'
  }

  checkLastDigit(input, upperValue, reg) {
    if (
      !reg.test(input) &&
      !reg.test(upperValue.substr(upperValue.length - 1))
    ) return true
    else return false
  }

  btnPress() {
    let input = this.textContent
    let upperValue = calc.upperValue.textContent
    //verificar se tem só número
    var reg = new RegExp('^\\d+$')

    // se tiver operação concluida limpa o display
    if (calc.reset && reg.test(input)) {
      upperValue = '0'
    }

    //limpa o reset
    calc.reset = 0

    //ativa método de limpar display
    if (input == 'AC') {
      calc.clearValues()

    } else if (input == '=') {
      calc.resolution()

    } else {
      //checa se precisa adicionar
      if (calc.checkLastDigit(input, upperValue, reg))
        return false

      //Adiciona espaço entre operadores
      if (!reg.test(input)) {
        input = ` ${input} `
      }

      if (upperValue == '0') {
        calc.upperValue.textContent = input
      } else calc.upperValue.textContent += input
    }


  }

}

// start obj
let calc = new Calculator;
let buttons = document.querySelectorAll('.btn')


for (let btn of buttons) {
  btn.addEventListener('click', calc.btnPress)
  // () => {
  //   if(btn.innerHTML == '8') {
  //     calc.resultValue.innerHTML = '0'
  //     calc.upperValue.innerHTML = '0'
  //   }
  //   calc.resultValue.innerHTML += btn.innerHTML
  //   calc.upperValue.innerHTML = 0
  // })
}



