import '../../styles/tabs.css'
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import { useSimulacao } from '@/app/hooks/simulacao';
import { TipoSimulacaoEnum } from '@/app/enums/SimulacaoEnum';

const MyconSlider = styled(Slider)({
    color: '#5451FB',
    height: 4,
    '& .MuiSlider-rail': {
        backgroundColor: '#E1E4E9',
        },
    });

export default function SlideValorSimulacao() {
    const { tipoSimulacao, valorSelecionado, actions } = useSimulacao()

    const handleChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            useSimulacao.setState({valorSelecionado: newValue})
        }
    };
    
    return (
        <Box>
            <Box sx={{ pt: 3}}>
                <Typography variant="subtitle1" component="p" sx={{fontWeight:700, fontSize:'.9rem'}}>
                    {tipoSimulacao === TipoSimulacaoEnum.CREDITO ? 'Escolha o valor do crédito:' : 'Escolha o valor da parcela:'}
                </Typography>
                <Typography id="non-linear-slider" gutterBottom variant="subtitle1" component="p" sx={{fontWeight:700, fontSize:'30px'}}>
                    <span>R$</span> {valorSelecionado.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Typography>
            </Box>
            <Box sx={{mt:0, pl:1, pr:1}}>
                <MyconSlider
                sx={{p:0}}
                step={actions.listarLimites().gap}
                value={valorSelecionado}
                onChange={handleChange}
                valueLabelDisplay="off"
                aria-label="Custom marks"
                min={actions.listarLimites().min}
                max={actions.listarLimites().max}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', p:0 }}>
                    <Typography sx={{fontSize:'.8rem',fontWeight:400, color:'#808080'}}>
                        R$ {actions.listarLimites().min.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Typography>
                    <Typography sx={{fontSize:'.8rem',fontWeight:400, color:'#808080'}}>
                        R$ {actions.listarLimites().max.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
