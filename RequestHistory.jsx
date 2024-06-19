
import React, { useState, useEffect } from 'react'
import { BASE_URL } from '../../Data/APIdata';
import axios from 'axios';
import { Grid, Stack, Paper, Typography, Divider } from '@mui/material';
import CustLayout from './CustLayout';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../Redux/Reducers/userReducer';

const RequestHistory = () => {

    const [requests, setRequests] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const getRequests = async() => {
        try{
        const token = localStorage.getItem('tokenAuth')
        const email = localStorage.getItem('email')
            //console.log(token, email)
        const config = { headers : {"x-auth-token" : token}}
        const response = await axios.post(`${BASE_URL}/request/get-requests`, {cust_email : email}, config) 
        // console.log(response) 
        if( response.status === 200) {
            setRequests( response.data.requestsList)
        }
        else if( response.status === 403) {
          //console.log("log in to continue")
          navigate('/')
      }
        }
        catch(error){
          console.log(error);
          dispatch(logoutUser())
          if( error.response.status === 403) {
            window.alert("Session expired. Login again to continue")
            navigate('/')
        }
      }
      }

    useEffect( () => {
        getRequests();
      }, [])

  return (
    <CustLayout>
    <Typography variant='subtitle1' fontSize={'1.2rem'} 
            fontWeight={500} 
            fontFamily={'fantasy'} 
            my={'1rem'}>Request History:</Typography>

            <Divider />

       <Grid container justifyContent={'center'} alignItems={'center'}
        my={'1rem'} p={'1rem'} gap={2}>
  
        {
        requests.length > 0 && 
        requests.map( r => 
          <Grid item xs={12} sm={10} md={8} lg={6} xl={4} key={r.requestID}>
          <Stack borderRadius={'10px'} bgcolor={'white'} component={Paper} overflow={'auto'}
          p={'1rem'} > 
                <Typography variant='body1' fontWeight={550} fontFamily={'serif'} my={1} 
                sx={{m:1, border: '1px dashed grey'}}> 
                Request ID : {r.requestID} </Typography>
                <Typography variant='body1' fontWeight={550} fontFamily={'serif'} >  
                Request status : {r.request_status} </Typography>
                <Typography variant='body1' fontWeight={550} fontFamily={'serif'} >  
                Request Engineer : {r.request_engg} </Typography>
                
                <Typography variant='body1' fontWeight={550} fontFamily={'serif'} >  Request Date: {r.request_date}</Typography>
                <Typography variant='body1' fontWeight={550} fontFamily={'serif'} my={1}>  Summary: {(r.request_summary.join(" ;"))}</Typography>
             <Divider />
            </Stack> 
            </Grid> 
        )}
    </Grid> 
    </CustLayout>
  )
}

export default RequestHistory
