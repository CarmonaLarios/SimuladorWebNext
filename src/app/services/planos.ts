import axios from "axios";
import Plano, { PlanoPayload } from "../models/Planos";
import PlanoDetalhes from "../models/PlanosDetalhes";

function getPlanos(payload: PlanoPayload){
    return axios.post<Plano[]>('/planos', payload)
}

function getDetalhesPlano(leadId: number, planoId: number) {
    return axios.post<PlanoDetalhes>('/planos-detalhes', {leadId, planoId})
}

export const PlanosApi = {
    getPlanos,
    getDetalhesPlano
}