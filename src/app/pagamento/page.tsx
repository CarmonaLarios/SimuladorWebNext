
"use client";

import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Checkout from '@/components/Checkout'

export default function ResultadoPage() {
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
          <Checkout />
        </Grid>

      </Grid>
    </Paper>

  );
}
