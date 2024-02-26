import { ProdutosEnum } from "@/app/enums/SimulacaoEnum";
import IconeImoveis from '../../assets/images/ico-imovel.svg'
import IconeCarro from '../../assets/images/ico-carro.svg'
import IconeMoto from '../../assets/images/ico-moto.svg'
import IconeServicos from '../../assets/images/ico-servicos.svg'


export enum iconesProdutos{
  IMOVEL,
  CARRO,
  MOTO,
  SERVICO
}

export const menuProdutos = [
  { icone: IconeImoveis, label: 'Imóvel', tipo: ProdutosEnum.IMOVEL },
  { icone: IconeCarro, label: 'Carro', tipo: ProdutosEnum.CARRO },
  { icone: IconeMoto, label: 'Moto', tipo: ProdutosEnum.MOTO },
  { icone: IconeServicos, label: 'Serviço', tipo: ProdutosEnum.SERVICO },
]
