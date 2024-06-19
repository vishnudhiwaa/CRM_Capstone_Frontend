
import React, { useState, useEffect } from 'react'
import {  Grid, Stack, Typography,  Divider, Paper,  } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '../../Data/APIdata';
import { useNavigate } from 'react-router-dom';
import { REQUEST_STATUS } from '../Data/statusCode';
import LoadModal from '../../Customer/LoadModal';

const ClosedReq = () => {
    const [requests, setRequests] = useState([]);
     const navigate = useNavigate()
    // Modal
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);  

   
    const getClosedReq = async() => {
        try{
            const token = localStorage.getItem('tokenAuth')
            const email = localStorage.getItem('email')
                //console.log(token, email)
            const config = { headers : {"x-auth-token" : token}}
            const response = await axios.post(`${BASE_URL}/request/get-requests`, 
            {request_engg : email}, config) 
            //console.log(response) 
            if( response.status === 200) {
                 setRequests( response.data.requestsList)
            }
            }
            catch(error){
              console.log(error);
              if( error.response.status === 403) {
                window.alert("Session expired. Login again to continue")
                navigate('/')
            }
          }
          }

    useEffect( () => {
        getClosedReq()
      }, [])


    return (
      <>
      <Typography variant='subtitle1' fontSize={'1.2rem'} 
      fontWeight={500} 
      fontFamily={'fantasy'} 
      my={'1rem'}>Closed Requests</Typography>

      <Divider />
     <Grid container gap={2} justifyContent={'center'} alignItems={'center'}>
      {
        requests.length > 0 && 
        requests.map( r => r.request_status === REQUEST_STATUS.Resolved &&
         <Grid item xs={12} sm={10} md={8} lg={6} xl={4} key={r.requestID}>
        <Stack component={Paper} overflow={'auto'}
            p={'1rem'} key={r.requestID}> 
               <Typography variant='body2' fontWeight={550} fontFamily={'serif'} my={1} 
               sx={{m:1, border: '1px dashed grey'}} > 
                Request ID : {r.requestID} </Typography>
                <Typography variant='body2' fontWeight={550} fontFamily={'serif'} my={1} 
                > Order ID : {r.orderID} </Typography>
                <Typography variant='body2' fontWeight={550} fontFamily={'serif'} >  
                Request status : {r.request_status} </Typography>
                
                <Typography variant='body2' fontWeight={550} fontFamily={'serif'} >  
                Request Date: {r.request_date}</Typography>
                <Typography variant='body2' fontWeight={550} fontFamily={'serif'} my={1}>  
                Summary: {(r.request_summary.join(" ;"))}</Typography>
               
             <Divider />
            </Stack> 
  
     </Grid>
      )}
       <LoadModal open={open} handleClose={handleClose}></LoadModal>
     </Grid>
     </>
  )
}

export default ClosedReq
