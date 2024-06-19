
import React, { useEffect } from 'react'
import { USER_ROLES } from '../../Data/Roles.js';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout.jsx';
import { Grid } from '@mui/material';
import RequestsData from './RequestsData.jsx';
import YearlyRevenue from './YearlyRevenue.jsx';
import RevenueChart from './RevenueChart.jsx';
const AdminDashboard = () => {
    const navigate = useNavigate();
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
    <AdminLayout>
        <Grid item xs>
        <RequestsData /> 
        </Grid>
        
        <Grid item xs>
        <YearlyRevenue />
        </Grid>

        <Grid item xs>
        <RevenueChart />
        </Grid>

    </AdminLayout>
  )
}

export default AdminDashboard
