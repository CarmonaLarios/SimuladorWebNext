interface SimulacaoDadosIniciais {
    bemTipo?: string;
    categoriaId?: number;
    tipoPlano?: string;
    valorTotal?: number;
    nome?: string;
    telefone?: string;
    email?: string;
    rendaMensal?: string;
    leadId?: number;
    leadToken?: string;
    tipoParcela?: string;
}
  
export default SimulacaoDadosIniciais;

export interface IDadosUsuario {
    nome: string;
    telefone: string;
    email: string;
    rendaMensal: string;
    termos?: boolean
    cpf?: string
    nascimento?: string
    endereco?: IEndereco
}

export interface IEndereco {
    logradouro: string,
    numero: string,
    complemento: string,
    cidade: string,
    estado: string,
    bairro: string,
    cep: string
} 

export interface ILeadToken {
    LeadID: number,
    LeadToken: string,
    CompraUrl: string,
    RegulamentoUrl: string,
    SimuleLeadID: number,
    Errors: unknown
}
