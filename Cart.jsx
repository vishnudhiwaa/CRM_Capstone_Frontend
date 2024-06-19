
import React from 'react';
import { useState } from 'react';
import { Stack, Typography, Avatar, Box, IconButton, Grid, Paper, Divider, Button,
Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { clearCart, decreaseQty, increaseQty, removeItem } from '../../Redux/Reducers/CartReducer';
import LoadModal from '../LoadModal';
import { BASE_URL } from '../../Data/APIdata';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

    const {cart_items, cart_Amount, cart_qty} = useSelector( state => state.cart.cart_data)
    const user = useSelector( state => state.userInfo.user_data)
    const navigate = useNavigate();
    const dispatch = useDispatch(); 
    const [openDialog, setDialogOpen] = useState(false);
    const [place, setPlace] = useState(false);
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState(false);
    const handleClose = () => setOpen(false);  
    const [phone, setPhone] = useState("")
    const [addr, setAddr] = useState("")

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleRemoveItem = (item)  => {
    dispatch(removeItem(item))
    } 
    const handleIncQty = (item)  => {   
        if(item.qty < 4 && item.product_stock >= 5)
          dispatch(increaseQty(item))
    } 
    const handleDecQty = (item)  => {
        if(item.qty > 1)
        dispatch(decreaseQty(item))
    } 

    const handleCreateOrder = async (e) => {
        e.preventDefault(); 
        setPlace(true)
        handleDialogClose(); 
        setOpen(true); 
        const d = new Date();
        const del = new Date();
        del.setDate(del.getDate() + 10);
        let year = d.getFullYear()
        let month = d.getMonth()+1
        let dt = d.getDate()
        const date1 = String(year) + 
                        ( month<10 ? '0'+String(month) : String(month)) + 
                        ( dt<10 ? '0'+String(dt) : String(dt)) 
         year = del.getFullYear()
         month = del.getMonth()+1
         dt = del.getDate()
        const date2 = String(year) + 
                        ( month<10 ? '0'+String(month) : String(month)) + 
                        ( dt<10 ? '0'+String(dt) : String(dt)) 
        
        const order = {
            order_items : cart_items,
            cust_email : user.email,
            cust_phone: phone,
            cust_address: addr,
            order_status: "PLACED",
            order_qty : Number(cart_qty),
            order_amount : Number(cart_Amount),
            order_date : date1,
            order_ETA: date2,
            order_delivered_on: "",
            order_items_rating: []
        }

        //console.log(order)

        try{
            const token = localStorage.getItem('tokenAuth')
            //console.log(token)
            const config = { headers : {"x-auth-token" : token}}
            const response = await axios.post(`${BASE_URL}/orders/create-order`, order, config)
            //console.log(response)
            if(response.status === 200) { 
                window.alert('You order had been placed')
                dispatch(clearCart());
                handleClose()
                navigate('/cust-dashboard')
            }
            }
            catch(error){ 
                console.log("error occured", error)
                handleClose()
                setPlace(false)
                if( error.response.status === 403) {
                    window.alert("Session expired. Login again to continue")
                    navigate('/')
                }
                return error
            }
        
    }
      
    const handleForm = () => {
        handleDialogClose()
        setForm(true);
    }
   return (
    <>
    <LoadModal open={open} handleClose={handleClose}/>

    <Grid container justifyContent={'center'} alignItems={'center'} my={'1rem'} p={'1rem'}>
    <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
    <Stack  component={Paper} overflow={'auto'}
    p={'1rem'} borderRadius={'10px'}> 
            <Typography variant='subtitle1' fontSize={'1.2rem'} fontWeight={500} fontFamily={'fantasy'} my={'1rem'}>Cart Items:</Typography>

            {/* <Stack direction={'row'} gap={5} columnGap={5} minHeight={'100px'} alignItems={'center'}> */}
            <div className='grid-container' key={'header'}>

            <Typography variant='body2' fontWeight={550} fontFamily={'serif'} > Product </Typography>
            <Typography variant='body2' fontWeight={550} fontFamily={'serif'}>  Name</Typography>
           
            <Typography variant='body2' fontWeight={550} fontFamily={'serif'}> In-cart </Typography>
            <Typography variant='body2' fontWeight={550} fontFamily={'serif'}> Amount</Typography>
            <Typography variant='body2' fontWeight={550} fontFamily={'serif'}> Remove </Typography>
            {/* </Stack> */}
            </div>
            <Divider />

      {
        cart_items.length > 0 && 
        cart_items.map( (item , i)=> 
            <>
            <div className='grid-container' key={i}>

            <Avatar sx={{ width: 56, height: 56 }}  alt={item.product_name} src= {item.product_pic} />
            <Typography variant='body2' fontWeight={550} fontFamily={'serif'}>  {item.product_name}</Typography>
            <Stack direction={'row'} key={`$(item.product_ID}-qty`}>
                <IconButton color="primary" aria-label="add to cart"
                onClick={ () => handleIncQty(item)}>
                <AddCircleOutlineIcon />
                </IconButton>
                <Typography variant='body2'>  {item.qty}</Typography>
                <IconButton color="primary" aria-label="remove from cart"
                onClick={ () => handleDecQty(item)}>
                <RemoveCircleOutlineIcon />
                </IconButton>
            </Stack> 
            <Typography variant='body2' fontWeight={550} fontFamily={'serif'}>  {item.total}</Typography>
            <IconButton aria-label="delete" onClick={ () => handleRemoveItem(item)}>
            <DeleteIcon />
            </IconButton>
            </div>
            {/* </Stack> */}
            <Divider />
            </>
            )
      }
       <Typography variant='subtitle1' fontWeight={550} textAlign={'right'} mr={2} my={1} fontFamily={'serif'}> Total Items: {cart_qty}</Typography>
       <Typography variant='subtitle1' fontWeight={550} textAlign={'right'} mr={2} fontFamily={'serif'}> Total Amount: {cart_Amount}</Typography> 
       {
        cart_items.length > 0 &&  
        <Box pt={1}>
             
            <Button  variant='contained' color='success' onClick={handleDialogOpen}>
                Confirm Order
            </Button>
            
        </Box>
       } 
       {
          form && 
          <form onSubmit={handleCreateOrder} style={{marginTop: '1rem'}}>
             <TextField label = "cust_phone" variant="outlined" fullWidth 
                sx={{ m: 1, bgcolor: 'white' }} 
                placeholder='Enter cust_phone '
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text" 
                name="cust_phone"
                required></TextField>
             <TextField label = "cust_address" variant="outlined" fullWidth 
                sx={{ m: 1, bgcolor: 'white' }} 
                placeholder='Enter cust_address '
                value={addr}
                onChange={(e) => setAddr(e.target.value)}
                type="text" 
                multiline
                name="cust_address"
                required></TextField>
                 
                 <Button type='submit' variant='contained' 
                 color='success' disabled={place}
                 size='medium' sx={{m: 1 }} >
                    PLACE ORDER
                 </Button>
          </form>
       }
       <Typography variant='body2' color={'grey'}
       fontStyle={'italic'} my={2}>
        **Maximum quantity per item is 4
       </Typography> 
    </Stack>
    </Grid>
    </Grid> 
            <Dialog
                open={openDialog}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Confirm your order:"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Do you want to place this order?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleDialogClose}>CANCEL</Button>
                <Button onClick={handleForm} autoFocus>
                    YES
                </Button>
                </DialogActions>
            </Dialog>
    </>
  )
}

export default Cart;
