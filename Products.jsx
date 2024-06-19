
import React, { useEffect, useState } from 'react'
import AppBarComponent from '../AppBarComponent/AppBarComponent'
import { Grid, Paper, Card, CardMedia, CardContent, Typography,
CardActions, Button } from '@mui/material'
import axios from 'axios'
import { BASE_URL } from '../../Data/APIdata';
import { useDispatch, useSelector } from 'react-redux';
import { allProducts } from '../Redux/Reducers/productsReducer';


const Products = () => {
  
  const dispatch = useDispatch();
  const productsAll = useSelector( state => state.products.productsAll )
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

  useEffect( () => {
    getProducts()
  }, [])

  return (
    <>
    <AppBarComponent />
    <Grid container gap={2} justifyContent={'center'} alignItems={'center'} 
    my={'2rem'} minWidth={'250px'} mt={'5rem'} >
       {
        productsAll.length && 
        productsAll.map( p =>
        <Grid item xs={12} sm={10} md={6} lg={6} xl={4} 
          p={'1rem'} key={p.product_ID} 
          component={Paper}> 
          <img width={'90%'} height={'90%'} 
                    style={{borderRadius : '10px'}} 
                    src= {p.product_pic}
                     alt={p.product_name}></img>
         {/* <Stack key={p.product_ID}> {p.product_ID}</Stack>  */}
         <Card className='gradient-m'  >
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
            className='hoverVio'>
              Price: Rs.{p.product_price}
            </Typography>
            
          </CardContent>
          
        </Card>
      </Grid>

      )}  
    </Grid>
    </>
  )
}

export default Products
