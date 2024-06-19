
import React, { useRef, useState } from 'react'
import AppBarComponent from '../AppBarComponent/AppBarComponent'
import { Typography, Stack, Grid, Paper, TextField, Button } from '@mui/material'
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import emailjs from '@emailjs/browser'
import { useNavigate } from 'react-router-dom';


const About = () => {
  const form = useRef();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [msg, setMsg] = useState("")
  const navigate = useNavigate()

  const serviceID = process.env.REACT_APP_SERVICE_ID
  const templateID = process.env.REACT_APP_TEMPLATE_ID
  const apiKey = process.env.REACT_APP_PUBLIC_KEY

  const handleSubmit = (e) => {
     e.preventDefault(); 

     emailjs.sendForm("service_j2lgrrd", "template_zxfciyi", form.current, 'EO8c85wJ8CjYG5RtU')
     .then((result) => {
         //console.log(result.text);
         window.alert("Thank you for contacting us!")
         navigate('/')
     }, (error) => {
         console.log(error.text);
     });

  }
  return (
    <>
    <AppBarComponent />

     <Grid container justifyContent={'center'} alignItems={'center'} p={2} mt={'5rem'}>
        <Grid item xs={12} sm={10} md={8} lg={6} xl={4} component={Paper}>
        <div>
      <Stack sx={{  justifyContent: 'center', alignItems: 'center' }} py={'1rem'}>
                
                    <Typography variant='h5' mt={'1rem'}
                    fontFamily={'cursive'} 
                    className="txt-shadow animate__animated animate__rubberBand animate__repeat-3">
                      Welcome to CleanLife !</Typography>
                    <Typography variant='subtitle'  p={'1rem'}
                     fontFamily={'revert'}
                    fontWeight={500}>An Eco-friendly GREEN initative with low energy consumption appliances for your home needs!</Typography>
            </Stack>
            <Typography variant='body1' color={'primary'} sx={{textDecoration: 'underline'}}> <InboxIcon fontSize='small' color='primary'/> cleanlifeISO9000@outlook.com </Typography>
        </div> 
        <Stack gap={2} my={'2rem'}> 

          <Typography variant='h6' color={'primary'}
          textAlign={'left'} marginLeft={'3rem'}>
            <MailIcon fontSize='medium' color='primary' sx={{mx :1 }}/>
             Contact us: 
          </Typography>
          <form ref={form} onSubmit={handleSubmit}>
          <Stack gap={2} my={'2rem'} px={'3rem'}> 
             <TextField variant='outlined'
             label={'Name'}
             type='text'
             name="user_name"
             placeholder= 'Your Name'
             onChange={(e) => setName(e.target.value)}
             required>
             </TextField>

             <TextField variant='outlined'
             label={'Email'}
             type='email'
             name='user_email'
             placeholder= 'Your Email'
             onChange={(e) => setEmail(e.target.value)}
             required>
             </TextField>

             <TextField variant='outlined'
             label={'Message'}
             type='text'
             placeholder= 'Your Message'
             name="message"
             onChange={(e) => setMsg(e.target.value)}
             multiline
             required>
             </TextField> 

             <Button type='submit' variant='contained'>
               Send
             </Button>

             </Stack>
          </form>
          </Stack>
        </Grid>
     </Grid>
    
    </>
  )
}

export default About
