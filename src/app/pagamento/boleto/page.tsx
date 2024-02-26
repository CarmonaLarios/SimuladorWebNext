"use client";
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CardDadosContrato from '@/components/Cards/CardDadosContrato';
import CardPagamentoBoleto from '@/components/Cards/CardPagamentoBoleto';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from 'next/link'

const steps = ['Dados do Contrato', 'Endereço', 'Pagamento'];

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
          <Stepper activeStep={2} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}></StepLabel>
              </Step>
            );
          })}
        </Stepper>
          </Grid>
          <Grid item xs={12}>
            <CardDadosContrato />
          </Grid>
          <Grid item xs={12}>
            <CardPagamentoBoleto />
          </Grid>
          <Grid item xs={12} sx={{mt:3}}>
<Button type='submit' variant="contained" sx={{mx:'auto', width:'100%', mb:2}}>Continuar
</Button>
<Button variant="outlined" sx={{mx:'auto', width:'100%', mb:2}} disableElevation component={Link} href='/pagamento'>voltar
</Button>
</Grid>
        </Grid>
      </Paper>
  );
}