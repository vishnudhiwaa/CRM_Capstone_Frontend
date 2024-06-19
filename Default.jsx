
import React from 'react'
import AppBarComponent from '../AppBarComponent/AppBarComponent'
import { useSelector, useDispatch } from 'react-redux';
import { Stack,Box } from '@mui/material';


const Default = () => {
    const user = useSelector( state => state.userInfo.user_data)
    const products = useSelector( state => state.products.productsAll)

  return (
    <div>
        <AppBarComponent /> 
        <Stack direction={'row'}>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <h3>For small screen</h3>
        </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <h3>for large screen</h3>
            </Box>
        </Stack>
      {/* <div style={{width : '70%' , marginLeft: '5%' , overflow: 'auto'}}>
        <h3>User</h3>
        <h3>{user.email}</h3>
        <h3>{user.role}</h3>
      </div>
      <hr></hr>
      <ul style={{width : '70%' , marginLeft: '5%' , overflow: 'auto'}}>
        <h5>Products:</h5>
        {
          products.map( prod => <li> {` Product: ${prod.p_name} Price: Rs.${prod.price}`} </li>)
        }
        
      </ul> */}
    </div>
  )
}

export default Default
