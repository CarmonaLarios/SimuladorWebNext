"use client";
import * as React from 'react';
import Grid from '@mui/material/Grid';
import CardDadosContrato from '../Cards/CardDadosContrato';
import SelectPagamentos from '../Selects/SelectPagamento';
import {motion} from 'framer-motion';

export default function Step03() {
  return (
    <motion.div initial={{y:16, opacity: 0}} animate={{y:0, opacity:1}} transition={{ease:'easeInOut', duration:0.75}} >
    <Grid container >
      <Grid item xs={12}>
        <CardDadosContrato />
        <SelectPagamentos />
      </Grid>
    </Grid>
    </motion.div>

  );
}