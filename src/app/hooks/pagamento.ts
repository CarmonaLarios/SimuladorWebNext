import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import PagamentoPix from "../models/PagamentoPix";
import PagamentoBoleto from "../models/Boleto";
import { PagamentoCartao } from "../models/CartaoDeCredito";

interface Props {
    pagamentoPix: PagamentoPix | null
    pagamentoBoleto: PagamentoBoleto | null
    pagamentoCartao: PagamentoCartao | null
}

export const usePagamento = create(immer<Props>(() => {
    return {
        pagamentoPix: null,
        pagamentoBoleto: null,
        pagamentoCartao: null
    }
}))
