import  React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { usePagamento } from '@/app/hooks/pagamento';

export default function CardPagamentoBoleto() {
  const {pagamentoBoleto} = usePagamento();
  var [text, setText] = useState('Copiar Código');
  var [color, setColor] = useState('#5451FB');
  var [icone, setIcone] = useState(<ContentCopyIcon />);
  

  async function copiarTexto(){
    await navigator.clipboard.writeText(pagamentoBoleto?.BoletoCodigoBarras || '')
    setText(text =  'Código Copiado');
    setColor(color ='#2e7d32');
    setIcone(icone = <CheckCircleIcon />);
  }

  return (
    <Card variant="outlined" sx={{textAlign:'left', mt:0}}>
      <CardHeader 
        sx={{p:0, mb:2}}
        title="Boleto bancário"
      />
      <CardContent sx={{p:0}}>
        <Box sx={{ p:0, textAlign:'center'}}>
          <Typography sx={{fontSize:'.9rem',m:1, p:1}}>
            Copie o código abaixo para pagar usando seu internet banking ou dirija-se a um banco, caixa eletrônico ou lotérica com seu boleto impresso
          </Typography>
        </Box>
        <Box sx={{border:'1px solid #5451FB', borderRadius:'8px', textAlign:'center', mt:2}}>
          <Typography sx={{fontSize:'.8rem', m:1, p:1, wordWrap:'break-word', textTransform:'uppercase'}} >   
            {pagamentoBoleto?.BoletoCodigoBarras}
          </Typography>
        </Box>
        <Box sx={{ p:0, textAlign:'center',mt:2}}>
        <Button onClick={copiarTexto}  sx={{borderRadius:'8px'}} style={{ color: color }} startIcon={icone}>
          {text}
        </Button>
        </Box>
      </CardContent>
      <CardActions sx={{p:0, textAlign:'center', mt:1}} >
        <Typography sx={{fontSize:'.9rem',m:1, p:1}}>
          A confirmação do seu pagamento pode levar até 3 dias úteis.
        </Typography>
      </CardActions>
    </Card>
  );
}
