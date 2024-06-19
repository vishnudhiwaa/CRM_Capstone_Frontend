
import React, { useState } from 'react'
import {Box, Typography, Button, Stack, Grid, IconButton, TextField }  from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BoxComponent } from './AllLeads';
import axios from 'axios'
import { BASE_URL } from '../../Data/APIdata';
import { LEAD_STATUS } from '../Data/statusCode';
import LoadModal from '../../Customer/LoadModal';

const AddLead = () => { 
    
    const [newLead, setNewLead] =  useState({
        lead_id: "",
        lead_name : "",
        lead_source : "",
        lead_status : "",
        lead_email: "",
        lead_phone: "",
        lead_created : "",
        lead_address : ""
    });
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleClose = () => { setOpen(false)}

    const handleSubmit = async(e) => {
        e.preventDefault(); 
        setOpen(true);
        const d = new Date();
        let year = d.getFullYear()
        let month = d.getMonth()+1
        let dt = d.getDate()
        const date1 = String(year) + 
                        ( month<10 ? '0'+String(month) : String(month)) + 
                        ( dt<10 ? '0'+String(dt) : String(dt)) 

        const lead = {...newLead, 
            lead_status : LEAD_STATUS.Approached, lead_created : date1 }
        
        try {
        const token = localStorage.getItem('tokenAuth')
        const email = localStorage.getItem('email')
              //  console.log(token, email)
            const config = { headers : {"x-auth-token" : token}} 
        const response = await axios.post(`${BASE_URL}/leads/add-leads`, 
        lead, config) 
        //console.log(response);
        if(response.status === 200){
            //console.log(response)
            handleClose();
            setNewLead({
                lead_id: "",
                lead_name : "",
                lead_source : "",
                lead_status : "",
                lead_email: "",
                lead_phone: "",
                lead_created : "",
                lead_address : ""
            })
            
        }
        else{
            window.alert('Error occured')
        }
      }
      catch(error){
        console.log(error);
        handleClose()
        if( error.response.status === 403) {
          window.alert("Session expired. Login again to continue")
          navigate('/')
      }
    }
}

  return (
    <>
    <LoadModal open={open} handleClose={handleClose} />
    <div>
         <BoxComponent>
         <Stack direction={'row'} 
            sx={{justifyContent: 'space-between'}}
            my={2}>
            <Typography variant='h5'> ADD LEAD  </Typography> 
              
            </Stack>
        <Grid container my={3} columnSpacing={1} rowSpacing={2} 
        justifyContent={'center'} >
            <Grid item xs={12} sm={6} md={6} lg={6} xl={4}>
            <Box  p={1} >
            <form onSubmit={handleSubmit} >
                <TextField label = "lead_name " variant="outlined" fullWidth sx={{ m: 1, bgcolor: 'white' }} 
                placeholder='Enter Name of lead_name'
                onChange={(e) => setNewLead({...newLead, lead_name: e.target.value})}
                type="text" 
                value={newLead.lead_name}
                required>
                </TextField>
                <TextField label = "lead_address" variant="outlined" fullWidth sx={{m: 1, bgcolor: 'white' }} 
                placeholder='Enter lead_address'
                onChange={(e) => setNewLead({...newLead, lead_address: e.target.value})}
                type="text" 
                value={newLead.lead_address}
                required>
                </TextField>
                <TextField label = "lead_source" variant="outlined" fullWidth sx={{m: 1, bgcolor: 'white' }} 
                placeholder='Enter lead_source'
                value={newLead.lead_source}
                onChange={(e) => setNewLead({...newLead, lead_source: e.target.value})}
                type="text" 
                required>
                </TextField>

                <TextField label = "lead_email" variant="outlined" fullWidth sx={{m: 1, bgcolor: 'white' }} 
                placeholder='Enter lead_email '
                value={newLead.lead_email}
                onChange={(e) => setNewLead({...newLead, lead_email: e.target.value})}
                type="email" 
                >
                </TextField>
                <TextField label = "lead_phone" variant="outlined" fullWidth sx={{m: 1, bgcolor: 'white' }} 
                placeholder='Enter lead_phone '
                value={newLead.lead_phone}
                onChange={(e) => setNewLead({...newLead, lead_phone: e.target.value})}
                type="text" 
                >
                </TextField>
                 
                 <Button type='submit' variant='contained' size='medium' sx={{m: 1 }} >
                    Add Lead
                 </Button>
            </form>
            </Box>
            </Grid>
        </Grid>
        </BoxComponent>
    </div>
    </>
  )
}

export default AddLead
