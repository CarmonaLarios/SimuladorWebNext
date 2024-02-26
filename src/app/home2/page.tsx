
"use client";

import * as React from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CustomizedProdutos from '@/components/Selects/SelectProdutosCredito'
import '../../config'
import { notFound } from 'next/navigation';
import { isNotFoundError } from 'next/dist/client/components/not-found';

export default function HomePage() {
  try{
    return (
      <Paper
        sx={{
          p: {xs:1, sm:3},
          margin: 'auto',
          maxWidth: 500,
          flexGrow: 1,
          textAlign: 'center',
          mt:'70px',
        }}
      >
        <Grid container >
          <Grid item xs={12}>
            < CustomizedProdutos />
          </Grid>
        </Grid>
      </Paper>
    );
  }
  catch (error){
    if (error instanceof isNotFoundError){
      notFound()
    }
    else {
      throw error;
    }
    
  }
 
}
