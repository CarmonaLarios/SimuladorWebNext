import * as React from 'react';

import '../../styles/tabs.css';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SlideValorSimulacao from '@/components/Slides/SlideValorSimulacao'
import { GlobalContext } from '@/contexts/GlobalContext';
import TipoPlano from '@/app/enums/TipoPlanoEnum';

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface StyledTabProps {
  label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '14px',
  color: '#3A4256',
  '&.Mui-selected': {
    backgroundColor: '#5451FB',
    color: '#fff',
    borderRadius:'8px',
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#5451FB',
  },
}));

export default function CustomizedTabs() {
  const [value, setValue] = React.useState(0);
  const context = React.useContext(GlobalContext);

  const defineTipoPlano = (tipo: number) => {
    context?.setDadosSimulacao(prev => ({...prev, tipoPlano: TipoPlano[tipo] }))
  }
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    defineTipoPlano(newValue);
  };

  return (
    <Box sx={{ width: '100%'}}>
        <div>
          <Typography variant="h6" component="h6" sx={{m:2}}>
            Simule o plano por
          </Typography>
        </div>
      <Box component="div" sx={{pl:'14px', pr:'14px'}}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="escolha produto" sx={{ bgcolor: '#F9F9FB', borderRadius:'8px' }}>
          <StyledTab label="Crédito" {...a11yProps(0)} sx={{ width: '50%', m:0 }} />
          <StyledTab  label="Parcelas" {...a11yProps(1)} sx={{ width: '50%', m:0 }} />
        </StyledTabs>
      </Box>
      <Box sx={{p:2}}>
        <CustomTabPanel value={value} index={0} >
          <SlideValorSimulacao />
        </CustomTabPanel>
      </Box>
    </Box>
  );
}
