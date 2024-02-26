
"use client";

import * as React from 'react';
import { useState, useEffect }  from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ChatInicial from '@/components/Chat/ChatInicial';
import FormCadastro from '@/components/Forms/FormCadastro';

export default function CadastroPage() {
  
  const [showDiv, setShowDiv] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowDiv(true);
    }, 4001);

    return () => clearTimeout(timeoutId);
  }, []);
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
      <div>
      
    </div>
      <Grid container >
        <Grid item xs={12}>
          <ChatInicial></ChatInicial>
        </Grid>
        {showDiv && 
        <div className='showdivchat'>
          <Grid item xs={12}>
            <FormCadastro />
          </Grid>
        </div>}

      </Grid>
    </Paper>

  );
}
