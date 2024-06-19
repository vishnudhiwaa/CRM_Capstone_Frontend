
import React from 'react'
import { useState } from 'react';
import {Box, Typography, Button, TextField }  from '@mui/material';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../Redux/Reducers/UserReducer'; 
import { USER_ROLES } from '../../Data/Roles.js';
import { BASE_URL } from '../../Data/APIdata.js';
import LoadModal from '../../Customer/LoadModal';

const Login = () => {

  const dispatch = useDispatch();

   const [user, setUser] = useState({email:"", password:""});
   const navigate = useNavigate();
   const location = useLocation();
   const from = location?.state?.from?.pathname || "/"
   const [open, setOpen] = useState(false)
  const handleClose = () => { setOpen(false)}

   const handleLoginSubmit = async (e) => {
         e.preventDefault();
         setOpen(true)
         try{
          const response = await axios.post(`${BASE_URL}/user/login`, user)
          //console.log(response);
          if(response?.status === 200){
            setUser({email:"", password:""})
            const userdata = response?.data?.userdata;
            const accessToken = response?.data?.accessToken;
            localStorage.setItem("tokenAuth", accessToken);
            localStorage.setItem("email", userdata.email)
            localStorage.setItem("role", userdata.role)
            localStorage.setItem("pic_URL", userdata.pic_URL)
            localStorage.setItem("phone", userdata.phone)
            localStorage.setItem("username", userdata.username)
            dispatch(loginUser(userdata))
            if(userdata.role === USER_ROLES.Customer){
              navigate('/cust-dashboard')
            }
            if(userdata.role === USER_ROLES.Admin){
              navigate('/admin-dashboard')
            }
            if(userdata.role === USER_ROLES.Engineer){
              navigate('/engg-dashboard')
            }
            if(userdata.role === USER_ROLES.Sales){
              navigate('/sales-dashboard')
            }
            if(userdata.role === USER_ROLES.Marketing){
              navigate('/mkt-dashboard')
            }
            
          }
          else{
            handleClose()
            //console.log(response);
          }
         }
         catch(error){
          handleClose()
          console.log(error, error.message);
          setUser({...user, password:""})
          window.alert(`Invalid. Try again`)
         }
   }
  
  return (
        <>
        <LoadModal open={open} handleClose={handleClose} />
        <Box >
            <form onSubmit={handleLoginSubmit} >               
                <TextField label = "Email" variant="outlined" fullWidth sx={{m: 1, bgcolor: 'white' }} 
                placeholder='Enter Email'
                onChange={(e) => setUser({...user, email: e.target.value})}
                type="email" 
                helperText = "Ex: abc@xyz.com"
                value={user.email}
                autoComplete='off'
                required>
                </TextField>
                <TextField label = "Password" variant="outlined" fullWidth sx={{m: 1, bgcolor: 'white' }} 
                placeholder='Enter Password'
                onChange={(e) => setUser({...user, password: e.target.value})}
                type="password" 
                value={user.password}
                required>
                </TextField>
                
                 <Button type='submit' variant='contained' 
                 color='success'
                 size='medium' sx={{m: 1 }} 
                 className="animate__animated animate__headShake animate__delay-5s animate__repeat-3" >
                    LOGIN
                 </Button>
            </form> 
            <Box mt={1}>
            <Link to='/forgot-password' style={{ marginRight: '20px', textAlign: 'left' }}>Forgot Password</Link>
            <Link to='/activate-mail'>Activate Account</Link>
            </Box>
            </Box>
          </>
  )
}

export default Login
