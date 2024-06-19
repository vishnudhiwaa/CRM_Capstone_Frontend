
import React from 'react'
import MktLayout from './MktLayout'
import { Typography, Stack,  TextField, Button } from '@mui/material'
import MailIcon from '@mui/icons-material/Mail';
import emailjs from '@emailjs/browser'
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import useCTX from '../Context/useCTX';

const CustEmail = () => {
    const form = useRef();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [msg, setMsg] = useState("") 
    const navigate = useNavigate()
    const { cLead} = useCTX();

    const handleSubmit = (e) => {
        e.preventDefault(); 
   
        emailjs.sendForm("service_j2lgrrd", "template_0xpjgw6", form.current , 'EO8c85wJ8CjYG5RtU')
        .then((result) => {
            //console.log(result.text);
            window.alert("Mail sent!")
            navigate('/all-leads')
        }, (error) => {
            console.log(error.text);
        });
   
     }

  return (
    <MktLayout>
         <Stack gap={2} my={'2rem'}> 

            <Typography variant='h6' color={'primary'}
            textAlign={'left'} marginLeft={'3rem'}>
            <MailIcon fontSize='medium' color='primary' sx={{mx :1 }}/>
            Send Email: 
            </Typography>
            
            <form ref={form} onSubmit={handleSubmit}>
            <Stack gap={2} my={'2rem'} px={'3rem'} > 
            <TextField variant='outlined'
            label={'Name'}
            type='text'
            name="cust_name"
            value={cLead.lead_name}
            placeholder= 'Customer Name'
            onChange={(e) => setName(e.target.value)}
            required>
            </TextField>

            <TextField variant='outlined'
            label={'Email'}
            type='email'
            name='cust_email'
            value={cLead.lead_email}
            placeholder= 'Customer Email'
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
    </MktLayout>
  )
}

export default CustEmail
