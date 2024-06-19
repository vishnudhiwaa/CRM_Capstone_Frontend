
import React from 'react'
import EnggLayout from './EnggLayout'
import { Grid } from '@mui/material'
import EnggChart from './EnggChart'
import Profile from '../Default/Profile'
const EnggDashboard = () => {
  return (
    <EnggLayout>
      <Grid container gap={2}>
      <Grid item  xs>
          <Profile />
        </Grid>
      <Grid item  xs>
          <EnggChart />
        </Grid>
      
      </Grid>
    </EnggLayout>
  )
}

export default EnggDashboard
