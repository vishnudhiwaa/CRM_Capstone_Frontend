
import React, { useState } from 'react'
import {Box, Grid, Tab, Paper} from '@mui/material';
import {TabContext, TabList, TabPanel} from '@mui/lab';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Signup from './Signup';
import Login from './Login';

const AuthForm = () => {

    const [taboption, setTabOption] = useState('1');

    const handleTabChange = (e, newval) => {
        setTabOption(newval)
    }
  return (
    <Box >
        <Grid container >
            <Grid item xs={12} sm={10} md={10} lg={8} xl={8} mx={'auto'}
            sx={{border: '1px solid #ccc', borderRadius: '10px'}} 
            py={'2rem'}
            component={Paper} 
            overflow={'auto'}>
                <TabContext value={taboption} >
                <Box sx={{borderBottom: 1, borderColor: 'divider', overflowX:'auto'}} >
                    <TabList aria-label='Tabs option' 
                    onChange={handleTabChange}  >
                    <Tab label='Login' value='1' sx={{width: '50%'}} icon={<LoginIcon /> 
                }       iconPosition='start'/>
                    <Tab label='Signup' value='2'  sx={{width: '50%'}} icon={<PersonAddIcon /> 
                }       iconPosition='start'/>
                    </TabList>
                </Box>
                <TabPanel value='1'>
                    <Login />
                </TabPanel>
                <TabPanel value='2'>
                    <Signup />
                </TabPanel>
                </TabContext>
            </Grid>
        </Grid>
    </Box>
  )
}

export default AuthForm
