
import React, { useState, useEffect } from 'react'
import { Button, Grid, Stack, Typography,  Box , Divider, Paper, Select, MenuItem, InputLabel } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '../../Data/APIdata';
import { useNavigate } from 'react-router-dom';
import { ORDER_STATUS } from '../Data/statusCode';
import LoadModal from '../../Customer/LoadModal';

const PendingOrders = () => {
    const navigate = useNavigate(); 
    const [refresh, setRefresh] = useState(false)
    const [p_OD, setPOD] = useState([]);
    const [ reqOrder, setReqOrder] = useState("")
    const [ status, setStatus] = useState("")
    const [ statusfilter, setStatusFilter] = useState(ORDER_STATUS.Placed)
    const ORDER_STATUS_VALUES = Object.values(ORDER_STATUS)
    const rolesArray = ORDER_STATUS_VALUES.filter( el => el !== ORDER_STATUS.Placed)

    //Modal
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);  
  
    const handleShip = async (e, od) => {
      e.preventDefault();
      setOpen(true)
      const ok = window.confirm(" Do you wish to update this order ?")
      if(ok) {
      try{
        const token = localStorage.getItem('tokenAuth')
        //console.log(token)
        const config = { headers : {"x-auth-token" : token}}
        const response = await axios.post(`${BASE_URL}/orders/update-order`, { orderID : od.orderID, order_status : status}, config)
        //console.log(response) 
        if(response.status === 200){
            handleClose()
            window.alert("Order status Updated")
            setReqOrder("")
            setRefresh(!refresh)
        }
        else {
            setReqOrder("")
           
        }
    }
    catch(error){ 
        console.log("error occured", error)
        setReqOrder("")
        handleClose()
        if( error.response.status === 403) {
            window.alert("Session expired. Login again to continue")
            navigate('/')
        }
        return error
    }
}
    }
    const getPendingOrders = async() => {
      try{
        const token = localStorage.getItem('tokenAuth')
        const email = localStorage.getItem('email')
            // console.log(token, email)
        const config = { headers : {"x-auth-token" : token}}
        const response = await axios.post(`${BASE_URL}/orders/get-orders`, 
        {order_status : { $in : [ORDER_STATUS.Placed, ORDER_STATUS.Shipped, ORDER_STATUS.CancelReq]}}, config) 
        //console.log(response) 
        if( response.status === 200) {
            setPOD( response.data.ordersList)
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
        getPendingOrders()
      }, [refresh])


    return (
     <>
     <LoadModal open={open} handleClose={handleClose}/>
     <Typography variant='subtitle1' fontSize={'1.2rem'} 
            fontWeight={500} 
            fontFamily={'fantasy'} 
            my={'1rem'}>Pending Orders:</Typography>
             <Box my={1} >  
                <InputLabel id="demo-simple-select-label"> Select Order Status</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    variant='standard'
                    id="demo-simple-select"
                    value={statusfilter}
                    label="Select status"
                    onChange={(e) => setStatusFilter(e.target.value)}                    
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
                 p_OD.length > 0 && 
                p_OD.map( od =>     od.order_status === statusfilter  &&        
            <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
            <Stack  component={Paper} overflow={'auto'}
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
                
                <Button variant='contained' color='secondary' 
                onClick ={() => setReqOrder(od.orderID)}> Approve </Button>
                </Box>
            {/* </Stack> */}
            <Divider />
            

    </Stack> 

       {
          ( reqOrder === od.orderID) &&
          <div>
          <form onSubmit={(e) =>handleShip(e, od)} style={{marginTop: '1rem'}}>
          <Box my={1} >  
                <InputLabel id="demo-simple-select-label"> Select Order Status</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    variant='filled'
                    id="demo-simple-select"
                    value={status}
                    label="Select status"
                    onChange={(e) => setStatus(e.target.value)}
                    fullWidth
                    required
                    >
                        {
                            rolesArray.map( (u) => {
                            return <MenuItem key={u} value={u}>{u}</MenuItem>
                            })
                        }
                    </Select>
                </Box> 
                <Button type='submit' variant='contained' 
                 color='success'
                 size='medium' sx={{m: 1 }} >
                    APPROVE
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
     </>
  )
}

export default PendingOrders
