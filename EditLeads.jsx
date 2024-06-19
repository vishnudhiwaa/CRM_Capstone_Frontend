
import React, { useState } from 'react'
import {Box, Typography, Button, Stack, Grid, InputLabel, Select, MenuItem, TextField }  from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BoxComponent } from './AllLeads';
import axios from 'axios'
import { BASE_URL } from '../../Data/APIdata';
import { LEAD_STATUS } from '../Data/statusCode';
import LoadModal from '../../Customer/LoadModal';
import useCTX from  '../Context/useCTX.js'

const EditLeads = () => { 
    
    const { cLead} = useCTX();
    const LEAD_STATUS_VALUES = Object.values(LEAD_STATUS)
    const [status, setStatus] = useState(cLead.lead_status)
    
    const [updLead, setupdLead] =  useState(cLead);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleClose = () => { setOpen(false)}

    const handleSubmit = async(e) => {
        e.preventDefault(); 
        setOpen(true);
        
        const lead = {
            lead_id: updLead.lead_id,
            lead_name : updLead.lead_name,
            lead_source : updLead.lead_source,
            lead_status : status,
            lead_email: updLead.lead_email,
            lead_phone: updLead.lead_phone,
            lead_address : updLead.lead_address
        }
        //console.log(lead)
        
        try {
        const token = localStorage.getItem('tokenAuth')
        const email = localStorage.getItem('email')
         //  console.log(token, email)
        const config = { headers : {"x-auth-token" : token}} 
        const response = await axios.post(`${BASE_URL}/leads/update-leads`, 
        lead, config) 
        //console.log(response);
        if(response.status === 200){
            //console.log(response)
            handleClose();
            setupdLead({
                lead_id: "",
                lead_name : "",
                lead_source : "",
                lead_status : "",
                lead_email: "",
                lead_phone: "",
                lead_address : ""
            })
            navigate('/all-leads')
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
            <Typography variant='h5'> UPDATE LEAD  </Typography> 
              
            </Stack>
        <Grid container my={3} columnSpacing={1} rowSpacing={2} 
        justifyContent={'center'} >
            <Grid item xs={12} sm={6} md={6} lg={6} xl={4}>
            <Box  p={1} >
            <form onSubmit={handleSubmit} >
                <TextField label = "lead_name " variant="outlined" fullWidth sx={{ m: 1, bgcolor: 'white' }} 
                placeholder='Enter Name of lead_name'
                onChange={(e) => setupdLead({...updLead, lead_name: e.target.value})}
                type="text" 
                value={updLead.lead_name}
                required>
                </TextField>
                <TextField label = "lead_address" variant="outlined" fullWidth sx={{m: 1, bgcolor: 'white' }} 
                placeholder='Enter lead_address'
                onChange={(e) => setupdLead({...updLead, lead_address: e.target.value})}
                type="text" 
                value={updLead.lead_address}
                required>
                </TextField>
                <TextField label = "lead_source" variant="outlined" fullWidth sx={{m: 1, bgcolor: 'white' }} 
                placeholder='Enter lead_source'
                value={updLead.lead_source}
                onChange={(e) => setupdLead({...updLead, lead_source: e.target.value})}
                type="text" 
                required>
                </TextField>

                <TextField label = "lead_email" variant="outlined" fullWidth sx={{m: 1, bgcolor: 'white' }} 
                placeholder='Enter lead_email '
                value={updLead.lead_email}
                onChange={(e) => setupdLead({...updLead, lead_email: e.target.value})}
                type="email" 
                >
                </TextField>
                <TextField label = "lead_phone" variant="outlined" fullWidth sx={{m: 1, bgcolor: 'white' }} 
                placeholder='Enter lead_phone '
                value={updLead.lead_phone}
                onChange={(e) => setupdLead({...updLead, lead_phone: e.target.value})}
                type="text" 
                >
                </TextField> 

                <Box my={1} >  
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    variant='filled'
                    id="demo-simple-select"
                    value={status}
                    label="Select Status"
                    onChange={(e) => setStatus(e.target.value)}
                    fullWidth
                    required
                    >
                        {
                            LEAD_STATUS_VALUES.map( (u) => {
                            return <MenuItem key={u} value={u}>{u}</MenuItem>
                            })
                        }
                    </Select>
                </Box> 
                 
                 <Button type='submit' variant='contained' size='medium' sx={{m: 1 }} >
                    Update
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

export default EditLeads
