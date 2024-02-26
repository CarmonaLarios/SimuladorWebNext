"use client"

import TipoBem from "@/app/enums/TipoBemEnum";
import TipoPlano from "@/app/enums/TipoPlanoEnum";
import SimulacaoDadosIniciais from "@/app/models/SimulacaoDadosIniciais";
import React, { createContext, useState, useEffect, FC, Dispatch, SetStateAction } from "react";
import Plano from "@/app/models/Planos";
import { GlobalContextProps } from "./interfaces/IGlobalContextProps";
import PlanoDetalhes from "@/app/models/PlanosDetalhes";
import { getPlanosDetalhes } from "@/app/services/ChatBotService";
import DadosContrato from "@/app/models/DadosContrato";
import Proposta from "@/app/models/Proposta";
import {EmpresaEnum} from "@/app/enums/EmpresaEnum";
import PagamentoPix from "@/app/models/PagamentoPix";
import { PagamentoCartao } from "@/app/models/CartaoDeCredito";

const GlobalContext = createContext<GlobalContextProps| undefined>(undefined);

interface GlobalProviderProps {
    children: React.ReactNode;
}

const GlobalProvider: FC<GlobalProviderProps> = ({ children }) => {
    const [data, setData] = useState<{ exampleData: string } | null>(null);
    const [dadosSimulacao, setDadosSimulacao] = useState<SimulacaoDadosIniciais | null>({bemTipo: TipoBem[1], valorTotal: 0, tipoPlano: TipoPlano[0], categoriaId: TipoBem.Imovel });
    const [leadToken, setLeadToken] = useState<string>('');
    const [planos, setPlanos] = useState<Array<Plano> | null>();
    const [planoSelecionado, setPlanoSelecionado] = useState<Plano| null | undefined>(null);
    const [planoSelecionadoDetalhes, setPlanoSelecionadoDetalhes] = useState<PlanoDetalhes| null | undefined>(null);
    const [dadosContrato, setDadosContrato] = useState<DadosContrato | null | undefined>(null);
    const [dadosProposta, setDadosProposta] = useState<Proposta | null | undefined>(null);
    const [formaPagamento, setFormaPagamento] = useState<string>("");
    const [urlPagamento, setUrlPagamento] = useState<string>("");
    const [empresaId, setEmpresaId] = useState<number>(EmpresaEnum.Mycon);
    const [pagamentoPix, setPagamentoPix] = useState<PagamentoPix | null>(null);
    const [boletoCodigo, setBoletoCodigo] = useState<string>("");
    const [cartaoCredito, setCartaoCredito] = useState<PagamentoCartao | null>(null);
    const [formCartaoErros, setFormCartoesErros] = useState<Array<string>>([]);
    const [formDadosIniciaisErros, setFormDadosIniciaisErros] = useState<Array<string>>([]);
    const [formDadosContratoErros, setFormDadosContratoErros] = useState<Array<string>>([]);


    const setUrlFormaPagamento = (fPagamento: string) => {
      switch(fPagamento){
        case "cartao":
          return "/pagamento/cartao-de-credito";
        case "pix":
          return `/pagamento/pix`;
        case "boleto":
          return `/pagamento/boleto`; 
        default:
          return "/pagamento/cartao-de-credito";
      }
    }


    useEffect(() => {
      setUrlPagamento(setUrlFormaPagamento(formaPagamento));
    }, [formaPagamento])

    useEffect(() => {
      const fetchData = async () => {
        try {
          const detalhes = await getPlanosDetalhes(dadosSimulacao?.leadId, planoSelecionado?.PlanoID);
          setPlanoSelecionadoDetalhes(detalhes);
        } catch (error) {
          console.error('Erro ao buscar detalhes do plano:', error);
        }
      };
    
    }, [planoSelecionado?.PlanoID]);

    return (
      <GlobalContext.Provider value={{ data, 
                                       dadosSimulacao,
                                       setDadosSimulacao, 
                                       leadToken, 
                                       setPlanos, 
                                       planos, 
                                       planoSelecionado, 
                                       setPlanoSelecionado, 
                                       planoSelecionadoDetalhes,
                                       dadosContrato,
                                       setDadosContrato,
                                       dadosProposta,
                                       setDadosProposta,
                                       setFormaPagamento,
                                       formaPagamento, 
                                       setUrlPagamento,
                                       urlPagamento,
                                       setEmpresaId,
                                       empresaId,
                                       setBoletoCodigo,
                                       boletoCodigo,
                                       setPagamentoPix,
                                       pagamentoPix, 
                                       setCartaoCredito,
                                       cartaoCredito,
                                       setFormCartoesErros,
                                       formCartaoErros,
                                       setFormDadosContratoErros,
                                       formDadosContratoErros,
                                       setFormDadosIniciaisErros,
                                       formDadosIniciaisErros }}>
        {children}
      </GlobalContext.Provider>
    );
  };
  
export { GlobalProvider, GlobalContext };


