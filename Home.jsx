
import React from 'react'
import AuthForm from './AuthComponents/AuthForm'
import { Box,  Grid, Paper, Stack, Typography } from '@mui/material'
import AppBarComponent from './AppBarComponent/AppBarComponent'
import Base from './Base'
import 'animate.css';

const Home = () => {
  return (
    <> 
    <AppBarComponent /> 
    <Base> 
        <Stack sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none'  }, 
            justifyContent: 'center', alignItems: 'center' }} py={'1rem'}>
                
                    <Typography variant='h5' padding={'1rem'}
                    fontFamily={'cursive'} 
                    className="txt-shadow animate__animated animate__bounce animate__repeat-3	">
                      Welcome to CleanLife !</Typography>
                    <Typography variant='subtitle'
                    fontWeight={600}>An Eco-friendly GREEN initative with low energy consumption appliances for your home needs!</Typography>
            </Stack>
       <Grid container mt={'1rem'}> 
        <Grid item xs={12} sm={10} md={6} lg={5} xl={6} mx={'auto'}
                sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex'  } }}
                px={'2rem'}
                >
            <Stack sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex'  }, 
            justifyContent: 'center', alignItems: 'center' }}>
                    <img width={'90%'} height={'90%'} 
                    style={{borderRadius : '10px'}} src="https://res.cloudinary.com/dvbxa44e9/image/upload/v1692542253/appCRM/iyi94lfcwq3iytrdqjcg.jpg" alt="CleanLife"></img>
                    
                    <Typography variant='h5' padding={'1rem'}
                    fontFamily={'cursive'}
                    className="txt-shadow animate__animated animate__bounce animate__repeat-3	">
                      Welcome to CleanLife !</Typography>
                    <Typography variant='subtitle'
                    fontWeight={600}>An Eco-friendly GREEN initative with low energy consumption appliances for your home needs!</Typography>
            </Stack>
        </Grid> 
        <Grid item xs={12} sm={10} md={6} lg={7} xl={6} mx={'auto'} 
                px={'2rem'} >
                    <AuthForm />
        </Grid>

        </Grid>
    </Base>
    </>
  )
 
}

export default Home
