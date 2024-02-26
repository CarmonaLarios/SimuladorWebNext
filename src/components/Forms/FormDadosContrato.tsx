import * as React from 'react';
import * as yup from 'yup';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useFormik } from 'formik';
import { IDadosUsuario } from '@/app/models/SimulacaoDadosIniciais';
import { useDadosUsuario } from '@/app/hooks/dadosUsuario';
import { Button } from '@mui/material';
import { campoObrigatorio, deveTerXCaracteres, digiteValorEntreAeB, emailInvalido, termosObrigatorios } from '@/app/consts/message-consts';
import theme from '@/theme';
import { EMaiorDe18Anos, formataData, formataMascaraCPF, moneyMask, phoneMask, validaSalarioInput } from '@/app/utils/utils';
import { useSimulacao } from '@/app/hooks/simulacao';
import { useEffect, useState } from 'react';

interface Props {
  handleNext: Function
}

export default function FormDadosContrato(props: Props) {
  const {dadosUsuario} = useDadosUsuario()
  const {planoEscolhido} = useSimulacao();

  const [renda, setRenda] = useState<string>(moneyMask(dadosUsuario?.rendaMensal || '0'))

  const form = useFormik<IDadosUsuario>({
    initialValues: {
      nome: dadosUsuario?.nome || '',
      email: dadosUsuario?.email || '',
      telefone: dadosUsuario?.telefone || '',
      rendaMensal: dadosUsuario?.rendaMensal || '0',
      cpf: dadosUsuario?.cpf || '',
      nascimento: dadosUsuario?.nascimento || '',
      termos: false,
    },
    validationSchema: yup.object({
      nome: yup.string().test((name, { createError, path }) => {
        const nomeCompleto = !!name && name?.split(' ').filter(nome => nome).length > 1
        return nomeCompleto || createError({path, message: 'Informe seu nome e sobrenome'})
      }).required(campoObrigatorio),
      telefone: yup.string().min(10, deveTerXCaracteres(10)).max(20).required(campoObrigatorio),
      email: yup.string().min(10, deveTerXCaracteres(10)).email(emailInvalido).required(campoObrigatorio),
      rendaMensal: yup.string().required(campoObrigatorio),
      termos: yup.boolean().isTrue(termosObrigatorios),
      cpf: yup.string().min(14, deveTerXCaracteres(11)).required(campoObrigatorio),
      nascimento: yup.string().test('more-than-18-years', 'Deve ser maior de 18 anos', function (value) {
        return EMaiorDe18Anos(value);
      }).min(10, deveTerXCaracteres(10)).typeError('Data inválida').required(campoObrigatorio),
    }),
    onSubmit: (values) => {
      useDadosUsuario.setState({dadosUsuario: {...dadosUsuario, ...values}})
      props.handleNext()
    }
  })

  function setRendaMensal(valor: string){
    const renda = valor.replace(/[^0-9]/g, '') || '0'
    form.setFieldValue('rendaMensal', renda)
    setRenda(moneyMask(renda))
  }

  useEffect(() => {
    //força mostrar erros dos campos na apresentação da página
    Object.keys(form.values).forEach(field => {
      console.log(field, 'campo');
      form.setFieldTouched(field, true, true)
    });
  }, []);
  
  return (
    <form onSubmit={form.handleSubmit}>
      <Card variant="outlined" sx={{textAlign:'left', mt:2}}>
        <CardHeader 
          sx={{p:0, mb:4}}
          title="Dados do contrato"
        />
      <CardContent sx={{pt:2, p:0}}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="nome"
              name="nome"
              label="Nome Completo"
              fullWidth
              variant="standard"
              placeholder="Seu nome"
              focused
              color="secondary"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.nome}
              inputProps={{ maxLength: 60, inputMode: 'text' }}
              error={form.touched.nome && !!form.errors.nome}
            />
            {form.touched.nome && form.errors.nome ? (
              <div style={{ color: 'red', fontFamily: theme.typography.fontFamily, fontSize: theme.typography.fontSize  }}>{form.errors.nome}</div>
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Qual o seu melhor email?"
              fullWidth
              variant="standard"
              placeholder="email@email.com"
              color="secondary"
              focused
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.email}
              error={form.touched.email && !!form.errors.email}
            />
            {form.touched.email && form.errors.email ? (
              <div style={{ color: 'red', fontFamily: theme.typography.fontFamily, fontSize: theme.typography.fontSize  }}>{form.errors.email}</div>
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              name="telefone"
              id="celular"
              label="Qual o seu celular?"
              fullWidth
              variant="standard"
              placeholder="(00) 00000 0000"
              color="secondary"
              focused
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={phoneMask(form.values.telefone)}
              error={form.touched.telefone && !!form.errors.telefone}
            />
            {form.touched.telefone && form.errors.telefone ? (
              <div style={{ color: 'red', fontFamily: theme.typography.fontFamily, fontSize: theme.typography.fontSize  }}>{form.errors.telefone}</div>
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="renda"
              name="rendaMensal"
              label="Qual o sua renda mensal?"
              fullWidth
              variant="standard"
              placeholder="R$ 0,00"
              color="secondary"
              focused
              onChange={(e) => setRendaMensal(e.target.value)}
              onBlur={form.handleBlur}
              value={renda}
              error={form.touched.rendaMensal && !!form.errors.rendaMensal}
            />
            {form.touched.rendaMensal && form.errors.rendaMensal ? (
              <div style={{ color: 'red', fontFamily: theme.typography.fontFamily, fontSize: theme.typography.fontSize  }}>{form.errors.rendaMensal}</div>
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="cpf"
              name="cpf"
              label="CPF"
              fullWidth
              variant="standard"
              placeholder="Digite seu número de CPF"
              color="secondary"
              focused
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={formataMascaraCPF(form.values.cpf)}
              error={form.touched.cpf && !!form.errors.cpf}
            />
            {form.touched.cpf && form.errors.cpf ? (
              <div style={{ color: 'red', fontFamily: theme.typography.fontFamily, fontSize: theme.typography.fontSize  }}>{form.errors.cpf}</div>
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="nascimento"
              name="nascimento"
              label="Data de nascimento"
              fullWidth
              variant="standard"
              placeholder="DD/MM/AAAA"
              color="secondary"
              focused
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={formataData(form.values.nascimento)}
              error={form.touched.nascimento && !!form.errors.nascimento}
              inputProps={{ maxLength: 10 }}
            />
            {form.touched.nascimento && form.errors.nascimento ? (
              <div style={{ color: 'red', fontFamily: theme.typography.fontFamily, fontSize: theme.typography.fontSize  }}>{form.errors.nascimento}</div>
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{fontSize:'.65rem', color:'#808080',m:0, pb:1}}>
              Para a contratação do consórcio é necessário ter a idade mínima de 18 anos.
            </Typography>
          </Grid>
          <Grid item xs={1}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="termos" value={form.values.termos}  onChange={form.handleChange}/>}
            label=""
          />
          </Grid>
          <Grid item xs={11}>
                <Typography sx={{fontSize:'.65rem', color:'#808080', pl:'30px',m:0, pb:1, pt:'15px'}}>
                  Li e aceito os <a href='https://www.mycon.com.br/termos-de-uso' className='links' target='_blank'>Termos de uso</a> e <a href='https://www.mycon.com.br/politica-de-privacidade' className='links' target='_blank' >Política de Privacidade</a>.
                </Typography>
            {form.touched.termos && form.errors.termos ? (
            <div style={{ color: 'red', fontFamily: theme.typography.fontFamily, fontSize: theme.typography.fontSize  }}>{form.errors.termos}</div>
            ) : null}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    <Box>
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 3, ml: 0 , mb:0, width:'100%'}}
        disabled={!form.isValid}
      >
        Continuar
      </Button>
    </Box>
  </form>
  );
}
