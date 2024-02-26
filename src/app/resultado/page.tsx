
"use client";

import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ChatResultado from '@/components/Chat/ChatResultado';
import CardResultados from '@/components/Cards/CardResultado'
import Button from '@mui/material/Button';
import Link from 'next/link'
import Plano, { PlanoPayload } from '../models/Planos';
import { PlanosApi } from '../services/planos';
import { useDadosUsuario } from '../hooks/dadosUsuario';
import { useSimulacao } from '../hooks/simulacao';
import { useRouter } from 'next/navigation';
import { TipoSimulacaoEnum } from '../enums/SimulacaoEnum';
import { ChatSemPlanos } from '@/components/Chat/ChatSemPlanos';
import { Box, Stack } from '@mui/material';

export default function ResultadoPage() {
  const {autenticacao, empresaId, dadosUsuario} = useDadosUsuario()
  const { modalidadeParcela, valorSelecionado, tipoSimulacao} = useSimulacao()
  const [planos, setPlanos] = React.useState<Plano[]>([])
  const route = useRouter()

  const [loading, setLoading] = React.useState<boolean>(true)

  const [showDiv, setShowDiv] = React.useState(false);
  
  React.useEffect(() => {
    getPlanos()

    setTimeout(() => {
      setShowDiv(true);
    }, 6000);
  }, [])

  function getPlanos(){
    if(autenticacao && dadosUsuario){
      setLoading(true)
      const payload: PlanoPayload = {
        leadId: autenticacao.LeadID,
        categoriaId: modalidadeParcela,
        empresaId: empresaId,
        valorCredito: tipoSimulacao === TipoSimulacaoEnum.CREDITO ? valorSelecionado : undefined,
        valorParcela: tipoSimulacao === TipoSimulacaoEnum.PARCELA ? valorSelecionado : undefined,
        valorParcelaIdeal: tipoSimulacao === TipoSimulacaoEnum.PARCELA ? valorSelecionado : undefined,
      }

      PlanosApi.getPlanos(payload).then(response => {
        const renda = +dadosUsuario.rendaMensal/100 // formata centavos
        const permitido = renda * 0.3
        const filtradoPorRenda = response.data.filter(plano => plano.PlanoValorParcela <= permitido && !!plano.BemCredito )
        setPlanos(filtradoPorRenda)
      }).finally(() => setLoading(false))
    }
  }

  function setPlanoEscolhido(plano: Plano){
    useSimulacao.setState({planoEscolhido: plano})
    route.push('/pagamento')
  }

  return (
    <Paper
      sx={{
        p: {xs:1, sm:3},
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        textAlign: 'center',
      }}
    >
      <Grid container >
        <Grid item xs={12}>

          {!loading && !!planos.length && <ChatResultado />}

          {!loading && !planos.length && (
            <Stack>
              <ChatSemPlanos />

              {showDiv && (
                <>
                  <Button
                    variant="contained"
                    sx={{mx:'auto', width:'100%', mb:2, mt: 3}}
                    disableElevation
                    className="textuppercase"
                    component={Link}
                    href='/cadastro'
                    size='small'
                  >
                    Alterar valor da renda
                  </Button>

                  <Button
                    size='small'
                    variant="contained"
                    sx={{mx:'auto', width:'100%', mb:2}}
                    disableElevation
                    className="textuppercase"
                    component={Link}
                    href='/'
                  >
                    Alterar valor do crédito
                  </Button>
                </>
              )}

            </Stack>
            )}

          {planos?.map((p: Plano) => (
            <>
              <CardResultados key={p.PlanoID} 
                planoID={p.PlanoID}
                titulo={p.BemNome}
                credito={p.BemCreditoLabel}
                meses={p.PlanoMeses.toString()}
                parcela={p.PlanoValorParcelaLabel}
                prazo={p.PlanoMeses.toString()}
                onClick={() => setPlanoEscolhido(p)}
              />
            </>
          ))}
        </Grid>
        <Box sx={{mt:1, width:'100%'}}>
                <Button 
                  variant="outlined"
                  sx={{mx:'auto', width:'100%', mb:2}}
                  disableElevation
                  component={Link}
                  href='/planos'
                >
                  voltar
                </Button>
        </Box>
      </Grid>
    </Paper>

  );
}
