"use client";

import * as React from 'react';
import { useState, useEffect }  from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ChatPagametade from '@/components/Chat/ChatPagaMetade';
import Button from '@mui/material/Button';
import Link from 'next/link'
import { EmpresaEnum } from '../enums/EmpresaEnum';
import { LeadApi } from '../services/lead';
import { useRouter } from 'next/navigation';
import { useDadosUsuario } from '../hooks/dadosUsuario';
import TipoParcelaEnum from '../enums/TipoParcelaEnum';
import { useSimulacao } from '../hooks/simulacao';
import { ModalidadePagamentoEnum, ProdutosEnum } from '../enums/SimulacaoEnum';

export default function CadastroPage() {
  const {dadosUsuario} = useDadosUsuario()

  const route = useRouter()
  const {produtoSelecionado, campanhaId, actions} = useSimulacao();
  
  function enviarLead(empresaId: EmpresaEnum, tipoParcela: TipoParcelaEnum){
    useDadosUsuario.setState({empresaId})
    
    const categoriaId = defineIdBemComBaseModalidade(tipoParcela);
    dadosUsuario && LeadApi.enviarLead(dadosUsuario, empresaId, categoriaId, campanhaId).then(res => {
      useDadosUsuario.setState({autenticacao: res.data})
      route.push('/resultado')
    })
  }

  function defineIdBemComBaseModalidade (tipoParcela: TipoParcelaEnum) {
  
    let produto = ModalidadePagamentoEnum.IMOVEL_INTEGRAL;

    if(tipoParcela === TipoParcelaEnum.PagaMetade){
      switch(produtoSelecionado){
        case ProdutosEnum.IMOVEL : 
          produto = ModalidadePagamentoEnum.IMOVEL_PAGA_METADE; 
        break;
        case ProdutosEnum.CARRO :
          produto = ModalidadePagamentoEnum.CARRO_PAGA_METADE; 
        break;
        case ProdutosEnum.MOTO : 
          produto = ModalidadePagamentoEnum.MOTO_PAGA_METADE; 
        break;
      }
    }

    else if(tipoParcela === TipoParcelaEnum.Integral){
      switch(produtoSelecionado){
        case ProdutosEnum.IMOVEL : 
          produto = ModalidadePagamentoEnum.IMOVEL_INTEGRAL; 
        break;
        case ProdutosEnum.CARRO :
          produto = ModalidadePagamentoEnum.CARRO_INTEGRAL; 
        break;
        case ProdutosEnum.MOTO : 
          produto = ModalidadePagamentoEnum.MOTO_INTEGRAL; 
        break;
        case ProdutosEnum.SERVICO : 
          produto = ModalidadePagamentoEnum.SERVICO_INTEGRAL; 
        break;
      }
    }
  
    actions.selecionarModalidadeParcela(produto);

    return produto;
  }

  const [showDiv, setShowDiv] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowDiv(true);
    }, 8001);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Paper 
    sx={{
      p: {xs:1, sm:3},
      margin: 'auto',
      maxWidth: 500,
      flexGrow: 1,
      textAlign: 'center',
    }}
  >
      <Grid container >
        <Grid item xs={12}>
          <ChatPagametade />
        </Grid>
        {showDiv && 
        <div className='showdivchat'>
        <Grid item xs={12} sx={{mt:3}}>
        <Button onClick={() => enviarLead(EmpresaEnum.Mycon, TipoParcelaEnum.PagaMetade)} variant="contained" sx={{mx:'auto', width:'100%', mb:2}} id={"metade"} disableElevation className="textuppercase">Plano paga metade
        </Button>
        <Button onClick={() => enviarLead(EmpresaEnum.Mycon, TipoParcelaEnum.Integral)} variant="contained" sx={{mx:'auto', width:'100%', mb:2}} id={"integral"} disableElevation className="textuppercase">plano integral
        </Button>
        <Button variant="outlined" sx={{mx:'auto', width:'100%', mb:2}} disableElevation component={Link} href='/cadastro'>voltar
        </Button>
        </Grid>
        </div>}
      </Grid>
    </Paper>

  );
}
