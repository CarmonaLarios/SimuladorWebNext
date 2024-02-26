import Endereco from "./Endereco";

interface DadosContrato {
    leadId?: number;
    nomeRazao?: string;
    email?: string;
    telefoneCelular?: string;
    rendaMensal?: string | number;
    cpfCnpj?: string;
    nascimentoFundacao?: string;
    cep?: string;
    logradouro?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
    tipoPessoa?: number;
    empresaId?: number;
    bemId?: number;
    planoId?: number;
    planoMeses?: number;
}

export default DadosContrato;
