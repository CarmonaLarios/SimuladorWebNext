import { getEnumKeyByEnumValue } from "../utils/utils";

export enum ProdutosEnum {
    IMOVEL,
    CARRO,
    MOTO,
    SERVICO,
}

export enum ModalidadePagamentoEnum {
    IMOVEL_INTEGRAL = 1,
    CARRO_INTEGRAL = 2,
    MOTO_INTEGRAL = 3,
    SERVICO_INTEGRAL = 4,
    IMOVEL_PAGA_METADE = 20,
    CARRO_PAGA_METADE = 21,
    MOTO_PAGA_METADE = 22
}

export enum TipoSimulacaoEnum {
    CREDITO = 'CREDITO',
    PARCELA = 'PARCELA'
}

export const descricaoModalidadePlano = (modalidadeParcela : ModalidadePagamentoEnum) => {
    const produto = getEnumKeyByEnumValue(ModalidadePagamentoEnum, modalidadeParcela).toLowerCase();
  
    if (produto.includes('metade')) {
      return 'Paga Metade';
    } else if (produto.includes('integral')) {
      return 'Integral';
    } else if (produto.includes('reduzida')) {
      return 'Parcela Reduzida';
    }
}

