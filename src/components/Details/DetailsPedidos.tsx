import * as React from 'react';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { styled } from '@mui/material/styles';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TableDetailPlano from '@/components/Tables/TableDetailPlano'

import Grid from '@mui/material/Grid';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: '1px solid rgba(0, 0, 0, 0.12)',
  '&:not(:last-child)': {
    borderBottom: 0,
  },
}));

export default function DetailsPedido() {
  return (
    <Grid container spacing={3} >
      <Grid item xs={12}>
        <Accordion>
          <AccordionSummary sx={{fontWeight:600}}
            expandIcon={<ExpandMoreIcon sx={{color:'#5351F1'}}/>}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Detalhes do plano:
          </AccordionSummary>
          <AccordionDetails sx={{minHeight:'50px'}}>
            <TableDetailPlano/>
          </AccordionDetails>
        </Accordion>
        </Grid>
      </Grid>
  );
}
