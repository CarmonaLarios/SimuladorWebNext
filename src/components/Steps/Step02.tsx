"use client";
import * as React from 'react';
import Grid from '@mui/material/Grid';
import DetailsPedido from '../Details/DetailsPedidos';
import CardDadosContrato from '../Cards/CardDadosContrato';
import FormEndereco from '../Forms/FormEndereco';
import {motion} from 'framer-motion';

interface Props {
  handleNext: Function
}

export default function Step02(props: Props) {
  return (
    <motion.div initial={{y:16, opacity: 0}} animate={{y:0, opacity:1}} transition={{ease:'easeInOut', duration:0.75}} >
    <Grid container >
      <Grid item xs={12}>
      <CardDadosContrato />
      <DetailsPedido />   
      <FormEndereco handleNext={props.handleNext} />
      </Grid>
    </Grid>
  </motion.div>
  );
}
