
import React, { useEffect, useState } from 'react'
import { Grid, Paper, Card,  CardContent, Typography,
 Stack, Button, Box } from '@mui/material'
import axios from 'axios'
import { BASE_URL } from '../../Data/APIdata';
import { useDispatch, useSelector } from 'react-redux';
import { allProducts } from '../../Redux/Reducers/ProductsReducer';
import { addItem, removeItem } from '../../Redux/Reducers/CartReducer';
import CustLayout from './CustLayout';


const BuyProducts = () => {
  
  const dispatch = useDispatch();
  const productsAll = useSelector( state => state.products.productsAll ) 
  const [itemSelected, setItemSelected] = useState({})
  // console.log(productsAll)
  const getProducts = async() => {
    try{
    const response = await axios.get(`${BASE_URL}/products/avl-products`) 
    dispatch(allProducts(response?.data?.avlProducts))
    }
    catch(error){
      console.log(error);
  }
  }
   
  const addItemHandler = (item) => {
    const itemToAdd = {
        product_ID : item.product_ID,
        product_name : item.product_name,
        product_price: item.product_price,
        product_stock: item.product_stock,
        product_discount: item.product_discount,
        product_pic : item.product_pic,
        qty : 1
    }
    dispatch(addItem(itemToAdd))
  }

  const removeItemHandler = (item) => {
    const itemToAdd = {
        product_ID : item.product_ID,
        product_name : item.product_name,
        product_price: item.product_price,
        product_stock: item.product_stock,
        product_discount: item.product_discount,
        product_pic : item.product_pic,        
    }
    dispatch(removeItem(itemToAdd))
  }

  useEffect( () => {
    getProducts()
  }, [])

  return (
    <CustLayout>
    <Grid container gap={2} justifyContent={'center'} alignItems={'center'} 
    my={'2rem'} minWidth={'250px'}>
       {
        productsAll.length && 
        productsAll.map( p =>
        <Grid item xs={12} sm={10} md={5} lg={4} xl={4} 
          p={'1rem'} key={p.product_ID} 
          component={Paper}> 
          <img width={'90%'} height={'90%'} 
                    style={{borderRadius : '10px'}} 
                    src= {p.product_pic}
                     alt={p.product_name}></img>
         {/* <Stack key={p.product_ID}> {p.product_ID}</Stack>  */}
         <Card className='gradient-l'  >
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {p.product_name}
            </Typography>
            <Typography variant="body2" color="text.secondary" fontStyle={'oblique'}>
              {p.product_desc}
            </Typography>
            <Typography variant="body2"  pt={'0.5rem'} fontWeight={'550'}>
              Model: {p.product_model}
            </Typography>
            <Typography variant="body2" color="text.primary" py={'0.5rem'} fontWeight={'500'}>
              Warranty: {p.product_warranty}
            </Typography>
            <Typography variant="subtitle1" color="text.primary" 
            border={'1px solid grey'} fontFamily={'sans-serif'} 
            fontWeight={'600'} 
            className= {`hoverVio ${p.product_discount >0 ? 'txt-strike' : ""}`}>
                Price: Rs.{p.product_price}
            </Typography> 
            {  p.product_discount > 0 && 
                <Typography variant="subtitle1" color="text.primary" 
                border={'1px solid grey'} fontFamily={'sans-serif'} 
                fontWeight={'600'}
                className='hoverVio'>
                Discounted Price: Rs.{p.product_price - (p.product_price * (p.product_discount / 100))}
                </Typography>

            }
            
          </CardContent>
          <Box justifyContent={'center'} alignItems={'center'} gap={2} pb={'2rem'}> 
            <Button variant='contained' key={`add-${p.product_ID}`} color="success" sx={{m:1}} disabled={false} onClick={() => addItemHandler(p)} >Add To Cart</Button>
            <Button variant='contained' key={`remove-${p.product_ID}`} color="error" disabled={false} onClick={() => removeItemHandler(p)} > Remove </Button>
          </Box>
        </Card>
      </Grid>

      )}  
    </Grid>
    </CustLayout>
  )
}

export default BuyProducts
