import axios from 'axios';
import { IDadosUsuario, ILeadToken } from '../models/SimulacaoDadosIniciais';
import { EmpresaEnum } from '../enums/EmpresaEnum';

function enviarLead(dadosUsuario: IDadosUsuario, 
                    empresaId: EmpresaEnum, 
                    categoriaId: number, 
                    campanhaId: number | null, 
                    compraId: number = 33){
    const {nome, email, telefone} = dadosUsuario
    const payload = {
        nome, email, telefone, empresaId, compraId, categoriaId, campanhaId
    }

    return axios.post<ILeadToken>('/lead-save', payload)
}

export const LeadApi = {
    enviarLead
}
