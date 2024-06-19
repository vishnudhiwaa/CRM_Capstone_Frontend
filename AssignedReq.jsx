
import React, { useState, useEffect } from 'react'
import { Button, Grid, Stack, Typography,  Box , Divider, Paper, TextField } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '../../Data/APIdata';
import { useNavigate } from 'react-router-dom';
import { REQUEST_STATUS } from '../Data/statusCode';
import LoadModal from '../../Customer/LoadModal';
import useCTX from '../Context/useCTX';

const AssignedReq = () => {
    const navigate = useNavigate();
    const [a_requests, setA_Requests] = useState([]);
    const {request, setRequest} = useCTX();
    const [ summary, setSummary] = useState("")


    // Modal
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);  


    const closeRequest = async(req) => {
        const ok = window.confirm("Do you want to close request") 
        if(ok) {
            try{
                  const token = localStorage.getItem('tokenAuth')
                  const email = localStorage.getItem('email')
                  const role = localStorage.getItem('role')
                  //console.log(token)
                  const config = { headers : {"x-auth-token" : token}}

                  const response = await axios.post(`${BASE_URL}/request/update-status`, { requestID : req.requestID, request_status: REQUEST_STATUS.Resolved,
                   request_engg: email}, config)
                  //console.log(response) 
                  if(response.status === 200){
                      handleClose()
                      window.alert(" request closed")
                      navigate(`/${role}-dashboard`)
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
    const addSummary = async(e,req) => {
        e.preventDefault();
        setOpen(true)
        const temp = [...req.request_summary] 
        temp.push(summary)
        const ok = window.confirm("Do you want to add summary") 
        if(ok) {
            try{
                  const token = localStorage.getItem('tokenAuth')
                  const email = localStorage.getItem('email')
                  const role = localStorage.getItem('role')
                  //console.log(token)
                  const config = { headers : {"x-auth-token" : token}}

                  const response = await axios.post(`${BASE_URL}/request/update-summary`, { requestID : req.requestID, 
                    request_summary : temp, 
                   request_engg: email}, config)
                  //console.log(response) 
                  if(response.status === 200){
                      handleClose() 
                      setRequest("")
                      window.alert(" Summary added")
                      navigate(`/${role}-dashboard`)
                  }
                  else {
                      
                  }
              }
              catch(error){ 
                  console.log("error occured", error)
                  handleClose()
                  return error
              }
        }

    }

    const getAssignedReq = async() => {
        try{
            const token = localStorage.getItem('tokenAuth')
            const email = localStorage.getItem('email')
              //  console.log(token, email)
            const config = { headers : {"x-auth-token" : token}}
            const response = await axios.post(`${BASE_URL}/request/get-requests`, {request_status : REQUEST_STATUS.Assigned, request_engg : email}, config) 
            //console.log(response) 
            if( response.status === 200) {
                setA_Requests( response.data.requestsList)
            }
            }
            catch(error){
              console.log(error);
          }
          }

    useEffect( () => {
        getAssignedReq()
      }, [])


    return (
        <>
        <Typography variant='subtitle1' fontSize={'1.2rem'} 
        fontWeight={500} 
        fontFamily={'fantasy'} 
        my={'1rem'}>Assigned Requests</Typography>

        <Divider />
     <Grid container gap={2} justifyContent={'center'} alignItems={'center'}> 
      {
        a_requests.length > 0 && 
        a_requests.map( r => 
         <Grid item xs={12} sm={10} md={8} lg={6} xl={4} key={r.requestID}>
        <Stack borderRadius={'12px'}  component={Paper} overflow={'auto'}
            p={'1rem'}> 
               <Typography variant='body2' fontWeight={550} fontFamily={'serif'} my={1} 
               sx={{m:1, border: '1px dashed grey'}} > 
                Request ID : {r.requestID} </Typography>
               <Typography variant='body2' fontWeight={550} fontFamily={'serif'} my={1} 
                > Order ID : {r.orderID} </Typography>
                <Typography variant='body2' fontWeight={550} fontFamily={'serif'} >  
                Request status : {r.request_status} </Typography>
                
                <Typography variant='body2' fontWeight={550} fontFamily={'serif'} >  Request Date: {r.request_date}</Typography>
                <Typography variant='body2' fontWeight={550} fontFamily={'serif'} my={1}>  Summary: {(r.request_summary.join(" ; "))}</Typography>

                <Box my={1}>
                
                 <Button variant='contained' color='primary' sx={{m:1}}
                  onClick={() => closeRequest(r)}> Close </Button> 
                 <Button variant='contained' color='primary' sx={{m:1}}
                  onClick={() => setRequest(r)}> Add Summary </Button> 
                
                </Box> 
                {
                    ( r.requestID === request.requestID) &&
                    <div>
                    <form onSubmit={(e) =>addSummary(e, r)} style={{marginTop: '1rem'}}>
                        <TextField label = "Summary" variant="outlined" fullWidth 
                            sx={{ m: 1, bgcolor: 'white' }} 
                            placeholder='Enter productID and reason for request '
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            inputProps={{ maxLength: 200 }}
                            multiline
                            type="text" 
                            name="Summary"
                            required></TextField>
                                        
                            <Button type='submit' variant='contained' 
                            color='success' 
                            size='medium' sx={{m: 1 }} >
                                Add 
                            </Button>
                    </form> 
                    <Button variant='contained' 
                 color='success' 
                 onClick={ () => setRequest("")}                  
                 size='medium' sx={{m: 1 }} >
                    Exit
                 </Button>
                    </div>
       }

             <Divider />
            </Stack>
     </Grid>
      )}
       <LoadModal open={open} handleClose={handleClose}></LoadModal>
     </Grid>
     </>
  )
}

export default AssignedReq
