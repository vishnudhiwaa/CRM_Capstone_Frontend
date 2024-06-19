
import React, { useState, useEffect } from 'react'
import { Button, Grid, Stack, Typography,  Box , Divider, Paper, TextField } from '@mui/material';
import LoadModal from '../LoadModal';
import axios from 'axios';
import { BASE_URL } from '../../Data/APIdata';
import { useNavigate } from 'react-router-dom';
import { REQUEST_STATUS } from '../Data/statusCode';
import CustLayout from './CustLayout';
import { useDispatch } from 'react-redux';
import {  logoutUser } from '../Redux/Reducers/userReducer';

const OrderHistory = () => {

    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [ req, setReq] = useState("")
    const [ reqOrder, setReqOrder] = useState("")
    //Modal
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);  
  

    const handleCancelOrder = async (id) => {
                   
          const ok = window.confirm(" Do you wish to cancel this order ?")
          if(ok) {
          try{
            const token = localStorage.getItem('tokenAuth')
            //console.log(token)
            const config = { headers : {"x-auth-token" : token}}
            const response = await axios.post(`${BASE_URL}/orders/cancel-order`, { orderID : id}, config)
            //console.log(response) 
            if(response.status === 200){
                handleClose()
                window.alert("Cancel request placed")
                navigate('/cust-dashboard')
            }
            else {
                setReqOrder("")
                setReq("")
               
            }
        }
        catch(error){ 
            console.log("error occured", error)
            setReqOrder("")
            setReq("")
            handleClose()
            if( error.response.status === 403) {
                dispatch(logoutUser())
                window.alert("Session expired. Login again to continue")
                navigate('/')
            }
            return error
        }
    }

    }
   
    const handleService = async(e, od) => {
        e.preventDefault();
        setOpen(true)
        const d = new Date();
        let year = d.getFullYear()
        let month = d.getMonth()+1
        let dt = d.getDate()
        const date1 = String(year) + 
                        ( month<10 ? '0'+String(month) : String(month)) + 
                        ( dt<10 ? '0'+String(dt) : String(dt)) 
        const request = {
            orderID : od.orderID,
            cust_address: od.cust_address,
            cust_email: od.cust_email,
            cust_phone: od.cust_phone,
            request_date : date1,
            request_engg: "na",
            request_status : REQUEST_STATUS.Pending,
            request_summary: [req]
        }
        try{
              const token = localStorage.getItem('tokenAuth')
              //console.log(token)
              const config = { headers : {"x-auth-token" : token}}
              const response = await axios.post(`${BASE_URL}/request/create-request`, request, config)
            //   console.log(response) 
              if(response.status === 200){
                  handleClose()
                  window.alert("Service Request created")
                  setReqOrder("")
                  navigate('/cust-dashboard')
              }
          }
          catch(error){ 
              console.log("error occured", error)
              handleClose()
              if( error.response.status === 403) {
                window.alert("Session expired. Login again to continue")
                navigate('/')
            }
          }
        
    }
    const getOrders = async() => {
        try{
        const token = localStorage.getItem('tokenAuth')
        const email = localStorage.getItem('email')
           // console.log(token, email)
        const config = { headers : {"x-auth-token" : token}}
        const response = await axios.post(`${BASE_URL}/orders/get-orders`, {cust_email : email}, config) 
        // console.log(response) 
        if( response.status === 200) {
            setOrders( response.data.ordersList)
        }
        else if( response.status === 403) {
            //console.log("log in to continue")
            navigate('/')
        }
        }
        catch(error){
          console.log(error);
          navigate('/')
          dispatch(logoutUser())
      }
      }

    useEffect( () => {
        getOrders()
      }, [])

  return (
    <CustLayout>

     <LoadModal open={open} handleClose={handleClose}/>
     <Typography variant='subtitle1' fontSize={'1.2rem'} 
            fontWeight={500} 
            fontFamily={'fantasy'} 
            my={'1rem'}>Order History:</Typography>

            <Divider />

       <Grid container justifyContent={'center'} alignItems={'center'}
        my={'1rem'} p={'1rem'} gap={2}>
   
            {
                 orders.length > 0 && 
                orders.map( od =>         
            <Grid item xs={12} sm={10} md={8} lg={6} xl={4} key={od.orderID}>
            <Stack borderRadius={'10px'} component={Paper} overflow={'auto'}
            p={'1rem'}> 
   
            <Typography variant='body2' fontWeight={550} fontFamily={'serif'} sx={{m:1, border: '1px dashed grey'}}>  
             ORDER ID: {od.orderID} </Typography>
            <Typography variant='body2' fontWeight={550} fontFamily={'serif'} sx={{m:1, textDecoration: 'underline'}}>  
            ORDER STATUS: {od.order_status}</Typography>
             <Divider />
            
            <div className='grid-container-od' key={od.orderID}>
                  
                    <Typography  sx={{textDecoration: 'underline'}}  variant='body2'fontWeight={550} fontFamily={'serif'} >PRODUCT ID</Typography>
                    <Typography  sx={{textDecoration: 'underline'}} variant='body2'fontWeight={550} fontFamily={'serif'} >NAME</Typography>
                    <Typography  sx={{textDecoration: 'underline'}} variant='body2'fontWeight={550} fontFamily={'serif'} >QTY</Typography>
                    <Typography  sx={{textDecoration: 'underline'}} variant='body2'fontWeight={550} fontFamily={'serif'} >PRICE</Typography>
                   
                { od.order_items.map( (p,idx) => 
                    <>
                    <Typography variant='body2' key={p.product_ID} >{p.product_ID}</Typography>
                    <Typography variant='body2' key={p.product_name}>{p.product_name}</Typography>
                    <Typography variant='body2' key={p.qty}>{p.qty}</Typography>
                    {
                        p.product_discount === 0 ? 
                        <Typography variant='body2' key={`price-${idx}`} >{p.product_price}</Typography>
                        : 
                        <Typography variant='body2' key={`discP-${idx}`} >{p.product_price * (p.product_discount /100)}</Typography>
                    }
                    </> 
                   )}
                </div>
                <div className='grid-container-od' key={`${od.orderID}-tot`}>
                
                <Typography variant='body2' fontWeight={550} fontFamily={'serif'}  >  Order Date: {od.order_date}</Typography>
                <Typography variant='body2' fontWeight={550} fontFamily={'serif'} >  ETA: {od.order_ETA}</Typography>
                <Typography variant='body2' fontWeight={550} fontFamily={'serif'}  >  Qty: {od.order_qty}</Typography>
                <Typography variant='body2' fontWeight={550} fontFamily={'serif'} >  Amount: {od.order_amount}</Typography>
                </div>
                
                
                <Box my={1}>
                { (od.order_status !== "DELIVERED" && od.order_status !== "CANCEL_REQ") &&
                 <Button variant='contained' color='primary' sx={{m:1}}
                onClick={() => handleCancelOrder(od.orderID)}> Cancel Order </Button> }
                <Button variant='contained' color='secondary' 
                onClick ={() => setReqOrder(od.orderID)}> Request Service </Button>
                </Box>
            {/* </Stack> */}
            <Divider />
            

    </Stack> 

       {
          ( reqOrder === od.orderID) &&
          <div>
          <form onSubmit={(e) =>handleService(e, od)} style={{marginTop: '1rem'}}>
             <TextField label = "Request_description" variant="outlined" fullWidth 
                sx={{ m: 1, bgcolor: 'white' }} 
                placeholder='Enter productID and reason for request '
                value={req}
                onChange={(e) => setReq(e.target.value)}
                inputProps={{ maxLength: 200 }}
                multiline
                type="text" 
                name="request_description"
                required></TextField>
                              
                 <Button type='submit' variant='contained' 
                 color='success' 
                 size='medium' sx={{m: 1 }} >
                    PLACE REQUEST
                 </Button>
          </form>
          <Button variant='contained' 
                 color='success' 
                 onClick={ () => setReqOrder("")}                  
                 size='medium' sx={{m: 1 }} >
                    Exit
                 </Button>
          </div>
       }
    </Grid>
         )
        }
    </Grid> 
           
    </CustLayout>
  )
}

export default OrderHistory;
