
import React, { useState, useEffect } from 'react'
import { Button, Grid, Stack, Typography,  Box , Divider, Paper, TextField } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '../../Data/APIdata';
import { useNavigate } from 'react-router-dom';
import { REQUEST_STATUS } from '../Data/statusCode';
import LoadModal from '../../Customer/LoadModal';

const PendingReq = () => {
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    // Modal
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);  


    const attendRequest = async(req) => {
        const ok = window.confirm("Do you want to attend request") 
        if(ok) {
            try{
                  const token = localStorage.getItem('tokenAuth')
                  const email = localStorage.getItem('email')
                  const role = localStorage.getItem('role')

                  //console.log(token)
                  const config = { headers : {"x-auth-token" : token}}

                  const response = await axios.post(`${BASE_URL}/request/update-status`, { requestID : req.requestID, request_status: REQUEST_STATUS.Assigned,
                   request_engg: email}, config)
                  //console.log(response) 
                  if(response.status === 200){
                      handleClose()
                      window.alert(" request assigned")
                      navigate(`/${role}-dashboard`)
                  }
                  else {
                      
                  }
              }
              catch(error){ 
                  console.log("error occured", error)
                  handleClose()
                  if( error.response.status === 403) {
                    window.alert("Session expired. Login again to continue")
                    navigate('/')
                }
                  return error
              }
        }

    }
    const getPendingReq = async() => {
        try{
            const token = localStorage.getItem('tokenAuth')
            const email = localStorage.getItem('email')
                //console.log(token, email)
            const config = { headers : {"x-auth-token" : token}}
            const response = await axios.post(`${BASE_URL}/request/get-requests`, {request_status : REQUEST_STATUS.Pending}, config) 
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
        getPendingReq()
      }, [])


    return (
        <>
        <Typography variant='subtitle1' fontSize={'1.2rem'} 
        fontWeight={500} 
        fontFamily={'fantasy'} 
        my={'1rem'}>Pending Orders:</Typography>

        <Divider />
     <Grid container gap={2} justifyContent={'center'} alignItems={'center'}> 
      {
        requests.length > 0 && 
        requests.map( r => 
         <Grid item xs={12} sm={10} md={8} lg={6} xl={4} key={r.requestID}>
        <Stack borderRadius={'12px'} component={Paper} overflow={'auto'}
            p={'1rem'} key={r.requestID}> 
               <Typography variant='body2' fontWeight={550} fontFamily={'serif'} my={1} 
               sx={{m:1, border: '1px dashed grey'}} > 
                Request ID : {r.requestID} </Typography>
                <Typography variant='body2' fontWeight={550} fontFamily={'serif'} my={1} 
                > Order ID : {r.orderID} </Typography>
                <Typography variant='body2' fontWeight={550} fontFamily={'serif'} >  
                Request status : {r.request_status} </Typography>
                
                <Typography variant='body2' fontWeight={550} fontFamily={'serif'} >  Request Date: {r.request_date}</Typography>
                <Typography variant='body2' fontWeight={550} fontFamily={'serif'} my={1}>  Summary: {(r.request_summary.join(" ;"))}</Typography>

                <Box my={1}>
                
                 <Button variant='contained' color='primary' sx={{m:1}}
                  onClick={() => attendRequest(r)}> Attend </Button> 
                
                </Box>

             <Divider />
            </Stack>
     </Grid>
      )}
       <LoadModal open={open} handleClose={handleClose}></LoadModal>
     </Grid>
     </>
  )
}


export default PendingReq
