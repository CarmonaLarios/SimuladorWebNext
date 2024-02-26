import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Image from 'next/image';
import Check from '../../assets/images/check.png';


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  boxShadow:'none',
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  '&:last-child': {
    paddingBottom: 0,
  },
}));

export default function CardObrigado({ message, text }: { message: string; text: string }) {
  return (
    <Box>
      <Image alt="Mycon Ok" title="Mycon Ok" src={Check}/>
      <Card variant="outlined" sx={{textAlign:'center', mb:2, mt:2}}>
      <StyledCardContent sx={{p:0, pb:0}}>
          <Typography variant="h5" gutterBottom sx={{mb:2, mt:2}}>
            Proposta concluída!
          </Typography>
          <Typography sx={{fontSize:'.8rem', mb:2}} >
          {message}
          </Typography>
          <Typography sx={{fontSize:'.8rem', mb:2}}>
          {text}
          </Typography>

      </StyledCardContent>
    </Card>
    </Box>

  );
}