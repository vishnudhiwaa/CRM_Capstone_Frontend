
import React, { useState } from 'react'
import AppBarComponent from '../AppBarComponent/AppBarComponent'
import { Grid, Button, TextField, Paper, Typography } from '@mui/material'
import LoadModal from '../../Customer/LoadModal';
import axios from 'axios';
import { BASE_URL } from '../../Data/APIdata';
import { useNavigate } from 'react-router-dom';
const ForgotPwd = () => {
    const [email, setEmail] = useState();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const handleClose = () => setOpen(false);  

    const handleForgotPwd = async (e) => {
        e.preventDefault();
        setOpen(true); 
        try{
        const response = await axios.post(`${BASE_URL}/user/forgotpwd`, {email : email});
        //console.log(response) 
        if(response.status === 200) {
            setOpen(false); 
            window.alert(`Reset Link senk`, response.data.message)
            navigate('/', { replace: true })
        }
        else if(response.status === 400) {
            setOpen(false); 
            window.alert(`Error occured`, response.data.message)
        }

        }
        catch(error){
            console.log(error, error.message);
            setOpen(false); 
            window.alert(`Error occured`)
           }

    }
  return (
    <>
    <AppBarComponent />
    <LoadModal open={open} handleClose={handleClose} /> 
    <Typography variant='h6' fontFamily={'serif'} m={1}>Forgot Password: </Typography>
    <Grid container justifyContent={'center'} alignItems={'center'} 
    padding={'2rem'}>
        <Grid item xs={12} sm={10} md={6} lg={5} xl={4} 
        component={Paper}>
        <form onSubmit={handleForgotPwd} style={{marginTop: '1rem', padding: '1rem'}} >
             <TextField label = "email" variant="outlined" fullWidth 
                sx={{ m: 1, bgcolor: 'white' }} 
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                inputProps={{ maxLength: 50 }}
                multiline
                type="email" 
                name="email"
                required></TextField>
                              
                 <Button type='submit' variant='contained' 
                 color='success' 
                 size='medium' sx={{m: 1 }} >
                    Get Password Reset link
                 </Button>
          </form>
         
        </Grid>
    </Grid>

    </>
  )
}

export default ForgotPwd
