import * as React from 'react';
import Grid from '@mui/material/Grid';

export default function Custom404() {
    return (
      <Grid container >
        <Grid item xs={12} sx={{textAlign:'center'}}>
          <h1>Página não encontrada</h1>
        </Grid>
      </Grid>
      )
  }