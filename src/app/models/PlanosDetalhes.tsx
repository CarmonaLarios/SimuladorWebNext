interface PlanoDetalhes {
    PlanoTaxas: string;
    Rateio: boolean;
    SemAdesao: boolean;
    TaxaAdesao: number;
    TaxaAdmTotal: number;
    TaxaFundoReserva: number;
    TaxaSeguroQuebra: number;
    Titulo: string;
    Descricao?: string;
}

export default PlanoDetalhes;
