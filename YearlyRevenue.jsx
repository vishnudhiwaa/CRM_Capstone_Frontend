
import React, { useState, useEffect } from 'react'
import {  Grid, Box, Typography, Stack, Paper } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '../../Data/APIdata';
import { ORDER_STATUS } from '../../Data/StatusCode';
import { useNavigate } from 'react-router-dom';
import LineChart from '../Charts/LineChart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PieChart from '../Charts/PieChart';
import DoughnutChart from '../Charts/DoughnutChart';

const YearlyRevenue = () => { 
    const [requests, setRequests] = useState([]);
    const [requestsY, setRequestsY] = useState([]); 
    const [monthlyRev, setmonthlyRev] = useState([]);
    const [yearlyRev, setyearlyRev] = useState([]); 
    const [close, setClose] = useState(true)
    const ORDER_STATUS_VALUES = Object.values(ORDER_STATUS)
    const navigate = useNavigate()
    // for chart
    const [data, setData] = useState({})  
    const [dataY, setDataY] = useState({})  
    // for line chart
    const [lineData, setlineData] = useState({})  
    const [lineDataY, setlineDataY] = useState({})  
    const options = {
    } 

       const getSalesReq = async() => {
        try{
            const token = localStorage.getItem('tokenAuth')
            const email = localStorage.getItem('email')
              //  console.log(token, email)
            const config = { headers : {"x-auth-token" : token}} 
            const d = new Date();
            let year = d.getFullYear()
            let month = d.getMonth()+1
            const pattern  = "^" +  String(year) + 
                            ( month<10 ? '0'+String(month) : String(month)) + ".*"
    
            const response = await axios.post(`${BASE_URL}/orders/monthly-orders`, 
            {email : email}, config) 
            //console.log(response) 
            if( response.status === 200) {
                
              const t = [...response.data.ordersMonthly]
              const temp = [...response.data.ordersYearly]
                 setRequests( [...response.data.ordersMonthly])
                 setRequestsY( [...response.data.ordersYearly])

                const shipped = t.filter( od => od.order_status === ORDER_STATUS.Shipped)
                const placed = t.filter( od => od.order_status === ORDER_STATUS.Placed)
                const deliv = t.filter( od => od.order_status === ORDER_STATUS.Delivered)
                const canreq = t.filter( od => od.order_status === ORDER_STATUS.CancelReq)
                const cancel = t.filter( od => od.order_status === ORDER_STATUS.Cancelled)
                const num = [ placed.length , shipped.length, deliv.length, canreq.length, cancel.length ] 
               
                const shippedY = temp.filter( od => od.order_status === ORDER_STATUS.Shipped)
                const placedY = temp.filter( od => od.order_status === ORDER_STATUS.Placed)
                const delivY = temp.filter( od => od.order_status === ORDER_STATUS.Delivered)
                const canreqY = temp.filter( od => od.order_status === ORDER_STATUS.CancelReq)
                const cancelY = temp.filter( od => od.order_status === ORDER_STATUS.Cancelled)
                const numY = [ placedY.length , shippedY.length, delivY.length, canreqY.length, cancelY.length ] 
                //console.log(numY, num)

                const monthlyRev = deliv.map ( (od) => od.order_amount)
                const yearlyRev = delivY.map ( (od) => od.order_amount)
                const monthlyRevID = deliv.map ( (od) => od.orderID)
                const yearlyRevID = delivY.map ( (od) => od.orderID)
                //console.log(monthlyRev, yearlyRev, monthlyRevID, yearlyRevID)
                setmonthlyRev(monthlyRev)
                setyearlyRev(yearlyRev)
                 setData({
                  labels: ORDER_STATUS_VALUES,
                  datasets : [{
                    label: "Monthly Orders",
                    data: num,
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

                 setDataY({
                  labels: ORDER_STATUS_VALUES,
                  datasets : [{
                    label: "Yearly Orders",
                    data: numY,
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
                 setlineData({
                  labels: monthlyRevID,
                  datasets : [{
                    label: "Monthly Orders",
                    data: monthlyRev,
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

                 setlineDataY({
                  labels: yearlyRevID,
                  datasets : [{
                    label: "Yearly Orders",
                    data: yearlyRev,
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
        getSalesReq()
      }, [])

  return (
     <Grid container rowGap={2} columnGap={1} p={1} alignItems={'space-evenly'} justifyContent={'space-evenly'}> 
      
           <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
            <Stack gap={2} >
            { !close &&
                <Box borderRadius={'20px'}  >
                    <Box m={1} className='gradient-b' component={Paper} >
                        <Typography variant='h5' color={'white'}
                         className=" animate__animated animate__rubberBand animate__repeat-3">
                        <MonetizationOnIcon fontSize='large' sx={{m:1}}></MonetizationOnIcon>
                         Annual Revenue
                        </Typography>
                        <Typography variant='h4' color={'white'}
                        className=" animate__animated animate__rubberBand animate__repeat-3">
                           Rs.{yearlyRev.reduce((a,b) => a+b, 0)}</Typography>
                    </Box>
                </Box>
              }
              { !close && 
                <Box borderRadius={'20px'}  >
                <Box m={1} className='gradient-b' component={Paper} >
                     
                        <Typography variant='h5' color={'white'}>
                        <MonetizationOnIcon fontSize='large' sx={{m:1}}>
                        </MonetizationOnIcon>
                            Monthly Revenue:
                        </Typography>
                        <Typography variant='h5' color={'white'}>
                            Rs.{monthlyRev.reduce((a,b) => a+b, 0)}
                            </Typography>
                    </Box>
                </Box>
                  }
            </Stack>           
           </Grid>

           <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          { !close &&
          <Box p={3} minWidth={'300px'} borderRadius={'10px'} component={Paper} > 
             <Typography> Monthly Trending</Typography>
            <LineChart data={lineData} options={options} />
            </Box>
            }
           </Grid>
           <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>

          { !close &&
          <Box p={3} minWidth={'300px'} borderRadius={'10px'} component={Paper} > 
             <Typography> Yearly Trending</Typography>
            <LineChart data={lineDataY} options={options} />
            </Box>
            }
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          { !close &&
          <Box p={3} minWidth={'300px'} borderRadius={'10px'} component={Paper} > 
             <Typography> Current Month Orders</Typography>
            <PieChart data={data} options={options} />
            </Box>
            }
           </Grid>
           
           <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>


          { !close &&
          <Box p={3} minWidth={'300px'} borderRadius={'10px'} component={Paper} > 
             <Typography> Current Year Orders</Typography>
            <DoughnutChart data={dataY} options={options} />
            </Box>
            }
            </Grid>
    </Grid>
  )
}

export default YearlyRevenue
