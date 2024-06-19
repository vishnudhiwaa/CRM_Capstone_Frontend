
import React, { useState, useEffect } from 'react'
import {  Grid, Box, Typography,  Paper } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '../../Data/APIdata';
import { ORDER_STATUS } from '../../Data/StatusCode';
import { useNavigate } from 'react-router-dom';
import LineChart from '../Charts/LineChart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import BarChart from '../Charts/Barchart';

const RevenueChart = () => {

    // const [requests, setRequests] = useState([]);
    // const [requestsY, setRequestsY] = useState([]); 
    // const [monthlyRev, setmonthlyRev] = useState([]);
    // const [yearlyRev, setyearlyRev] = useState([]); 
    const [close, setClose] = useState(true)
    const ORDER_STATUS_VALUES = Object.values(ORDER_STATUS)
    const navigate = useNavigate()
    
    // for chart
    const [lineDataMonthly, setlineDataMonthly] = useState({})  
    const [lineDataYearly, setlineDataYearly] = useState({})  
    const options = {
    } 

    const getRevenue = async() => {
        try{
            const token = localStorage.getItem('tokenAuth')
            //const email = localStorage.getItem('email')
            //const role = localStorage.getItem('role')
              //  console.log(token, email)
            const config = { headers : {"x-auth-token" : token}} 
            const d = new Date();
            let year = d.getFullYear()
            year = String(year)
            let month = d.getMonth()+1
            month = ( month<10 ? '0'+String(month) : String(month)) 
    
            const response = await axios.post(`${BASE_URL}/orders/get-revenue`, 
            { month, year}, config) 
            //console.log(response) 
            if( response.status === 200) {
              const formonth = [...response.data.ordersMonthly]
              const foryear = [...response.data.ordersYearly]
              const forAllyear = [...response.data.ordersAllYearly]
                // console.log(formonth, foryear, forAllyear)

                 setlineDataMonthly({
                  labels: formonth.map((el) => el._id),
                  datasets : [{
                    label: "Monthly Revenue",
                    data: formonth.map((el) => el.revenue),
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 205, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(201, 203, 207, 0.2)'
                    ],
                    borderColor: [
                      'rgb(255, 99, 132)',
                      'rgb(255, 159, 64)',
                      'rgb(255, 205, 86)',
                      'rgb(75, 192, 192)',
                      'rgb(54, 162, 235)',
                      'rgb(153, 102, 255)',
                      'rgb(201, 203, 207)'
                    ],
                    borderWidth: 1
                }]
                });

                 setlineDataYearly({
                  labels: forAllyear.map((el) => el._id),
                  datasets : [{
                    label: "Yearly Revenue",
                    data: forAllyear.map((el) => el.revenue),
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 205, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(201, 203, 207, 0.2)'
                    ],
                    borderColor: [
                      'rgb(255, 99, 132)',
                      'rgb(255, 159, 64)',
                      'rgb(255, 205, 86)',
                      'rgb(75, 192, 192)',
                      'rgb(54, 162, 235)',
                      'rgb(153, 102, 255)',
                      'rgb(201, 203, 207)'
                    ],
                    borderWidth: 1
                }]
                }) 
                
                setClose(false)
            }
            else if( response.status === 403) {
                navigate('/')
            }
            }
            catch(error){
              console.log(error);
              if( error.response.status === 403) {
                window.alert("Session expired. Login again to continue")
                navigate('/')
            }
          }
          }
    
    useEffect( () => {
        getRevenue()
      }, [])

  return (
    <Grid container rowGap={2} columnGap={1} p={1} alignItems={'space-evenly'} justifyContent={'space-evenly'}> 
    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
    { !close &&
          <Box p={3} minWidth={'300px'} borderRadius={'10px'} component={Paper} > 
             <Typography> Monthly Revenue</Typography>
            <BarChart data={lineDataMonthly} options={options} />
            </Box>
            }
    </Grid>
    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
    { !close &&
          <Box p={3} minWidth={'300px'} borderRadius={'10px'} component={Paper} > 
             <Typography> Yearly Revenue</Typography>
            <BarChart data={lineDataYearly} options={options} />
            </Box>
            }
    </Grid>
            
    </Grid>
  )
}

export default RevenueChart
