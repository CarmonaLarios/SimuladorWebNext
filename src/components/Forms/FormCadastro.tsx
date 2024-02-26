import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import {useFormik} from 'formik';
import { IDadosUsuario } from '@/app/models/SimulacaoDadosIniciais';
import { Button, FormControl, FormHelperText, Link, Stack } from '@mui/material';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { useDadosUsuario } from '@/app/hooks/dadosUsuario';
import {moneyMask, phoneMask, validaSalarioInput} from '@/app/utils/utils'
import theme from '@/theme';
import InputMask from 'react-input-mask';
import { campoObrigatorio, deveTerXCaracteres, digiteValorEntreAeB, emailInvalido, termosObrigatorios } from '@/app/consts/message-consts';

export default function FormCadastro() {
  const router = useRouter()
  const {dadosUsuario} = useDadosUsuario()
  const [renda, setRenda] = useState<string>(moneyMask(dadosUsuario?.rendaMensal || '0'))

  const form = useFormik<IDadosUsuario>({
    initialValues: {
      nome: dadosUsuario?.nome || '',
      telefone: dadosUsuario?.telefone || '',
      email: dadosUsuario?.email || '',
      rendaMensal: dadosUsuario?.rendaMensal || '0',
      termos: false
    },
    validationSchema: yup.object({
      nome: yup.string().min(3, deveTerXCaracteres(3)).required(campoObrigatorio),
      telefone: yup.string().required(campoObrigatorio),
      email: yup.string().email(emailInvalido).required(campoObrigatorio),
      rendaMensal: yup.string().required(campoObrigatorio),
      termos: yup.boolean().isTrue(termosObrigatorios),
    }),
    onSubmit: (usuario) => {
      useDadosUsuario.setState({dadosUsuario: usuario})
      router.push('/planos')
    }
  })

  function setRendaMensal(valor: string){
    const renda = valor.replace(/[^0-9]/g, '') || '0'
    form.setFieldValue('rendaMensal', renda)
    setRenda(moneyMask(renda))
  }

  function handleBlurRenda() {
    form.setFieldTouched('rendaMensal', true, true)
  }

  return (
    <Box>
      <form onSubmit={form.handleSubmit}>
        <Card variant="outlined" sx={{textAlign:'left', mt:2, mb:2, pt:4}}>
          <CardContent sx={{pt:4, p:0}}>
            <Stack spacing={3}>
              <FormControl>
                <TextField
                  focused
                  name="nome"
                  label="Qual o seu nome?"
                  fullWidth
                  variant="standard"
                  placeholder="Seu nome"
                  color="secondary"
                  onBlur={form.handleBlur}
                  onChange={form.handleChange}
                  value={form.values.nome}
                  error={form.touched.nome && !!form.errors.nome}
                  inputProps={{ maxLength: 60 }}
                  helperText={form.touched.nome && form.errors.nome}
                />
              </FormControl>

              <FormControl>
                <InputMask
                  name='telefone'
                  mask="(99) 99999-9999"
                  value={form.values.telefone}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  >
                  <TextField
                    name='telefone'
                    focused
                    fullWidth
                    color="secondary"
                    variant="standard"
                    label="Qual o seu celular?"
                    placeholder="(00) 00000-0000"
                    error={form.touched.telefone && !!form.errors.telefone}
                    helperText={form.touched.telefone && form.errors.telefone}
                  />
                </InputMask>
              </FormControl>

              <FormControl>
                <TextField
                  focused
                  name="email"
                  label="Qual o seu melhor email?"
                  fullWidth
                  variant="standard"
                  placeholder="email@email.com"
                  color="secondary"
                  onChange={form.handleChange}
                  value={form.values.email}
                  onBlur={form.handleBlur}
                  error={form.touched.email && !!form.errors.email}
                  inputProps={{ maxLength: 60 }}
                  helperText={form.touched.email && form.errors.email}
                />
              </FormControl>

              <FormControl>
                <TextField
                  focused
                  label="Qual o sua renda mensal?"
                  fullWidth
                  variant="standard"
                  placeholder="R$ 0,00"
                  color="secondary"
                  onChange={(event) => setRendaMensal(event.target.value)}
                  value={renda}
                  error={form.touched.rendaMensal && !!form.errors.rendaMensal}
                  onBlur={handleBlurRenda}
                  helperText={form.touched.rendaMensal && form.errors.rendaMensal}
                />
              </FormControl>

              <FormControl>
                <Box display={'flex'} alignItems={'center'}>
                  <FormControlLabel
                      control={<Checkbox  name="termos" value={form.values.termos}  onChange={form.handleChange} />}
                      label=""
                  />
                  <Typography sx={{fontSize:'.65rem', color:'#808080'}}>
                    Li e aceito os <a href='https://www.mycon.com.br/termos-de-uso' className='links' target='_blank'>Termos de uso</a> e <a href='https://www.mycon.com.br/politica-de-privacidade' className='links' target='_blank'>Política de Privacidade</a>.
                  </Typography>
                </Box>
                <FormHelperText>{form.touched.termos && form.errors.termos}</FormHelperText>
              </FormControl>
            </Stack>
          </CardContent>
        </Card>

        <Box>
          <Button disabled={!form.isValid} type='submit' variant="contained" sx={{mx:'auto', width:'100%', mb:2}} disableElevation>Continuar
          </Button>
          <Button variant="outlined" sx={{mx:'auto', width:'100%', mb:2}} disableElevation component={Link} href='/'>voltar
          </Button>
        </Box>
      </form>
    </Box>
  );
}
