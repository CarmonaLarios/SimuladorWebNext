const changeObjectPropertieValue = (obj, propertyName, value, setter) => {
    const niveisObj = propertyName.split('.');
    let newObj = { ...obj };
    let currentObj = newObj;
  
    niveisObj.forEach((element, index) => {
      if (index === niveisObj.length - 1) {
        currentObj[element] = value;
      } else {
        currentObj[element] = { ...currentObj[element] };
        currentObj = currentObj[element];
      }
    });
    setter(newObj);
};

//main source = https://stackoverflow.com/questions/62894283/javascript-input-mask-currency
const moneyMask = (value, maxLenght = 11) => {
  value = value.replace('.', '').replace(',', '').replace(/\D/g, '')
  value = value.substring(0, maxLenght);

  const options = { minimumFractionDigits: 2, length: maxLenght }
  const result = new Intl.NumberFormat('pt-BR', options).format(
    parseFloat(value) / 100
  )

  return 'R$ ' + result
}

//fonte https://www.ramoncp.com.br/snippets/mascara-de-telefone-para-input-em-js
const phoneMask = (value, maxLenght = 15) => {
  if (!value) return ""
  value = value.substring(0, maxLenght);
  value = value.replace(/\D/g, '')
  value = value.replace(/(\d{2})(\d)/, "($1) $2")
  value = value.replace(/(\d)(\d{4})$/, "$1-$2")
  return value
}

const EMaiorDe18Anos = (value) => {
    if (!value) return;
    const [day, month, year] = value.split('/');
    const nascimento = new Date(`${year}-${month}-${day}`);
    const hoje = new Date();
    const idade = hoje.getFullYear() - nascimento.getFullYear();
    return idade >= 18;
}

const formataMascaraCPF = (value) => {
  if (!value) return "";

  value = value.replace(/\D/g, '');
  value = value.substring(0, 11);
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  return value;
}

const formataCEP = (value) => {
  if (!value) return "";

  value = value.replace(/\D/g, '');
  value = value.substring(0, 8);
  value = value.replace(/(\d{5})(\d)/, "$1-$2");
  return value;
}

const formataData = (value) => {
  if (!value) return "";

  value = value.replace(/\D/g, '');
  value = value.substring(0, 8);
  value = value.replace(/(\d{2})(\d)/, "$1/$2");
  value = value.replace(/(\d{2})(\d)/, "$1/$2");

  return value;
}

const validaSalarioInput = (value, minValue) => {
  value = value ?? "0";
  value = value?.replace(/\D/g, '');
  const total = parseFloat(value) / 100;
  return total >=  minValue;
}

const mascaraCartaoCredito = (value) => {
  value = value.replace(/\D/g, '');
  
  if (value.length === 15) {
    value = value.replace(/(\d{4})(\d{6})(\d{5})/, "$1-$2-$3");
  }
  else {
    value = value.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, "$1-$2-$3-$4");
  }

  return value;
}

function getEnumKeyByEnumValue(enumType, enumValue) {
  return Object.keys(enumType).find(key => enumType[key] === enumValue) || '';
}

const getUrlVars = (window) => {
  let result = [];

  try {
      let urlVars = window.location.href.match(/(?:\?|\&)(?<key>[\w]+)(?:\=|\&?)(?<value>[\w+,.-]*)/g);

      if (urlVars !== null) {
          urlVars.map(item => {
              let itemPropValue = item.split('=');
              let urlVarObj = { [removeSpecialChars(itemPropValue[0]).trim()]: itemPropValue[1].trim() };
              result.push(urlVarObj);
          });
      }
  }
  catch (e) {
      console.error('gerUrlVars', e);
  }

  return result;
}

const getArrayValueByKey = (searchKey, arrToSearch) => {

  if (arrToSearch === null) return null;

  let result = null;

  if (arrToSearch !== null) {
      arrToSearch.find(keyWanted => {
          if (Object.keys(keyWanted)[0].toLowerCase().trim() === searchKey.toLowerCase().trim()) {
              result = Object.values(keyWanted)[0]
          }
      });
  }

  return result;
}

const removeSpecialChars = (value) => {
  return value.toString().replace(/[^\w\s]/gi, '');
}

export {
        changeObjectPropertieValue, 
        moneyMask, 
        phoneMask, 
        formataMascaraCPF, 
        mascaraCartaoCredito, 
        getEnumKeyByEnumValue,  
        formataCEP, 
        formataData, 
        EMaiorDe18Anos, 
        validaSalarioInput,
        getUrlVars,
        getArrayValueByKey,
        removeSpecialChars
      }
