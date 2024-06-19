
import React, { useEffect } from 'react'
import { useState } from 'react';
import {Box,  Button, Paper, TextField, Grid, Typography, MenuItem, Select, InputLabel }  from '@mui/material';
import { useFormik } from 'formik' 
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { USER_ROLES } from '../../Data/Roles.js';
import { registerSchema } from '../AuthComponents/Signup.jsx';
import { BASE_URL } from '../../Data/APIdata.js';
import LoadModal from '../../Customer/LoadModal.jsx';

const AddEmployee = () => {
    
    const navigate = useNavigate();
    const [emp_role, setEmp_Role] = useState("");
    const USER_ROLES_VALUES = Object.values(USER_ROLES);
    const rolesArray = USER_ROLES_VALUES.filter( el => el !== USER_ROLES.Customer)
    const [open, setOpen] = useState(false)

    const handleClose = () => { setOpen(false)}
    // form handler - Formik
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
        onSubmit: (newEmployee) => {
            //console.log(newEmployee);
            handleAddEmployee(newEmployee)
        }    
    }) 
    
        const handleAddEmployee = async(newEmployee) => {
              //console.log(newEmployee) 
              const user = {
                username : newEmployee.username,
                email : newEmployee.email,
                phone: newEmployee.phone,
                password: newEmployee.password,
                role : emp_role
            }  
              const token = localStorage.getItem('tokenAuth')
              const config = { headers : {"x-auth-token" : token}}
           try{ 
              setOpen(true)
              const response = await axios.post(`${BASE_URL}/admin/add-employee`,{ new_User : user }, config) 
              //console.log(response) 
              if(response.status === 201 || response.status ===  200) {
                window.alert("Employee created")
                handleClose()
              }
            }
            catch(error){
                handleClose()
                console.log(error);
            }
            
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
    <LoadModal open={open} handleClose={handleClose} />
    <Typography variant='h5' mt={'2rem'}
    sx={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.25), -2px -2px 4px rgba(0, 0, 0, 0.25)' }}
    >New Employee Form:</Typography>
    <Grid container my={'2rem'} minWidth={'250px'} > 
    <Grid item xs={12} sm={10} md={6} lg={7} xl={6} mx={'auto'} 
               px={'2rem'} component={Paper} >
      <Box my={'2rem'}>
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
            
                <Box my={1} >  
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    variant='filled'
                    id="demo-simple-select"
                    value={emp_role}
                    label="Select Role"
                    onChange={(e) => setEmp_Role(e.target.value)}
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
                    ADD EMPLOYEE
                 </Button>
            </form>
      </Box>
      </Grid>
      </Grid>
      </>
  )
}

export default AddEmployee
