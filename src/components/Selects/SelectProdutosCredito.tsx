import * as React from 'react';
import '../../styles/tabs.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

import Link from 'next/link'
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import SlideValorSimulacao from '../Slides/SlideValorSimulacao';
import { useSimulacao } from '@/app/hooks/simulacao';
import { ProdutosEnum, TipoSimulacaoEnum } from '@/app/enums/SimulacaoEnum';
import { menuProdutos } from '../Shared/produtos';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    backgroundColor: '#F9F9FB',
    borderRadius:'8px',
    padding:'6px',
    color:'#3A4256',
    justifyContent:'space-evenly',
    '& button.Mui-selected': {
      backgroundColor:"#5451FA",
      color:'#fff',
    },
    '& button.Mui-selected:hover': {
      backgroundColor:"#5451FA",
      color:'#fff',
    },
    '& .Mui-selected img': {
      filter: 'brightness(0) saturate(100%) invert(100%) sepia(25%) saturate(0%) hue-rotate(28deg) brightness(112%) contrast(101%)',
    },
}));

export default function CustomizedProdutos() {
  const {actions, produtoSelecionado, tipoSimulacao} = useSimulacao()

  function setProduto(produto: ProdutosEnum){
    actions.selecionarProduto(produto)
  }

  function setTipo(tipo: TipoSimulacaoEnum){
    actions.selecionarTipoSimulacao(tipo)
  }

  return (
    <Box sx={{ width: '100%', p:0, mt:2, mb:2 }}>
        <div>
          <Typography variant="h5" component="h5" sx={{m:2}}>
            Selecione a sua Conquista:
          </Typography>
        </div>
      
      <Box component="div">
        <StyledToggleButtonGroup 
          sx={{width:'100%'}} 
          onChange={(_, valor) => setProduto(valor)}
          value={produtoSelecionado}
          exclusive
          >
          {menuProdutos.map(item => 
              <ToggleButton  key={item.label} value={item.tipo}  sx={{border:'none', minWidth:'80px'}}>
                  <Image alt="Mycon" src={item.icone} />
                  <Typography sx={{fontSize:'.65rem', fontWeight:'700', mt:'5px'}}>{item.label}</Typography>
              </ToggleButton >
            )}
        </StyledToggleButtonGroup>
      </Box>
      <SlideValorSimulacao />
      <Box sx={{mt:5}}>
        <Button variant="contained" sx={{mx:'auto', width:280}} disableElevation component={Link} href='/cadastro' >Simular meu crédito
        </Button>
      </Box>
    </Box>
  );
}
