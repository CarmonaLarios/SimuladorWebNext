import axios from "axios";
import PagamentoPix from "../models/PagamentoPix";
import PagamentoBoleto from "../models/Boleto";
import { PagamentoCartao } from "../models/CartaoDeCredito";

function solicitarPix(propostaToken: string){
    return axios.post<PagamentoPix>('/pagamento-pix', { propostaToken })
}

function solicitarBoleto(propostaToken: string){
    return axios.post<PagamentoBoleto>('/pagamento-boleto', { propostaToken })
}

function solicitarCartao(dadosCartao: PagamentoCartao){
    return axios.post('/pagamento-cartao', dadosCartao)
}

export const PagamentosApi = {
    solicitarPix,
    solicitarBoleto,
    solicitarCartao
}
