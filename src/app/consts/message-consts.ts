const campoObrigatorio = 'Campo obrigatório';

const termosObrigatorios = 'Deve concordar com os termos';

const emailInvalido = 'Email inválido';

const deveTerXCaracteres = (numeroChars: number) => {
    return `Deve ter no mínimo ${numeroChars} caracteres`
}

const digiteValorEntreAeB = (numA: number,  numB: number) => {
    return `Digite um valor entre ${numA} e ${numB}`
}


export {campoObrigatorio, termosObrigatorios, emailInvalido, deveTerXCaracteres, digiteValorEntreAeB}
