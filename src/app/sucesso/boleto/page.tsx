"use client";
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CardObrigado from '@/components/Cards/CardObrigado';
import Button from '@mui/material/Button';
import Link from 'next/link'

export default function HorizontalLinearStepper() {

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
            <CardObrigado 
              message="Copie o código abaixo para pagar usando seu internet banking ou dirija-se a um banco, caixa eletrônico ou lotérica com seu boleto impresso."
              text="A confirmação do seu pagamento pode levar até 3 dias úteis."
            />
          </Grid>
          <Grid item xs={12} sx={{mt:3}}>
            <Button variant="outlined" sx={{mx:'auto', width:'100%', mb:2}} disableElevation component={Link} href='/'>voltar
            </Button>
          </Grid>
        </Grid>
      </Paper>
  );
}