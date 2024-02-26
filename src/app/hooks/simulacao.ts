import { create } from 'zustand'
import {immer} from 'zustand/middleware/immer'
import { ModalidadePagamentoEnum, ProdutosEnum } from '../enums/SimulacaoEnum'
import { TipoSimulacaoEnum } from '../enums/SimulacaoEnum'
import Plano from '../models/Planos'
import PlanoDetalhes from '../models/PlanosDetalhes'
import Proposta from '../models/Proposta'

const valoresSimulacao = {
    [TipoSimulacaoEnum.CREDITO]: {
        [ProdutosEnum.IMOVEL]: {
            min: 55000,
            max: 700000,
            gap: 5000
        },
        [ProdutosEnum.CARRO]: {
            min: 25000,
            max: 400000,
            gap: 5000
        },
        [ProdutosEnum.MOTO]: {
            min: 10000,
            max: 120000,
            gap: 5000
        },
        [ProdutosEnum.SERVICO]: {
            min: 12000,
            max: 20000,
            gap: 1000
        },
    },
    [TipoSimulacaoEnum.PARCELA]: {
        [ProdutosEnum.IMOVEL]: {
            min: 300,
            max: 5000,
            gap: 50
        },
        [ProdutosEnum.CARRO]: {
            min: 300,
            max: 6000,
            gap: 50
        },
        [ProdutosEnum.MOTO]: {
            min: 200,
            max: 2500,
            gap: 50
        },
        [ProdutosEnum.SERVICO]: {
            min: 300,
            max: 1000,
            gap: 50
        },
    }
}


interface IMinMax {
    min: number
    max: number
    gap: number
}

interface Props {
    valoresSimulacao: Record<string, Record<string, IMinMax>>
    produtoSelecionado: ProdutosEnum
    modalidadeParcela: ModalidadePagamentoEnum
    tipoSimulacao: TipoSimulacaoEnum
    campanhaId: number
    valorSelecionado: number

    planoEscolhido: Plano | null
    planoDetalhes: PlanoDetalhes | null

    proposta: Proposta | null
}

interface Actions {
    actions: {
        selecionarProduto: (produto: ProdutosEnum) => void
        selecionarModalidadeParcela : (modalidade: ModalidadePagamentoEnum) => void
        selecionarCampanhaId: (idc: number) => void
        selecionarTipoSimulacao: (tipo: TipoSimulacaoEnum) => void
        listarLimites: () => IMinMax
    }
}

export const useSimulacao = create(immer<Props & Actions >((set, get) => ({
    valoresSimulacao,
    produtoSelecionado: ProdutosEnum.IMOVEL,
    tipoSimulacao: TipoSimulacaoEnum.CREDITO,
    modalidadeParcela: ModalidadePagamentoEnum.IMOVEL_INTEGRAL,
    campanhaId: 0,
    valorSelecionado: valoresSimulacao[TipoSimulacaoEnum.CREDITO][ProdutosEnum.IMOVEL].max/2,

    planoEscolhido: null,
    planoDetalhes: null,

    proposta: null,
    
    actions: {
        selecionarProduto: (produto: ProdutosEnum) => {
            const valores = valoresSimulacao[get().tipoSimulacao][produto]
            const media = (produto === ProdutosEnum.SERVICO) ? (valores.max + valores.min)/2 : valores.max/2
            set({produtoSelecionado: produto, valorSelecionado:  media })
        },
        selecionarModalidadeParcela: (modalidade: ModalidadePagamentoEnum) => {
            set({modalidadeParcela: modalidade});
        },
        selecionarCampanhaId: (idc: number) => {
            set({campanhaId: idc});
        },
        selecionarTipoSimulacao(tipo: TipoSimulacaoEnum) {
            const valores = valoresSimulacao[tipo][get().produtoSelecionado]
            const media = (valores.max + valores.min)/2
            set({tipoSimulacao: tipo, valorSelecionado: media})
        },
        listarLimites: (): IMinMax => {
            const {valoresSimulacao, produtoSelecionado, tipoSimulacao} = get()
            return valoresSimulacao[tipoSimulacao][produtoSelecionado]
        },

    }
})))
