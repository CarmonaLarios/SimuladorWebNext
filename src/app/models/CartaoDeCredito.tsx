export interface PagamentoCartao {
    cartaoCpfTitular: string;
    cartaoNomeTitular: string;
    cartaoBandeira: string;
    cartaoParcelas: number;
    cartaoNumero: string;
    cartaoCodigoSeguranca: string;
    cartaoValidadeMes: number;
    cartaoValidadeAno: number;
    cartaoId: number;
    propostaId: number;
    cartaoValidadeMesAno?: string;
}
