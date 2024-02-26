import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { TipoPagamentoEnum } from '@/app/enums/pagamento';
import { PagamentosApi } from '@/app/services/pagamento';
import { useSimulacao } from '@/app/hooks/simulacao';
import { Button } from '@mui/material';
import { usePagamento } from '@/app/hooks/pagamento';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading/loading';

export default function SelectPagamentos() {
  const {proposta} = useSimulacao()
  const route = useRouter()
  const [loading,setLoading] =useState(false)

  const form = useFormik({
    initialValues: {
      tipoPagamento: TipoPagamentoEnum.CARTAO
    },
    onSubmit: ({tipoPagamento}) => {
      if(proposta){
        switch(+tipoPagamento){
          case TipoPagamentoEnum.PIX:
            setLoading(true)
            pagamentoPix(proposta.PropostaToken)
            break
          case TipoPagamentoEnum.BOLETO:
            setLoading(true)
            pagamentoBoleto(proposta.PropostaToken)
            break
          case TipoPagamentoEnum.CARTAO:
            setLoading(true)
            route.push('/pagamento/cartao-de-credito')
          default:
            break
        }
      }
    }
  })

  function pagamentoPix(tokenProposta: string){
    PagamentosApi.solicitarPix(tokenProposta).then(({data}) => {
      usePagamento.setState({pagamentoPix: data})
      route.push('/pagamento/pix')
    })
  }

  function pagamentoBoleto(tokenProposta: string){
    PagamentosApi.solicitarBoleto(tokenProposta).then(({data}) => {
      usePagamento.setState({pagamentoBoleto: data})
      route.push('/pagamento/boleto')
    })
  }

  return (
    <Box>
    <Card variant="outlined" sx={{textAlign:'left', p:2, mt:2, borderRadius:'16px'}}>
      <CardHeader 
        sx={{p:0, mb:2}}
        title="Selecione a forma de pagamento:"
      />
      <CardContent sx={{p:0}}>
        <Box sx={{ p:0}}>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="cartao"
            name="radio-buttons-group"
            value={form.values.tipoPagamento}
            onChange={(_, valor) => form.setFieldValue('tipoPagamento', valor)}
          >
            <FormControlLabel value={TipoPagamentoEnum.CARTAO} control={<Radio sx={{ color:'#ACACAC', pb:0}} />} label="Cartão de Crédito" />
            <Typography sx={{fontSize:'.65rem', color:'#808080', pl:'30px',m:0, pb:1}}>
              Em até 3x sem juros:
            </Typography>
            <FormControlLabel value={TipoPagamentoEnum.PIX} control={<Radio sx={{ color:'#ACACAC', pb:0}} />} label="PIX" />
            <Typography sx={{fontSize:'.65rem', color:'#808080', pl:'30px',m:0, pb:1}} >
              Pagamento imediato
            </Typography>
            <FormControlLabel value={TipoPagamentoEnum.BOLETO} control={<Radio sx={{ color:'#ACACAC', pb:0}} />} label="Boleto Bancário" />
            <Typography sx={{fontSize:'.65rem', color:'#808080', pl:'30px',m:0, pb:0}}>
              Compensação do boleto em até 3 dias úteis:
            </Typography>
          </RadioGroup>
        </FormControl>
        </Box>
      </CardContent>
    </Card>
    <Box>
        <Button
          onClick={form.submitForm}
          variant="contained"
          sx={{ mt: 3, ml: 0 , mb:0, width:'100%'}}
          disableElevation
          >
          Continuar
        </Button>
        {loading && <Loading />}
      </Box>
    </Box>
  );
}
