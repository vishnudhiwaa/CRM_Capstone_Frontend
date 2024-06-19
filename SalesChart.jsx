
import BarChart from '../../Charts/BarChart';
import React, { useState, useEffect } from 'react'
import {  Grid, Box, Typography,Paper } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '../../Data/APIdata';
import { ORDER_STATUS } from '../Data/statusCode';
import { useNavigate } from 'react-router-dom';

const SalesChart = () => { 
    const [requests, setRequests] = useState([]);
    const [close, setClose] = useState(true)
    const ORDER_STATUS_VALUES = Object.values(ORDER_STATUS)
    const navigate = useNavigate()

    const [data, setData] = useState({})  
    const options = {
       } 

       const getSalesReq = async() => {
        try{
            const token = localStorage.getItem('tokenAuth')
            const email = localStorage.getItem('email')
                // console.log(token, email)
            const config = { headers : {"x-auth-token" : token}} 
            const d = new Date();
            let year = d.getFullYear()
            let month = d.getMonth()+1
            const pattern  = "^" +  String(year) + 
                            ( month<10 ? '0'+String(month) : String(month)) + ".*"
    
            const response = await axios.post(`${BASE_URL}/orders/monthly-orders`, 
            {pattern : pattern}, config) 
            //console.log(response) 
            if( response.status === 200) {
              const t = [...response.data.ordersMonthly]
                 setRequests( [...response.data.ordersMonthly])
                const shipped = t.filter( od => od.order_status === ORDER_STATUS.Shipped)
                const placed = t.filter( od => od.order_status === ORDER_STATUS.Placed)
                const deliv = t.filter( od => od.order_status === ORDER_STATUS.Delivered)
                const canreq = t.filter( od => od.order_status === ORDER_STATUS.CancelReq)
                const cancel = t.filter( od => od.order_status === ORDER_STATUS.Cancelled)
                const num = [ placed.length , shipped.length, deliv.length, canreq.length, cancel.length ] 
                //console.log(num, ORDER_STATUS_VALUES)
                 setData({
                  labels: ORDER_STATUS_VALUES,
                  datasets : [{
                    label: "Monthly Order Status",
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
                })
                setClose(false)
            }
            else if( response.status === 403) {
                navigate('/')
            }
            }
            catch(error){
              console.log(error);
          }
          }

    useEffect( () => {
        getSalesReq()
      }, [])

  return (
    <Grid container justifyContent={'center'} alignItems={'center'} p={1}>
    <Grid item xs={12} sm={10} md={8} lg={6} xl={6} key={"sales-chart1"} my={2}
      >
          { !close &&
          <Box p={3} minWidth={'300px'} borderRadius={'10px'} component={Paper} > 
             <Typography> Current Month Sales</Typography>
            <BarChart data={data} options={options} />
            </Box>
            }
    </Grid>
    </Grid>
  )
}

export default SalesChart
