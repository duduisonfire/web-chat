class Cpf {
  private cpf;

  constructor(cpf: string) {
    this.cpf = Array.from(cpf.replace(/\D+/g, ''));
  }

  private firstDigitValidation() {
    return this.cpf.reduce((acc, cur, idx) => {
      if (idx < 9) acc += Number(cur) * (10 - idx);
      if (idx === 8) {
        acc = 11 - (acc % 11);
        if (acc > 9) acc = 0;
      }
      return Number(acc);
    }, 0);
  }

  private secondDigitValidation() {
    return this.cpf.reduce((acc, cur, idx) => {
      if (idx < 10) acc += Number(cur) * (11 - idx);
      if (idx == 9) {
        acc = 11 - (acc % 11);
        if (acc > 9) acc = 0;
      }
      return Number(acc);
    }, 0);
  }

  private validationCpf() {
    const size = this.cpf.length;

    return (
      Number(this.cpf[size - 2]) === this.firstDigitValidation() &&
      Number(this.cpf[size - 1]) === this.secondDigitValidation()
    );
  }

  consoleValidationResponse() {
    if (this.validationCpf()) console.log('CPF is valid.');
    else console.log('CPF is not valid.');
  }
}

const person1 = new Cpf('705.484.450-52');
person1.consoleValidationResponse();
