
import React, { useEffect, useState } from 'react'
import {Box, Typography, Table, TableHead, TableBody, TableCell, 
    TableRow, Button, styled, IconButton, Stack, InputLabel, Select, MenuItem } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../Data/APIdata';
import useCTX from  '../Context/useCTX.js'
import { LEAD_STATUS } from '../Data/statusCode';
import MailIcon from '@mui/icons-material/Mail';


export const BoxComponent = styled(Box)`
 width:80%;
 margin: 50px auto;
 
 & > h4 {
     margin-bottom: 20px;
 }
 & > div > table {
    border: 1px solid grey;
 }
 & > div > table > thead {
     background-color : #000;
 }
 & > div > table > thead >tr > th {
     color: #fff;
     font-weight: 600;
     font-size: 14px;
 }
 & > div > table > tbody >tr > td {
     font-size: 14px;
 }
 ` 

const AllLeads = () => {
  
    const [allLeads, setallLeads] = useState([]); 
    const navigate = useNavigate();
    const { setCLead} = useCTX();
    const LEAD_STATUS_VALUES = Object.values(LEAD_STATUS)
    const [status, setStatus] = useState(LEAD_STATUS.Approached)

     useEffect(() => {
        const getData = async() => {
            const token = localStorage.getItem('tokenAuth')
            const email = localStorage.getItem('email')
              //  console.log(token, email)
            const config = { headers : {"x-auth-token" : token}} 
            const response = await axios.post(`${BASE_URL}/leads/get-leads`, 
            {email}, config) 
            //console.log(response.data);
            setallLeads((response.data.leadsList));
        }
        getData();
     },[])

    const updateLead = (id) => {
        const [current] = allLeads.filter( (lead) => lead.lead_id === id)
        setCLead(current)
        navigate('/edit-lead')
    }
    const mailLead = (id) => {
        const [current] = allLeads.filter( (lead) => lead.lead_id === id)
        setCLead(current)
        navigate('/cust-email')
    }
    
  return (
    <BoxComponent> 
        <Stack direction={'row'} 
        sx={{justifyContent: 'space-between'}}
        my={2} flexWrap={'wrap'}>
        <Typography variant='h5'> LEADS  </Typography> 
        <Box >  
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
        <Button variant='contained' size='medium' color='info' onClick={() => navigate('/add-lead')}>
             + ADD</Button>   
        </Stack>
        
        <Box sx={{overflowX : 'auto'}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>lead_id</TableCell>
                        <TableCell>lead_name</TableCell>
                        <TableCell>lead_status</TableCell>
                        <TableCell>lead_source</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>lead_address</TableCell>
                        <TableCell>lead_created</TableCell>
                      
                        <TableCell>Edit</TableCell>
                        <TableCell>Connect</TableCell>
                       
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        allLeads.map( lead => lead.lead_status === status && 
                            <TableRow key={lead.lead_id}>
                            <TableCell>{lead.lead_id}</TableCell>
                            <TableCell>{lead.lead_name}</TableCell>
                            <TableCell>{lead.lead_status}</TableCell>
                            <TableCell>{lead.lead_source}</TableCell>
                            <TableCell>{lead.lead_email}</TableCell>
                            <TableCell>{lead.lead_phone}</TableCell>
                            <TableCell>{lead.lead_address}</TableCell>
                            <TableCell>{lead.lead_created}</TableCell  >
                            <TableCell>
                                <IconButton color='error' 
                                onClick={ () => updateLead(lead.lead_id)}>
                                    <ModeEditIcon />
                                </IconButton>
                                
                            </TableCell>
                            <TableCell>
                                <IconButton color='primary' 
                                onClick={ () => mailLead(lead.lead_id)}>
                                    <MailIcon />
                                </IconButton>
                                
                            </TableCell>
                            
                        </TableRow>  
                         ) 
                    }
                </TableBody>
            </Table>
        </Box>
        
    </BoxComponent>
  )
}

export default AllLeads;
