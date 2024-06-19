
import React, { useEffect } from 'react'
import { useState } from 'react';
import {Box,  Button, Paper, TextField, Grid, Typography }  from '@mui/material';
import * as yup from "yup"
import { useFormik } from 'formik' 
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { USER_ROLES } from '../../Data/Roles.js';
import { PRODUCT_TYPE, PRODUCT_STATUS } from '../../Data/ProductType.js';
import AppBarComponent from '../AppBarComponent/AppBarComponent.jsx';
import { BASE_URL } from '../../Data/APIdata.js';

const PRODUCT_TYPE_VALUES = Object.values(PRODUCT_TYPE)
const PRODUCT_STATUS_VALUES = Object.values(PRODUCT_STATUS)

const productSchema = yup.object().shape({
        product_name:yup.string().required("Please enter product name").min(2, 'Too Short!').max(50, 'Too Long!'),
        product_model:yup.string().required("Please enter product model").min(2, 'Too Short!').max(30, 'Too Long!'),
        product_type: yup.string().required("WM, KC, AP,  WP, VC, SP, NEW")
        .oneOf(PRODUCT_TYPE_VALUES, "Not a valid Type - WM, KC, AP,  WP, VC, SP, NEW"),
        product_price: yup.number().positive().required("Please enter price"),
        product_stock: yup.number().required("Please enter price"),
        product_discount: yup.number().required("Please enter price"),
        product_desc:yup.string().required("Please enter description").min(2, 'Too Short!').max(150, 'Too Long!'),
        product_pic:yup.string().required("Please enter pic URL or na").min(2, 'Too Short!').max(100, 'Too Long!'),
        product_color:yup.string().required("Please enter color").min(2, 'Too Short!').max(30, 'Too Long!'),
        product_warranty:yup.string().required("Please enter warranty").min(2, 'Too Short!').max(30, 'Too Long!'),
        product_status:yup.string().required("AVL, NAVL")
        .oneOf(PRODUCT_STATUS_VALUES, "Not a valid Type"),
        launched_yr: yup.string().required("Please enter launched year").min(2, 'Too Short!').max(15, 'Too Long!'),
})

