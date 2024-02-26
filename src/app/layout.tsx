
import '../styles/globals.css'
import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';
import { GlobalProvider } from '@/contexts/GlobalContext';
import Image from 'next/image'
import ImageBanner from '../assets/images/banner.png'
import Typography from '@mui/material/Typography';
import { GoogleTagManager } from '@next/third-parties/google'

export const metadata = {
  title: 'Simulador Mycon',
  description: 'Simulador Mycon',
};



export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" className='scroll-smooth'>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any"/>
      </head>
      <body suppressHydrationWarning={true}>
      <GoogleTagManager gtmId="GTM-5LX2TRVR" />
        <GlobalProvider>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Box sx={{display:'flex', justifyContent:'center',}}>
              <Image 
                src={ImageBanner}
                alt="Flausino"
                className='img-banner'
                priority={true}
              />   
                <Grid container sx={{ pt: { xs: 0, sm: 5 }, pb: { xs: 0, sm: 0}, width: {xs:'100%', sm:'85%'}, justifyContent:'space-between'}} >
                  <Grid item xs={12} sm={4}>
                    <div className="text-banner">
                      <Typography variant="h1" component="h1" sx={{color:'#fff', lineHeight:'1', mb:3}}>
                        Comprar seu imóvel ou carro ficou fácil
                      </Typography>
                      <Typography variant="h2" component="h2" sx={{color:'#fff',fontSize:'1rem', lineHeight:'1', fontWeight:'600'}}>
                        Sua conquista sem juros e sem entrada
                      </Typography>
                    </div>
                  </Grid>
                  <Grid xs={12} sm={6} item className='box-out-rounded'>
                  <div className='box-limit'>
                      {children}
                    </div>
                  </Grid>
                </Grid>
              </Box>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}
