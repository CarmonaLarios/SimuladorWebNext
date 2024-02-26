import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { Box, Button, Card, CardContent, CardHeader, FormControl, FormHelperText, InputLabel, Link, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import {BandeirasCartaoCreditoDto} from '@/app/services/Dtos/BandeirasCartaoCreditoDto';
import { getCartoesByModuloCompra } from '@/app/services/ChatBotService';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import { campoObrigatorio, deveTerXCaracteres } from '@/app/consts/message-consts';
import { PagamentoCartao } from '@/app/models/CartaoDeCredito';
import InputMask from 'react-input-mask';
import { useSimulacao } from '@/app/hooks/simulacao';
import { PagamentosApi } from '@/app/services/pagamento';
import OutlinedInput from '@mui/material/OutlinedInput';
import { removeSpecialChars } from '@/app/utils/utils';

const OutlinedInputSelect = styled(OutlinedInput)(({ theme }) => ({
    borderRadiu:0,
  '& fieldset': {
    border:'none',
    borderRadius:0,
  },
  '& .MuiOutlinedInput-input':{
    borderRadius:0,
    borderBottom:'2px solid #000',
    paddingLeft:0,
    paddingBottom:'5px',
    letterspacing: '1',
    color: '#acb0b8',
    fontWeight:'300',
  },
  '& .MuiOutlinedInput-input:focus':{
    borderRadius:0,
  }
}));

const FormControlSelect = styled(FormControl)(({ theme }) => ({
  borderBottom:'2px solid rgba(0, 0, 0, 0)',
  '& p': {
    color:'#d32f2f',
    marginLeft:'0',
  },
}));

export default function FormCredito() {
  const [bandeirasCartao, setBandeirasCartao] = React.useState<Array<BandeirasCartaoCreditoDto|null>>([]);
  const [parcelasArray, setParcelasArray] = React.useState<number[]>([]);
  const [mascaraCartao, setMascaraCartao] = React.useState<string>('') 
  const {proposta} = useSimulacao()
  
  const item_height = 48;
  const item_padding_top = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: item_height * 4.5 + item_padding_top,
        borderRadius:'none',
        border:'none',
      },
    },
  };

  const router = useRouter();
  
  const form = useFormik<PagamentoCartao>({
    initialValues: {
      cartaoBandeira: '',
      cartaoCodigoSeguranca: '',
      cartaoCpfTitular: '',
      cartaoNomeTitular: '',
      cartaoNumero: '',
      cartaoValidadeMes: 0,
      cartaoValidadeAno: 0,
      cartaoParcelas: 0,
      cartaoId: 0,
      propostaId: 0,
      cartaoValidadeMesAno: '',
    },
    validationSchema: yup.object({
      cartaoBandeira: yup.string().min(1, campoObrigatorio).required(campoObrigatorio),
      cartaoCodigoSeguranca: yup.string().test('valida-cvv', deveTerXCaracteres(3), (value) => {
        return removeSpecialChars(value) >= 3
      }).min(3, deveTerXCaracteres(3)).required(campoObrigatorio),
      cartaoCpfTitular: yup.string().test('valida-tamanho-cpf', deveTerXCaracteres(11), (value) => {
        return removeSpecialChars(value) >= 11
      }).min(14, deveTerXCaracteres(11)).required(campoObrigatorio),
      cartaoNomeTitular: yup.string().min(5, deveTerXCaracteres(5)).required(campoObrigatorio),
      cartaoNumero: yup.string().test('valida-tamanho-numero-cartao', deveTerXCaracteres(10), (value) => {
        return removeSpecialChars(value) >= 10
      }).min(10, deveTerXCaracteres(10)).required(campoObrigatorio),
      cartaoValidadeMesAno: yup.string().test('valida-tamanho-mes-ano', deveTerXCaracteres(7), (value) => {
        return removeSpecialChars(value) >= 6
      }).required(campoObrigatorio)
    }),
    onSubmit: (values) => {
      const {cartaoBandeira, cartaoNomeTitular, cartaoNumero, cartaoCpfTitular} = values
      const {cartaoValidadeMesAno, cartaoCodigoSeguranca, cartaoParcelas} = values

      const validade = cartaoValidadeMesAno!.split('/')
      const cartao = bandeirasCartao.find(cartao => cartao?.nome === cartaoBandeira)
      
      if(proposta?.PropostaID){
        const payload: PagamentoCartao = {
          propostaId: +proposta?.PropostaID,
          cartaoNomeTitular,
          cartaoNumero: cartaoNumero.replaceAll('-', ''),
          cartaoCpfTitular,
          cartaoCodigoSeguranca,
          cartaoValidadeMes: +validade[0],
          cartaoValidadeAno: +validade[1],
          cartaoId: cartao?.id!,
          cartaoBandeira: cartaoBandeira,
          cartaoParcelas
        }
        PagamentosApi.solicitarCartao(payload).then(() => {
          router.push('/sucesso/cartao')
        })
      }
    }
  });

  const criaElementosParcela = (bandeira: BandeirasCartaoCreditoDto | null) => {
    setMascaraCartao(bandeira?.mascaracartao || '9999-9999-9999-9999')
    setParcelasArray(Array.from({ length: bandeira?.parcelamentomax ?? 0 }, (_, index) => index + 1));
  }

  const handleBandeiraSelecionada = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    const selectedBandeira = bandeirasCartao.find((option) => option?.nome === selectedValue) || null;
    criaElementosParcela(selectedBandeira);
    form.setFieldValue('cartaoBandeira', selectedValue);
  }

   React.useEffect(() => {
    getCartoes();
  }, []);

  const getCartoes = async () => {
    setBandeirasCartao(await getCartoesByModuloCompra(33));
  }

  return (
    <form onSubmit={form.handleSubmit}>
              <Card variant="outlined" sx={{textAlign:'left', mt:2, mb:2, pt:4}}>
              <CardHeader 
        sx={{p:0, mb:2}}
        title="Cartão de crédito"
      />
          <CardContent sx={{pt:4, p:0}}>
      <Stack spacing={3}>
        {/* <pre>{JSON.stringify(bandeirasCartao, null, 2)}</pre> */}
        <FormControlSelect required sx={{ m: 1, width: "100%", mt: 3 }}>
          <Select
            displayEmpty
            fullWidth
            name="cartaoBandeira"
            required
            color="secondary"
            label="Selecione a bandeira"
            value={form.values.cartaoBandeira}
            onChange={handleBandeiraSelecionada}
            onBlur={form.handleBlur}
            error={form.touched.cartaoBandeira && !!form.errors.cartaoBandeira}
            input={<OutlinedInputSelect />}
            MenuProps={MenuProps}
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem disabled value="">
              <span>Selecione a bandeira </span>
            </MenuItem>
            {bandeirasCartao.map((option) => (
              <MenuItem dense key={option?.id} value={option?.nome}>
                {option?.nome}
              </MenuItem>
            ))}
          </Select>
        <FormHelperText>{form.touched.cartaoBandeira && form.errors.cartaoBandeira}</FormHelperText>
      </FormControlSelect>
        <FormControl>
          <InputMask
            name='cartaoNumero'
            mask={mascaraCartao}
            value={removeSpecialChars(form.values.cartaoNumero)}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            >
              <TextField 
                focused
                label="Número do cartão"
                required
                fullWidth
                variant="standard"
                color="secondary"
                error={form.touched.cartaoNumero && !!form.errors.cartaoNumero}
                helperText={form.touched.cartaoNumero && form.errors.cartaoNumero} />
          </InputMask>
        </FormControl>

        <FormControl>
          <TextField
            focused
            required
            fullWidth
            color="secondary"
            variant="standard"
            label="Nome titular"
            name='cartaoNomeTitular'
            value={form.values.cartaoNomeTitular}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            placeholder="Nome igual no cartão"
            error={form.touched.cartaoNomeTitular && !!form.errors.cartaoNomeTitular}
            helperText={form.touched.cartaoNomeTitular && form.errors.cartaoNomeTitular}
          />
        </FormControl>

        <FormControl>
          <InputMask
            name='cartaoCpfTitular'
            mask="999.999.999-99"
            value={removeSpecialChars(form.values.cartaoCpfTitular)}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            >
              <TextField
                focused
                required
                fullWidth
                color="secondary"
                variant="standard"
                placeholder="CPF"
                name="cartaoCpfTitular"
                label="Numero CPF Titular"
                error={form.touched.cartaoCpfTitular && !!form.errors.cartaoCpfTitular}
                helperText={form.touched.cartaoCpfTitular && form.errors.cartaoCpfTitular}
              />
          </InputMask>
        </FormControl>

        <Box gap={3} display={'flex'}>
          <FormControl>
            <InputMask
              name='cartaoValidadeMesAno'
              mask="99/9999"
              value={form.values.cartaoValidadeMesAno}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              >
                <TextField
                  focused
                  required
                  fullWidth
                  color="secondary"
                  variant="standard"
                  name="cartaoValidadeMesAno"
                  label="Vencimento"
                  placeholder="MM/AAAA"
                  error={form.touched.cartaoValidadeMesAno && !!form.errors.cartaoValidadeMesAno}
                  helperText={form.touched.cartaoValidadeMesAno && form.errors.cartaoValidadeMesAno}
                />
            </InputMask>
          </FormControl>

          <FormControl>
            <InputMask
              mask="999"
              name='cartaoCodigoSeguranca'
              value={removeSpecialChars(form.values.cartaoCodigoSeguranca)}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              >
                <TextField
                  focused
                  required
                  fullWidth
                  label="CVV"
                  color="secondary"
                  variant="standard"
                  placeholder="123"
                  error={form.touched.cartaoCodigoSeguranca && !!form.errors.cartaoCodigoSeguranca}
                  helperText={form.touched.cartaoCodigoSeguranca && form.errors.cartaoCodigoSeguranca}
                />
            </InputMask>
          </FormControl>
        </Box>
        <FormControlSelect required sx={{ m: 1, width: "100%", mt: 3 }}>
        <Select
          displayEmpty
          name="cartaoParcelas"
          required
          fullWidth
          color="secondary"
          label="Valor das Parcelas"
          value={`${form.values.cartaoParcelas}`}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.touched.cartaoParcelas && !!form.errors.cartaoParcelas}
          input={<OutlinedInputSelect />}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
          defaultValue='0'
          defaultChecked
        >
          <MenuItem disabled value="0">
            <span>Número de parcelas</span>
          </MenuItem>
          {parcelasArray.length > 0 && parcelasArray.map((option, index) => (
            <MenuItem dense key={index} value={option}>
              {`${option} X Sem Juros`}
            </MenuItem> 
          ))}
        </Select>
      </FormControlSelect>
      </Stack>
      <Box sx={{ p:0, textAlign:'center',m:3}}>
          <Typography sx={{fontSize:'.6rem', color:'#808080'}}>
            Os seus dados pessoais serão utilizados para processar a sua compra e para outros fins descritos na nossa política de privacidade.
          </Typography>
        </Box>
      </CardContent>
        </Card>
      <Grid item xs={12} sx={{mt:3}}>
        <Button type='submit' variant="contained" sx={{mx:'auto', width:'100%', mb:2}}>Continuar</Button>
      </Grid>
    </form>
  );
}
