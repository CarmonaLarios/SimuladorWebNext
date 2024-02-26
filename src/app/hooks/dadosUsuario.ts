import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { IDadosUsuario, IEndereco, ILeadToken } from "../models/SimulacaoDadosIniciais";
import { EmpresaEnum } from "../enums/EmpresaEnum";

interface Props {
    dadosUsuario: IDadosUsuario | null
    autenticacao: ILeadToken | null
    empresaId: EmpresaEnum
}

interface Actions {
    actions: {
        salvarEndereco: (endereco: IEndereco) => void
    }
}

export const useDadosUsuario = create(immer<Props & Actions>((set, get) => ({
    dadosUsuario: null,
    autenticacao: null,
    empresaId: EmpresaEnum.Mycon,

    actions: {
        salvarEndereco: (endereco: IEndereco) => {
            if(get().dadosUsuario){
                set(state => {
                    state.dadosUsuario!.endereco = endereco
                })
            }
        }
    }
})))