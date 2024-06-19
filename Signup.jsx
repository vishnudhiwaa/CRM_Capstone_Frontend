
import React from 'react'
import { useState } from 'react';
import {Box,  Button, TextField }  from '@mui/material';
import * as yup from "yup"
import { useFormik } from 'formik' 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../Data/APIdata';
import LoadModal from '../../Customer/LoadModal';

 export const registerSchema = yup.object().shape({
    username: yup.string().required("Please enter name").min(2, 'Too Short!').max(50, 'Too Long!'),
    email: yup.string().email().required("Please enter email"),
    phone: yup.string(),
    password: yup
        .string()
        .required('Password is required')
        .matches(/\w*[a-z]\w*/,  "Password must have a small letter")
        .matches(/\w*[A-Z]\w*/,  "Password must have a capital letter")
        .matches(/\d/, "Password must have a number")
        .matches(/[!+@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
        .min(8, ({ min }) => `Password must be at least ${min} characters`),
        password2: yup.string()
        .required("Confirm your password")
        .oneOf([yup.ref("password")], "Password does not match")
    }); 

const Signup = () => { 

    const [resp, setResp] = useState("")
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const handleClose = () => { setOpen(false)}
    const {values, 
        handleChange, 
        handleSubmit,
        handleBlur,
        errors,
        touched } = useFormik({
        initialValues: {
            username: "",
            email: "",
            phone: "",
            password: "",
            password2: ""
        },
        validationSchema: registerSchema,
        onSubmit: (newUser) => {
            handleAddUser(newUser)
        }
    
    }) 

  const handleAddUser = async(newUser) => {
    //console.log(newUser);
    const user = {
        username : newUser.username,
        email : newUser.email,
        phone: newUser.phone,
        password: newUser.password
    } 
    setOpen(true)
    try{
    const response = await axios.post(`${BASE_URL}/user/register`, {new_User : user})
    //console.log(response); 
    if(response.status === 201 || response.status === 200 ) {
        setResp("Account created successfully! Activation link sent to your email")
        handleClose()
    }
    else{
        setResp("Error occurred while creating account", response.status)
        handleClose()

    }
    }
    catch(error){
        setResp("Error occurred while creating account")
        handleClose()
        console.log(error);
    }
  }

  return (
    <>
    <LoadModal open={open} handleClose={handleClose} />
    <div> 
        {
            resp ? <p>{resp}</p>
            :
        <Box >
            <form onSubmit={handleSubmit} >
                <TextField label = "Username" variant="outlined" fullWidth sx={{ m: 1, bgcolor: 'white' }} 
                placeholder='Enter Username '
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text" 
                name="username"
                required>
                </TextField>
                {touched.username && errors.username ? 
                <div style={{color:"crimson"}}>
                {errors.username} 
                </div>  : ""}

                <TextField label = "Email" variant="outlined" fullWidth sx={{m: 1, bgcolor: 'white' }} 
                placeholder='Enter Email of '
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                type="email" 
                name="email"
                required>
                </TextField>
                {touched.email && errors.email ? 
                <div style={{color:"crimson"}}>
                {errors.email} 
                </div>  : ""}

                <TextField label = "Phone" variant="outlined" fullWidth sx={{m: 1, bgcolor: 'white' }} 
                placeholder='Enter Phone number'
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text" 
                name="phone"
                >
                {touched.phone && errors.phone ? 
                <div style={{color:"crimson"}}>
                {errors.phone} 
                </div>  : ""}
                </TextField>

                <TextField label = "Password" variant="outlined" fullWidth sx={{m: 1, bgcolor: 'white' }} 
                placeholder='Enter Password '
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                type="password" 
                name="password"
                required>
                </TextField>
                {touched.password && errors.password ? 
                <div style={{color:"crimson"}}>
                {errors.password} 
                </div>  : ""}

                <TextField label = "Confirm Password" variant="outlined" fullWidth sx={{m: 1, bgcolor: 'white' }} 
                placeholder='Enter Password '
                value={values.password2}
                onChange={handleChange}
                onBlur={handleBlur}
                type="password" 
                name="password2"
                required>
                </TextField>
                {touched.password2 && errors.password2 ? 
                <div style={{color:"crimson"}}>
                {errors.password2} 
                </div>  : ""}
                                
                 <Button type='submit' variant='contained' 
                 color='success'
                 size='medium' sx={{m: 1 }} >
                    SIGNUP
                 </Button>
            </form>
            </Box>
        }
    </div>
    </>
  )
}

export default Signup
