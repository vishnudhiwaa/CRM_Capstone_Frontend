
import React from 'react'
import MktLayout from './MktLayout'
import { Grid } from '@mui/material'
import YearlyRevenue from '../Admin/YearlyRevenue'
import RevenueChart from '../Admin/RevenueChart'
import ProductSalesChart from './ProductSalesChart'

const MktDashboard = () => {
  return (
    <MktLayout>
      
       <Grid item  xs>
          <ProductSalesChart />
        </Grid>

         <Grid item  xs>
          <YearlyRevenue />
        </Grid>

        <Grid item  xs>
          <RevenueChart />
        </Grid>

        
       
    </MktLayout>
  )
}

export default MktDashboard
