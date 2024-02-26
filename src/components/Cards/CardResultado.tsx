import * as React from 'react';
import Link from 'next/link'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import ICardResultadoProps from './interfaces/ICardResultadoProps';


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  boxShadow:'none',
  backgroundColor:'transparent',
}));

const CardResultado = styled(Card)(({ theme }) => ({
  ...theme.typography.body2,
  '&:hover': {
    backgroundColor:'#f7f8fb'
  },

}));


export default function CardResultados(plano: ICardResultadoProps) {

  const handleClickPlanoSelecionado = () => {
    plano.onClick(plano.planoID);
  };
  
  return (
    <Link href="/pagamento" onClick={handleClickPlanoSelecionado}>
      <CardResultado variant="outlined" sx={{textAlign:'left', mb:2}}>
        <CardHeader variant="p"
          sx={{p:0, textTransform:'uppercase'}}
          title={plano.titulo}
        />
        <CardContent sx={{p:0}}>
          <Typography sx={{fontSize:'10px', textTransform:'uppercase', fontWeight:400}}>
            sua parcela:
          </Typography>
          <Typography sx={{fontSize:'1.2rem', color:'text.secondary', fontWeight:700}}>
            {plano.parcela}
          </Typography>
        </CardContent>
        <CardActions sx={{p:0}}>
        <Box sx={{ flexGrow: 1, p:0}}>
          <Grid container spacing={2}>
            <Grid item xs={7} sx={{p:0}}>
              <Item sx={{p:0}}>
                <Typography variant="body2">
                  Crédito
                </Typography>
                <Typography sx={{fontSize:'.9rem', fontWeight:700, backgroundColor:'none'}} >
                  {plano.credito}
                </Typography>
              </Item>
            </Grid>
            <Grid item xs={5} sx={{p:0}}>
              <Item sx={{p:0}}>
              <Typography variant="body2">
                  Prazo:
                </Typography>
                <Typography sx={{fontSize:'.9rem', fontWeight:700}}>
                  {plano.meses} meses
                </Typography>
              </Item>
            </Grid>
          </Grid>
        </Box>
        </CardActions>
    </CardResultado>
  </Link>

  );
}
