
import React, { useState } from 'react'
import AppBarComponent from '../AppBarComponent/AppBarComponent'
import { Grid, Button, TextField, Typography } from '@mui/material'
import LoadModal from '../../Customer/LoadModal';
import axios from 'axios';
import { BASE_URL } from '../../Data/APIdata';
import { useParams, useNavigate } from 'react-router-dom';
const ResetPwd = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate(); 
    const {id , token} = useParams();
    const [pwd, setPwd] = useState("");
    const [pwd2, setPwd2] = useState("");
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false);
    
    const handleClose = () => setOpen(false);  

    const handleResetPwd = async (e) => {
        e.preventDefault();
        setOpen(true); 
        if(pwd === pwd2){
        try{
        const response = await axios.post(`${BASE_URL}/user/reset-pwd/${id}/${token}`, {password : pwd});
        //console.log(response) 
        if(response.status === 200) {
            setOpen(false); 
            window.alert(`Password Reset`, response.data.message)
            navigate('/' ,{ replace: true })
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
        else {
            setOpen(false); 
            window.alert(`Passwrds do not match`)

        }

    }
  return (
    <>
    <AppBarComponent />
    <LoadModal open={open} handleClose={handleClose} />
    <Typography variant='h6' fontFamily={'serif'} m={1}>Reset Password: </Typography>
    <Grid container justifyContent={'center'} alignItems={'center'} 
    padding={'2rem'}>
        <Grid item xs={12} sm={10} md={6} lg={5} xl={4}>
        <form onSubmit={handleResetPwd} style={{marginTop: '1rem'}}>
             <TextField label = "New Password" variant="outlined" fullWidth 
                sx={{ m: 1, bgcolor: 'white' }} 
                placeholder='Enter Password'
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                inputProps={{ minLength:8, maxLength: 50 }}
                type="password" 
                name="pwd"
                required></TextField>
             <TextField label = "Confirm New Password" variant="outlined" fullWidth 
                sx={{ m: 1, bgcolor: 'white' }} 
                placeholder='Confirm Password'
                value={pwd2}
                onChange={(e) => setPwd2(e.target.value)}
                inputProps={{ minLength:8, maxLength: 50 }}
                type="password" 
                name="pwd2"
                required></TextField>
                              
                 <Button type='submit' variant='contained' 
                 color='success' 
                 size='medium' sx={{m: 1 }} >
                    Confirm
                 </Button>
          </form>
         
        </Grid>
    </Grid>

    </>
  )
}

export default ResetPwd;
