
import React, { useState, useEffect } from 'react'
import {  Grid, Stack, Typography,  Box , Divider, Paper, Select, MenuItem, InputLabel } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '../../Data/APIdata';
import { useNavigate } from 'react-router-dom';
import { ORDER_STATUS } from '../Data/statusCode';

const MonthlyOrders = () => {
    const navigate = useNavigate(); 
    const [ status, setStatus] = useState(ORDER_STATUS.Shipped)
    //const [refresh, setRefresh] = useState(false)
    const [monthlyOD, setMOD] = useState([]);
    const ORDER_STATUS_VALUES = Object.values(ORDER_STATUS)

      const getMonthlyOrders = async() => {
      try{
        const token = localStorage.getItem('tokenAuth')
        const email = localStorage.getItem('email')
            // console.log(token, email)
        const config = { headers : {"x-auth-token" : token}} 
        const d = new Date();
        let year = d.getFullYear()
        let month = d.getMonth()+1
        const pattern  = "^" +  String(year) + 
                        ( month<10 ? '0'+String(month) : String(month)) + ".*"

        const response = await axios.post(`${BASE_URL}/orders/monthly-orders`, 
        {pattern : pattern}, config) 
        //console.log(response) 
        if( response.status === 200) {
            setMOD( response.data.ordersMonthly)
        }
        else if( response.status === 403) {
            navigate('/')
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
        getMonthlyOrders()
      }, [status])


    return (
     <>
     <Typography variant='subtitle1' fontSize={'1.2rem'} 
            fontWeight={500} 
            fontFamily={'fantasy'} 
            my={'1rem'}>Monthly Orders:</Typography>
             <Box my={1} >  
                <InputLabel id="demo-simple-select-label"> Select Order Status</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    variant='standard'
                    id="demo-simple-select"
                    value={status}
                    label="Select status"
                    onChange={(e) => setStatus(e.target.value)}                    
                    required
                    >
                        {
                            ORDER_STATUS_VALUES.map( (u,i) => {
                            return <MenuItem key={i} value={u}>{u}</MenuItem>
                            })
                        }
                    </Select>
                </Box> 

            <Divider />

       <Grid container justifyContent={'center'} alignItems={'center'}
        my={'1rem'} p={'1rem'} gap={2}>
   
            {
                 monthlyOD.length > 0 && 
                monthlyOD.map( od =>  od.order_status === status  &&     
            <Grid item xs={12} sm={10} md={5} lg={4} xl={4} key={od.orderID}>
            <Stack  component={Paper} overflow={'auto'}
            p={'1rem'}> 
   
            <Typography variant='body2' fontWeight={550} fontFamily={'serif'} sx={{m:1, border: '1px dashed grey'}}>  
             ORDER ID: {od.orderID} </Typography>
            <Typography variant='body2' fontWeight={550} fontFamily={'serif'} sx={{m:1, textDecoration: 'underline'}}>  
            ORDER STATUS: {od.order_status}</Typography>
             <Divider />
            
            <div className='grid-container-od' key={`pd-${od.orderID}`}>
                  
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
                
            {/* </Stack> */}
            <Divider />
            
    </Stack> 
    </Grid>
         )
        }
    </Grid> 
     </>
  )
}

export default MonthlyOrders
