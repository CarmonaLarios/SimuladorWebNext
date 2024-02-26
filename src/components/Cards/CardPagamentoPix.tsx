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
import QrCodePagamento from '../QrCode/QrCodePagamento';
import { usePagamento } from '@/app/hooks/pagamento';


export default function CardPagamentoPix() {
  const { pagamentoPix } = usePagamento()
  var [text, setText] = useState('Copiar Código');
  var [color, setColor] = useState('#5451FB');
  var [icone, setIcone] = useState(<ContentCopyIcon />);
  
  async function copiarTexto(){
    await navigator.clipboard.writeText(pagamentoPix?.PixQrCode || '')
    setText(text =  'Código Copiado');
    setColor(color ='#2e7d32');
    setIcone(icone = <CheckCircleIcon />);
  }

  return (
    <Card variant="outlined" sx={{textAlign:'left', mt:0}}>
      <CardHeader 
        sx={{p:0, mb:2}}
        title="PIX"
      />
      <CardContent sx={{p:0}}>
        <Box sx={{ p:0, textAlign:'center'}}>
          <Typography sx={{fontSize:'.9rem',m:1, p:1}}>
            Copie o código abaixo para pagar via PIX em qualquer banco:
          </Typography>
          {pagamentoPix && <QrCodePagamento value={pagamentoPix.PixURL ?? ''} />}
        </Box>
        <Box sx={{border:'1px solid #5451FB', borderRadius:'8px', textAlign:'center', mt:2}}>
          <Typography sx={{fontSize:'.8rem', m:1, p:1, wordWrap:'break-word', textTransform:'uppercase'}} >   
            {pagamentoPix?.PixQrCode}
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
          Você tem até 24 horas para fazer o pagamento, Após esse período a proposta será cancelada.
        </Typography>
      </CardActions>
    </Card>
  );
}
