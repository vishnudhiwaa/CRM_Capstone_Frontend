
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Avatar, TextField, Stack, Typography, Paper } from '@mui/material'

const Profile = () => {
    const user = useSelector(state => state.userInfo.user_data)
    const navigate = useNavigate();

  return (
    <Box minWidth={'250px'} p={2} sx={{wordBreak : 'break-word'}}>
    <Paper>
         <Typography variant='subtitle1'  >            
           Profile: </Typography>
        { user.email ? 
          <Stack> 
           <Typography variant='subtitle1'  >            
           Email : {user.email}</Typography>
           <Typography variant='subtitle1'  >            
           Username : {user.username}</Typography>
           <Typography variant='subtitle1' >            
           Phone : {user.phone}</Typography>
         </Stack>
          : 
          <div>
          <p>Login to view profile</p>
          <button onClick={() => navigate('/')}>Home</button>
          </div>
        }
    </Paper>
    </Box>
  )
}

export default Profile
