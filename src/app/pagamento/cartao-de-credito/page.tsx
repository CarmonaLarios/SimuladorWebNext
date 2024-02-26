"use client";

import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import CardDadosContrato from '@/components/Cards/CardDadosContrato';
import Button from '@mui/material/Button';
import Link from 'next/link'
import FormCredito from '@/components/Forms/FormCredito';
import Box from '@mui/material/Box';

const steps = ['Dados do Contrato', 'Endereço', 'Pagamento'];

export default function HorizontalLinearStepper() {
  const activeStep = 2;

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
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((_, index) => (
                  <Step key={index}>
                    <StepLabel />
                  </Step>
                )
              )}
            </Stepper>
          </Grid>
          <Grid item xs={12}>
            <CardDadosContrato />
          </Grid>
          <Grid item xs={12}>
            <FormCredito />
          </Grid>
          <Box sx={{mt:0, width:'100%'}}>
            <Button variant="outlined" sx={{mx:'auto', width:'100%', mb:2}} disableElevation component={Link} href='/pagamento'>voltar
            </Button>
          </Box>
        </Grid>
      </Paper>
  );
}
