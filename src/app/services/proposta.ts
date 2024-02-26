import axios from "axios";
import DadosContrato from "../models/DadosContrato";
import Proposta from "../models/Proposta";

function enviarProposta(dadosCadastro: DadosContrato){
    return axios.post<Proposta>('/proposta', dadosCadastro)
}

export const PropostaApi = {
    enviarProposta
}