const AddProduct = () => {
    const navigate = useNavigate();

    // form handler - Formik
    const {values, 
        handleChange, 
        handleSubmit,
        handleBlur,
        errors,
        touched } = useFormik({
            initialValues: {
                product_model:"",
                product_name:"",
                product_type: "",
                product_price:0,
                product_stock:0,
                product_discount:0,
                product_desc:"",
                product_pic:"",
                product_color:"",
                product_warranty:"",
                product_status:"",
                launched_yr:""
            },
            validationSchema: productSchema,
            onSubmit: (newProduct) => {
                //console.log(newProduct);
                handleAddProduct(newProduct)
            } 
        })

        const handleAddProduct = async(newProduct) => {
              //console.log(newProduct)
              const token = localStorage.getItem('tokenAuth')
              const config = { headers : {"x-auth-token" : token}}
              const response = await axios.post(`${BASE_URL}/admin/add-product`,{product : newProduct}, config) 
              //console.log(response)
              if(response.status === 200)
                navigate('/admin-dashboard')
        }

        useEffect( () => {
            const token = localStorage.getItem('tokenAuth')
            const role = localStorage.getItem('role')
            if(!token){
                navigate('/')
            }
        if(role !== USER_ROLES.Admin ) {
            navigate('/')
        }

        },[])

return (
    <> 
    <Typography variant='h5' mt={'2rem'} 
    sx={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.25), -2px -2px 4px rgba(0, 0, 0, 0.25)' }}
    >New Product Form:</Typography>
    <Grid container my={'2rem'} minWidth={'250px'} > 
    <Grid item xs={12} sm={10} md={6} lg={7} xl={6} mx={'auto'} 
               px={'2rem'} component={Paper} >
      <Box my={'2rem'}>
        <form onSubmit={handleSubmit}  >
           
            <TextField label = "product_model" variant="outlined" fullWidth 
            sx={{ m: 1, bgcolor: 'white' }} 
                placeholder='Enter product_model '
                value={values.product_model}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text" 
                name="product_model"
                multiline
                required></TextField>
                
                {touched.product_model && errors.product_model ? 
                <div style={{color:"crimson"}}>
                {errors.product_model} 
                </div>  : ""}           

                <TextField label = "product_name" variant="outlined" fullWidth 
                sx={{ m: 1, bgcolor: 'white' }} 
                placeholder='Enter product_name '
                value={values.product_name}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text" 
                multiline
                name="product_name"
                required></TextField>
                
                {touched.product_name && errors.product_name ? 
                <div style={{color:"crimson"}}>
                {errors.product_name} 
                </div>  : ""}    

                <TextField label = "product_type" variant="outlined" fullWidth 
                sx={{ m: 1, bgcolor: 'white' }} 
                placeholder='Enter product_type '
                value={values.product_type}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text" 
                name="product_type"
                required></TextField>
                
                {touched.product_type && errors.product_type ? 
                <div style={{color:"crimson"}}>
                {errors.product_type} 
                </div>  : ""}    

                <TextField label = "product_price" variant="outlined" fullWidth 
                sx={{ m: 1, bgcolor: 'white' }} 
                placeholder='Enter product_price '
                value={values.product_price}
                onChange={handleChange}
                onBlur={handleBlur}
                type="number" 
                name="product_price"
                required></TextField>
                
                {touched.product_price && errors.product_price ? 
                <div style={{color:"crimson"}}>
                {errors.product_price} 
                </div>  : ""}    

                <TextField label = "product_stock" variant="outlined" fullWidth 
                sx={{ m: 1, bgcolor: 'white' }} 
                placeholder='Enter product_stock '
                value={values.product_stock}
                onChange={handleChange}
                onBlur={handleBlur}
                type="number" 
                name="product_stock"
                required></TextField>
                
                {touched.product_stock && errors.product_stock ? 
                <div style={{color:"crimson"}}>
                {errors.product_stock} 
                </div>  : ""}    

                <TextField label = "product_discount" variant="outlined" fullWidth 
                sx={{ m: 1, bgcolor: 'white' }} 
                placeholder='Enter product_discount '
                value={values.product_discount}
                onChange={handleChange}
                onBlur={handleBlur}
                type="number" 
                name="product_discount"
                required></TextField>
                
                {touched.product_discount && errors.product_discount ? 
                <div style={{color:"crimson"}}>
                {errors.product_discount} 
                </div>  : ""}  

                <TextField label = "product_desc" variant="outlined" fullWidth 
                sx={{ m: 1, bgcolor: 'white' }} 
                placeholder='Enter product_desc '
                value={values.product_desc}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text" 
                name="product_desc"
                multiline
                required ></TextField>
                
                {touched.product_desc && errors.product_desc ? 
                <div style={{color:"crimson"}}>
                {errors.product_desc} 
                </div>  : ""}    
  
                <TextField label = "product_pic" variant="outlined" fullWidth 
                sx={{ m: 1, bgcolor: 'white' }} 
                placeholder='Enter product_pic '
                value={values.product_pic}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text" 
                name="product_pic"
                required></TextField>
                
                {touched.product_pic && errors.product_pic ? 
                <div style={{color:"crimson"}}>
                {errors.product_pic} 
                </div>  : ""}    
  
  
                <TextField label = "product_color" variant="outlined" fullWidth 
                sx={{ m: 1, bgcolor: 'white' }} 
                placeholder='Enter product_color '
                value={values.product_color}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text" 
                name="product_color"
                required></TextField>
                
                {touched.product_color && errors.product_color ? 
                <div style={{color:"crimson"}}>
                {errors.product_color} 
                </div>  : ""}    

                <TextField label = "product_warranty" variant="outlined" fullWidth 
                sx={{ m: 1, bgcolor: 'white' }} 
                placeholder='Enter product_warranty '
                value={values.product_warranty}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text" 
                name="product_warranty"
                required></TextField>
                
                {touched.product_warranty && errors.product_warranty ? 
                <div style={{color:"crimson"}}>
                {errors.product_warranty} 
                </div>  : ""}    
  

                <TextField label = "product_status" variant="outlined" fullWidth 
                sx={{ m: 1, bgcolor: 'white' }} 
                placeholder='Enter product_status '
                value={values.product_status}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text" 
                name="product_status"
                required></TextField>
                
                {touched.product_status && errors.product_status ? 
                <div style={{color:"crimson"}}>
                {errors.product_status} 
                </div>  : ""}    

                <TextField label = "launched_yr" variant="outlined" fullWidth 
                sx={{ m: 1, bgcolor: 'white' }} 
                placeholder='Enter launched_yr '
                value={values.launched_yr}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text" 
                name="launched_yr"
                required></TextField>
                
                {touched.launched_yr && errors.launched_yr ? 
                <div style={{color:"crimson"}}>
                {errors.launched_yr} 
                </div>  : ""}    
  
                <Button type='submit' variant='contained' 
                 color='success'
                 size='medium' sx={{m: 1 }} >
                    ADD PRODUCT
                 </Button>

        </form>

      </Box>
      </Grid>
      </Grid>
      </>
  )
}

export default AddProduct
