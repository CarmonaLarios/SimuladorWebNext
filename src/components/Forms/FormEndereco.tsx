import * as React from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { enderecoPorCep } from '@/app/services/ChatBotService';
import {useFormik} from 'formik'
import { IEndereco } from '@/app/models/SimulacaoDadosIniciais';
import Endereco from '@/app/models/Endereco';
import { useDadosUsuario } from '@/app/hooks/dadosUsuario';
import { Button } from '@mui/material';
import { useSimulacao } from '@/app/hooks/simulacao';
import DadosContrato from '@/app/models/DadosContrato';
import { PropostaApi } from '@/app/services/proposta';
import * as yup from 'yup';
import { campoObrigatorio, deveTerXCaracteres, termosObrigatorios } from '@/app/consts/message-consts';
import { formataCEP } from '@/app/utils/utils';
import theme from '@/theme';

interface Props {
  handleNext: Function
}

export default function FormEndereco(props: Props) {
  const {planoEscolhido} = useSimulacao()
  const {autenticacao, dadosUsuario, empresaId, actions} = useDadosUsuario()

  const form = useFormik<IEndereco>({
    initialValues: {
      logradouro: dadosUsuario?.endereco?.logradouro || '',
      numero: dadosUsuario?.endereco?.numero || '',
      complemento: dadosUsuario?.endereco?.complemento || '',
      cidade: dadosUsuario?.endereco?.cidade || '',
      estado: dadosUsuario?.endereco?.estado || '',
      bairro: dadosUsuario?.endereco?.bairro || '',
      cep: dadosUsuario?.endereco?.cep || ''
    },
    validationSchema: yup.object({
      logradouro: yup.string().min(5, deveTerXCaracteres(5)).required(campoObrigatorio),
      numero: yup.string().min(1, deveTerXCaracteres(1)).required(campoObrigatorio),
      cidade: yup.string().min(5, deveTerXCaracteres(5)).required(campoObrigatorio),
      estado: yup.string().min(2, deveTerXCaracteres(2)).required(campoObrigatorio),
      bairro: yup.string().min(5, deveTerXCaracteres(5)).required(campoObrigatorio),
      cep: yup.string().min(8, deveTerXCaracteres(8)).required(campoObrigatorio)
    }),
    onSubmit: (endereco) => {
      const cep = endereco.cep
      actions.salvarEndereco({...endereco, cep: cep.replaceAll('-', '')})
      criarProposta(endereco)
    }
  })

  function criarProposta(endereco: IEndereco){
    const contrato: Partial<DadosContrato> = {
      ...dadosUsuario!,
      nomeRazao: dadosUsuario?.nome,
      rendaMensal: +dadosUsuario?.rendaMensal!/100,
      cpfCnpj: dadosUsuario?.cpf,
      leadId: autenticacao?.LeadID,
      empresaId: empresaId,
      tipoPessoa: 0,
      bemId: planoEscolhido?.BemID,
      planoId: planoEscolhido?.PlanoID,
      planoMeses: planoEscolhido?.PlanoMeses,
      telefoneCelular: dadosUsuario?.telefone,
      ...endereco
    };
    
    PropostaApi.enviarProposta(contrato).then(response => {
      useSimulacao.setState({proposta: response.data})
      props.handleNext()
    })
  }

  const buscaEnderecoPorCep = async (cep: string) => {
    let endereco: Endereco = await enderecoPorCep(cep?.replace(/\D/g, ''));
    const dados: IEndereco = {
      logradouro: endereco.Logradouro,
      numero: endereco.Numero,
      complemento: endereco.Complemento,
      cidade: endereco.Cidade,
      estado: endereco.Estado,
      bairro: endereco.Bairro,
      cep: endereco.Cep
    }
    form.setValues(dados)
  }

  return (
    <form onSubmit={form.handleSubmit}>
    <Card variant="outlined" sx={{textAlign:'left', mt:2}}>
      <CardHeader 
        sx={{p:0, mb:4}}
        title="Endereço"
      />
    <CardContent sx={{pt:2, p:0}}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="cep"
            name="cep"
            label="CEP"
            fullWidth
            variant="standard"
            placeholder="12345-678"
            focused
            color="secondary"
            onChange={form.handleChange}
            value={formataCEP(form.values.cep)}
            onBlur={form.handleBlur}
            error={form.touched.cep && !!form.errors.cep}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => buscaEnderecoPorCep(form.values.cep)}
                    edge="end"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {form.touched.cep && form.errors.cep ? (
            <div style={{ color: 'red', fontFamily: theme.typography.fontFamily, fontSize: theme.typography.fontSize  }}>{form.errors.cep}</div>
          ) : null}
        </Grid>
        <Grid item xs={12}>
          <TextField
              required
              id="endereco"
              name="logradouro"
              label="Endereço"
              fullWidth
              variant="standard"
              placeholder="Avenida Brasil"
              color="secondary"
              focused
              onChange={form.handleChange}
              value={form.values.logradouro}
              onBlur={form.handleBlur}
              error={form.touched.logradouro && !!form.errors.logradouro}
            />
            {form.touched.logradouro && form.errors.logradouro ? (
              <div style={{ color: 'red', fontFamily: theme.typography.fontFamily, fontSize: theme.typography.fontSize  }}>{form.errors.logradouro}</div>
            ) : null}
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="numero"
            name="numero"
            label="Número"
            fullWidth
            variant="standard"
            placeholder="1234"
            color="secondary"
            focused
            onChange={form.handleChange}
            value={form.values.numero}
            onBlur={form.handleBlur}
            error={form.touched.numero && !!form.errors.numero}
          />
          {form.touched.numero && form.errors.numero ? (
            <div style={{ color: 'red', fontFamily: theme.typography.fontFamily, fontSize: theme.typography.fontSize  }}>{form.errors.numero}</div>
          ) : null}
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="complemento"
            name="complemento"
            label="Complemento"
            fullWidth
            variant="standard"
            color="secondary"
            focused
            onChange={form.handleChange}
            value={form.values.complemento}
            onBlur={form.handleBlur}
          />
          {form.touched.complemento && form.errors.complemento ? (
            <div style={{ color: 'red', fontFamily: theme.typography.fontFamily, fontSize: theme.typography.fontSize  }}>{form.errors.complemento}</div>
          ) : null}
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="bairro"
            name="bairro"
            label="Bairro"
            fullWidth
            variant="standard"
            color="secondary"
            focused
            onChange={form.handleChange}
            value={form.values.bairro}
            onBlur={form.handleBlur}
            error={form.touched.bairro && !!form.errors.bairro}
          />
          {form.touched.bairro && form.errors.bairro ? (
            <div style={{ color: 'red', fontFamily: theme.typography.fontFamily, fontSize: theme.typography.fontSize  }}>{form.errors.bairro}</div>
          ) : null}
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="cidade"
            name="cidade"
            label="Cidade"
            fullWidth
            variant="standard"
            placeholder="São Paulo"
            color="secondary"
            focused
            onChange={form.handleChange}
            value={form.values.cidade}
            onBlur={form.handleBlur}
            error={form.touched.cidade && !!form.errors.cidade}
          />
          {form.touched.cidade && form.errors.cidade ? (
            <div style={{ color: 'red', fontFamily: theme.typography.fontFamily, fontSize: theme.typography.fontSize  }}>{form.errors.cidade}</div>
          ) : null}
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="estado"
            name="estado"
            label="Estado"
            fullWidth
            variant="standard"
            placeholder="São Paulo"
            color="secondary"
            focused
            onChange={form.handleChange}
            value={form.values.estado}
            onBlur={form.handleBlur}
            error={form.touched.estado && !!form.errors.estado}
          />
          {form.touched.estado && form.errors.estado ? (
            <div style={{ color: 'red', fontFamily: theme.typography.fontFamily, fontSize: theme.typography.fontSize  }}>{form.errors.estado}</div>
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
          >
          Continuar
      </Button>
  </Box>
  </form>
  );
}
