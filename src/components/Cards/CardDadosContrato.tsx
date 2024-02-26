import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Image from 'next/image';
import { useSimulacao } from '@/app/hooks/simulacao';
import { iconesProdutos, menuProdutos } from '../Shared/produtos';
import { ProdutosEnum } from '@/app/enums/SimulacaoEnum';
import { getEnumKeyByEnumValue } from '@/app/utils/utils';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  boxShadow:'none',
}));


export default function CardDadosContrato() {
  const {planoEscolhido: plano, produtoSelecionado} = useSimulacao()
  const tipoBem = getBemIcone();

  function getBemIcone () {
    const produto = getEnumKeyByEnumValue(ProdutosEnum, produtoSelecionado);

    if (produto.includes('IMOVEL')) {
      return menuProdutos[iconesProdutos.IMOVEL];
    } else if (produto.includes('CARRO')) {
      return menuProdutos[iconesProdutos.CARRO];
    } else if (produto.includes('MOTO')) {
      return menuProdutos[iconesProdutos.MOTO];
    } else if (produto.includes('SERVICO')) {
      return menuProdutos[iconesProdutos.SERVICO];
    } else {
      return menuProdutos[iconesProdutos.IMOVEL];
    }
  }
  
  return (
    <>
      {plano && (
        <Card variant="outlined" sx={{textAlign:{xs:'center', sm:'left'}, mb:2}}>
        <CardHeader variant="p"
          sx={{p:0, mb:2}}
          title="Você escolheu:"
        />
        <CardContent sx={{p:0}}>
          <Box sx={{ flexGrow: 1, p:0}}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} sx={{p:0}}>
                <Item sx={{p:0, ml:0, textAlign:'center'}}>
                  <Image alt="Mycon" src={tipoBem.icone} width="60" />
                  <Typography sx={{textTransform:'uppercase', fontSize:{xs:'1rem',sm:'0.8rem',md:'0.9rem', lg:'1rem'}}}>
                    {plano.BemNome}
                  </Typography>
                </Item>
              </Grid>
              <Grid item xs={12} sm={6} sx={{p:0}}>
                <Item sx={{p:0, textAlign:{xs:'center', sm:'left'}}}>
                <Typography sx={{fontSize:'12px', fontWeight:400}}>
                    Crédito
                  </Typography>
                  <Typography >
                    {plano.BemCreditoLabel}
                  </Typography>
                  <Typography sx={{fontSize:'12px', fontWeight:400}}>
                    Prazo
                  </Typography>
                  <Typography>
                    {plano.PlanoMeses} meses
                  </Typography>
                </Item>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <CardActions sx={{p:1, backgroundColor:'#F2F4F8', borderRadius:'8px', mt:2, textAlign:'center'}} >
        <Box sx={{width:'100%'}}>
        <Typography sx={{fontSize:'10px', textTransform:'uppercase', fontWeight:400}}>
              primeira parcela
            </Typography>
            <Typography sx={{fontSize:'1.3rem', color:'text.secondary', fontWeight:700}}>
              {plano.PlanoValorParcelaLabel}
            </Typography>
        </Box>
          
        </CardActions>
      </Card>
      )}
    </>
    
  );
}
