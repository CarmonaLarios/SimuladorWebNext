import '../styles/loading.css'
import CircularProgress from '@mui/material/CircularProgress';
import Box  from '@mui/material/Box';

export default function Loading(){
    return (
      <Box sx={{}}className="loading-overlay">
      <CircularProgress  color="primary"/>
      </Box>
    )
}