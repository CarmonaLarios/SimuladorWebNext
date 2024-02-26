import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Link from 'next/link'
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Step01 from '@/components/Steps/Step01'
import Step02 from '@/components/Steps/Step02'
import Step03 from '@/components/Steps/Step03'
import { PlanosApi } from '@/app/services/planos';
import { useSimulacao } from '@/app/hooks/simulacao';
import { useDadosUsuario } from '@/app/hooks/dadosUsuario';
import { useSteps } from '@/app/hooks/steps';
import { descricaoModalidadePlano } from '@/app/enums/SimulacaoEnum';


const steps = ['Dados do Contrato', 'Endereço', 'Pagamento'];

function getStepContent(step: number, handleNext: Function) {
  switch (step) {
    case 0:
      return <Step01 handleNext={handleNext} />;
    case 1:
      return <Step02 handleNext={handleNext} />;
    case 2:
      return <Step03 />;
    default:
      throw new Error('Passo não encontrado');
  }
}

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const {planoEscolhido, modalidadeParcela} = useSimulacao()
  const {autenticacao} = useDadosUsuario()
  const {currentStep} = useSteps()

  useEffect(() => {
    getDetalhesPlano()
  }, [])

  function getDetalhesPlano(){
    if(autenticacao && planoEscolhido){
      PlanosApi.getDetalhesPlano(autenticacao.LeadID, planoEscolhido?.PlanoID).then(response => {
        let detalhesPlano = response.data;
        detalhesPlano.Descricao = descricaoModalidadePlano(modalidadeParcela)
        useSimulacao.setState({planoDetalhes: detalhesPlano})
      })
    } 
  }

  const handleNext = () => {
    // setActiveStep(prev => prev + 1);
    const current = currentStep + 1
    useSteps.setState({currentStep:current})
  };

  const handleBack = () => {
    // setActiveStep(prev => prev - 1);
    const current = currentStep - 1
    useSteps.setState({currentStep:current})
  };
  
  
  return (
    <>
      <Stepper activeStep={currentStep} sx={{ pt: 3, pb: 5 }}>
        {steps.map((label) => (
          <Step key={label} sx={{
            '& .MuiStepLabel-root .MuiStepIcon-text': {
              fill: '#3A4156', 
            }, 
            '& .MuiStepLabel-root .Mui-completed': {
              color: '#4240FF', 
            },
            '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
              {
                color: '#F2F4F8', 
              },
            '& .MuiStepLabel-root .Mui-active': {
              color: '#F2F4F8', 
            },
            '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
              {
                color: '#3A4156', 
              },
              
            '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
              fill: '#4240FF', 
              fontWeight:'600',
            }, }}>
            <StepLabel />
          </Step>
        ))}
      </Stepper>

      {currentStep === 3 ? (
            <React.Fragment />
          ) : (
            <>

        {getStepContent(currentStep, handleNext)}
        
        <Box sx={{ width:'100%' }}>
          {currentStep !== 0 && (
            <Button  variant="outlined" onClick={handleBack} sx={{ mt:2, ml: 0 , mb:0, width:'100%' }}>
              voltar
            </Button>
          )}

          {currentStep === 0 && (
            <Button variant="outlined" sx={{ mt:2, ml: 0 , mb:0, width:'100%' }} disableElevation component={Link} href='/resultado'>voltar
            </Button>
          )}

        </Box>
        </>
        )}
    </>
  );
}
