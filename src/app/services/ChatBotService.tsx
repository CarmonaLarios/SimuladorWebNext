// ChatBotService.ts

import SimulacaoDadosIniciais from "../models/SimulacaoDadosIniciais";
import { GlobalContextProps } from "@/contexts/interfaces/IGlobalContextProps";
import PlanoDetalhes from "../models/PlanosDetalhes";
import DadosContrato from "../models/DadosContrato";
import Proposta from "../models/Proposta";
import Endereco from "../models/Endereco";
import PagamentoBoletoDto from "./Dtos/PagamentoBoletoDto";
import PagamentoPixDto from "./Dtos/PagamentoPixDto";
import PagamentoCartaoDto from "./Dtos/PagamentoCartaoDto";
import Plano from "../models/Planos";
import { PagamentoCartao } from "../models/CartaoDeCredito";
import { BandeirasCartaoCreditoDto } from "./Dtos/BandeirasCartaoCreditoDto";

interface LeadSave {
  LeadID: number;
  LeadToken: string;
  CompraUrl: string;
  SimuleLeadID: number;
}

const ambiente = 'https://cd.mycon.io';

const sendLead = async (
  context: GlobalContextProps | undefined
) => {
  const lead = { ...context?.dadosSimulacao, compraId: 33, empresaId: context?.empresaId };

  const response = await fetch(`${ambiente}/api/chatbot/lead-save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(lead),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data: LeadSave = await response.json();

  lead.leadId = data.LeadID;
  lead.leadToken = data.LeadToken;

  context?.setDadosSimulacao((prev: any) => ({ ...prev, ...lead }));
  context?.setPlanos(await getPlanos(lead));
};

const getPlanos = async (
  leadDetalhes: SimulacaoDadosIniciais
) => {
  const leadPlano = { leadId: leadDetalhes.leadId, categoriaId: leadDetalhes.categoriaId };

  const response = await fetch(`${ambiente}/api/chatbot/planos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(leadPlano),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const planos: Array<Plano> = await response.json();
  return planos;
};

const getPlanosDetalhes = async (
  leadID?: number,
  planoID?: number
) => {
  const plano = { leadId: leadID, planoId: planoID };

  const response = await fetch(`${ambiente}/api/chatbot/planos-detalhes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(plano),
  });

  if (!response.ok) {
    throw new Error(await response.json());
  }

  const planosDetalhes: PlanoDetalhes = await response.json();
  return planosDetalhes;
};

const createProposta = async (
  dadosContrato : DadosContrato
) => {

  const response = await fetch(`${ambiente}/api/chatbot/proposta`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosContrato),
    });
    
  
  if (!response.ok) {
    throw new Error(await response.json());
  }

  const propostaDetalhes: Proposta = await response.json();

  return propostaDetalhes;
};

const enderecoPorCep = async (
  endCep : string | undefined
) => {

  const response = await fetch(`${ambiente}/api/chatbot/endereco-cep`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({cep: endCep}),
    });
    
  
  if (!response.ok) {
    throw new Error(await response.json());
  }

  const endereco: Endereco = await response.json();

  return endereco;
};

const createPagamentoBoleto = async (
  propToken : string | undefined
) => {

  const response = await fetch(`${ambiente}/api/chatbot/pagamento-boleto`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({propostaToken: propToken}),
    });
    
  
  if (!response.ok) {
    throw new Error(await response.json());
  }

  const endereco: PagamentoBoletoDto = await response.json();

  return endereco;
};

const createPagamentoPix = async (
  propToken : string | undefined
) => {
  const response = await fetch(`${ambiente}/api/chatbot/pagamento-pix`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({propostaToken: propToken}),
    });
    
  
  if (!response.ok) {
    throw new Error(await response.json());
  }

  const endereco: PagamentoPixDto = await response.json();

  return endereco;
};

const createPagamentoCartaoCredito = async (
  cartaoDados : PagamentoCartao
) => {
  const response = await fetch(`${ambiente}/api/chatbot/pagamento-cartao`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartaoDados),
    });
    
  
  if (!response.ok) {
    throw new Error(await response.json());
    //throw new Error("Network response was not ok");
  }

  const dadosPagamento: PagamentoCartaoDto = await response.json();

  return dadosPagamento;
};

const getCartoesByModuloCompra = async (
  moduloCompra: number | null | undefined
) => {
  const response = await fetch(`${ambiente}/api/chatbot/modulo-compra-cartoes/${moduloCompra}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
  
  if (!response.ok) {
    throw new Error(await response.json());
  }

  const cartoesBandeiras: Array<BandeirasCartaoCreditoDto> = await response.json();

  return cartoesBandeiras;
};

export { sendLead, getPlanos, getPlanosDetalhes, createProposta, enderecoPorCep, createPagamentoBoleto, createPagamentoPix, getCartoesByModuloCompra, createPagamentoCartaoCredito };
