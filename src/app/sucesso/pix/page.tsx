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
              message="Assim que recebermos a confirmação do seu pagamento, você receberá uma notificação no e-mail informado"
              text="Para a sua comodidade e segurança, guarde o comprovante de pagamento "
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