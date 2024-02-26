interface Plano {
    PlanoIndex: number;
    PlanoID: number;
    BemID: number;
    BemNome: string;
    BemCredito: number;
    BemCreditoLabel: string;
    PlanoMeses: number;
    PlanoValorParcela: number;
    PlanoValorParcelaLabel: string;
    PlanoValorPagamento: number;
    PlanoValorPagamentoLabel: string;
    LabelPlano: string;
    ImagemUrlPlano: string;
}

export default Plano;

export interface PlanoPayload {
    leadId: number,
    categoriaId: number,
    empresaId: number,
    valorCredito?: number,
    valorParcela?: number,
    valorParcelaIdeal?: number,

}
