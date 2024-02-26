import SimulacaoDadosIniciais from "@/app/models/SimulacaoDadosIniciais";
import Plano from "@/app/models/Planos";
import { Dispatch, SetStateAction } from "react";
import PlanoDetalhes from "@/app/models/PlanosDetalhes";
import DadosContrato from "@/app/models/DadosContrato";
import Proposta from "@/app/models/Proposta";
import PagamentoPix from "@/app/models/PagamentoPix";
import { PagamentoCartao } from "@/app/models/CartaoDeCredito";

export interface GlobalContextProps {
    data: { exampleData: string } | null;
    dadosSimulacao: SimulacaoDadosIniciais | null;
    setDadosSimulacao: Dispatch<SetStateAction<SimulacaoDadosIniciais | null>>;
    //sendLead(): Promise<void>,
    leadToken: string;
    setPlanos: Dispatch<SetStateAction<Array<Plano> | null | undefined>>;
    planos: Array<Plano> | null | undefined;
    planoSelecionado: Plano | null | undefined;
    setPlanoSelecionado: Dispatch<SetStateAction<Plano | null | undefined>>;
    planoSelecionadoDetalhes: PlanoDetalhes | null | undefined;
    setDadosContrato: Dispatch<SetStateAction<DadosContrato | null | undefined>>;
    dadosContrato: DadosContrato | null | undefined;
    setDadosProposta: Dispatch<SetStateAction<Proposta | null | undefined>>;
    dadosProposta: Proposta | null | undefined;
    setFormaPagamento: Dispatch<SetStateAction<string>>;
    formaPagamento: string,
    setUrlPagamento: Dispatch<SetStateAction<string>>;
    urlPagamento: string;
    setEmpresaId: Dispatch<SetStateAction<number>>;
    empresaId: number;
    setPagamentoPix: Dispatch<SetStateAction<PagamentoPix | null>>;
    pagamentoPix: PagamentoPix | null;
    setBoletoCodigo: Dispatch<SetStateAction<string>>;
    boletoCodigo: string;
    setCartaoCredito: Dispatch<SetStateAction<PagamentoCartao| null>>;
    cartaoCredito: PagamentoCartao | null;
    setFormCartoesErros: Dispatch<SetStateAction<Array<string>>>;
    formCartaoErros: Array<string>
    setFormDadosIniciaisErros: Dispatch<SetStateAction<Array<string>>>;
    formDadosIniciaisErros: Array<string>
    setFormDadosContratoErros: Dispatch<SetStateAction<Array<string>>>;
    formDadosContratoErros: Array<string>
}
