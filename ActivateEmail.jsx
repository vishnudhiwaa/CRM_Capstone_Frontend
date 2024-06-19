
import { Button, Stack, Box, TextField } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import LoadModal from '../../Customer/LoadModal'
import { BASE_URL } from '../../Data/APIdata.js';

const ActivateEmail = () => {
  const [email, setEmail] = useState("") 
  const [open, setOpen] = useState(false)
  const navigate = useNavigate();

  const handleClose = () => { setOpen(false)}
  const handleSubmit = async(e) => {
    e.preventDefault();
        setOpen(true);
    try{
     const response = await axios.post(`${BASE_URL}/user/activate-mail`, {email : email})
     //console.log(response);
        if(response.status === 200){
           handleClose()
           window.alert("Success. Check email")
           navigate('/')
         }
     
     else if(response.status === 404)  {
        window.alert("email invalid");
        handleClose()
     }
     else if(response.status === 400)  {
        window.alert("account already activated");
        handleClose()
     }
     
    }
    catch(err){
        console.log("error authorizing");
        console.log(err) 
        handleClose() 
        window.alert("error occured. retry")
        navigate('/')
    }
  }
  return (
    <>
    <LoadModal open={open} handleClose={handleClose} />
    <Stack justifyContent={'center'} alignItems={'center'} my={4}>
    <Box width='250px' >
      <form onSubmit={handleSubmit}>
      <p>Send activation Email</p>
       <Stack gap={2}>
         <TextField type='email' onChange={(e) => setEmail(e.target.value)}
         required></TextField> 

         <Button variant='contained' type='submit'>
          Send
         </Button>
       </Stack>
       </form>
    </Box>
    </Stack>
    </>
  )
}

export default ActivateEmail
