
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../Data/APIdata.js';
import PieChart from '../Charts/PieChart.jsx';
import {  Grid, Box, Typography,  Paper } from '@mui/material';
import DoughnutChart from '../Charts/DoughnutChart.jsx';

const ProductSalesChart = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState( 
        {
            "WM" : 0,
            "AP" : 0,
            "KC" : 0,
            "WP" : 0,
            "VC" : 0
        }
    )
    const [chartData, setchartData] = useState({})  
    const [chartData2, setchartData2] = useState({})  
    const options = {
    } 
    const [close, setClose] = useState(true)


    const getAllProductsSold = async() => { 

        try{
            const token = localStorage.getItem('tokenAuth')
            const email = localStorage.getItem('email')
              //  console.log(token, email)
            const config = { headers : {"x-auth-token" : token}} 
            const d = new Date();
            let year = d.getFullYear()
            const patternY =  "^" + String(year) + ".*"
            let month = d.getMonth()+1
            const pattern  = "^" +  String(year) + 
                            ( month<10 ? '0'+String(month) : String(month)) + ".*"
    
            const response = await axios.post(`${BASE_URL}/orders/get-products-data`, 
            {email, year : patternY , month : pattern}, config) 
            //console.log(response) 
            if( response.status === 200) {
               // console.log(response.data) 
                const all = response.data.productsSold
                const delivered = response.data.productsSoldCount[0].count
                const cancelled = response.data.productsCancelled[0].count
                let WMqty = 0;
                let KCqty = 0;
                let WPqty = 0;
                let APqty = 0;
                let VCqty = 0;
                let totalCount = 0;
                all.forEach( (el) => {
                    totalCount += el.order_qty
                    const items = el.order_items 
                    items.map( i => {
                        if( String(i.product_ID).startsWith("WM") ) {
                            WMqty += i.qty
                        } 
                        if( String(i.product_ID).startsWith("KC") ) {
                            KCqty += i.qty
                        } 
                        if( String(i.product_ID).startsWith("WP") ) {
                            WPqty += i.qty
                        } 
                        if( String(i.product_ID).startsWith("AP") ) {
                            APqty += i.qty
                        } 
                        if( String(i.product_ID).startsWith("VC") ) {
                            VCqty += i.qty
                        } 
                    })
                }) 
              // console.log(KCqty, WMqty, VCqty, WPqty, APqty, totalCount) 
               setCategory({ WM : WMqty, KC : KCqty, WP : WPqty, VC : VCqty, AP : APqty}) 
               setchartData({
                labels: [ "WM"  , "KC"  , "WP"  , "VC"  , "AP"  ],
                datasets : [{
                  label: "Products Sold",
                  data: [  WMqty,   KCqty,   WPqty,   VCqty,   APqty],
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

              //doughnut chart 
              setchartData2({
                labels: [ "Sold" , "Cancelled" ],
                datasets : [{
                  label: "Products Sold",
                  data: [  delivered, cancelled ],
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
              setClose(false)
            }
            else if( response.status === 403) {
                navigate('/')
            }
            }
            catch(error){
              console.log(error);
              if( error.response?.status === 403) {
                window.alert("Session expired. Login again to continue")
                navigate('/')
            }
          }
          
    }
    useEffect( () => {
        getAllProductsSold();
    },[])

  return (
    <Grid container rowGap={2} columnGap={1} p={1} alignItems={'space-evenly'} 
    justifyContent={'space-evenly'}> 

    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          { !close &&
          <Box p={3} minWidth={'300px'} borderRadius={'10px'} component={Paper} > 
             <Typography> Category-wise Sales</Typography>
            <PieChart data={chartData} options={options} />
            </Box>
            }
           </Grid>
    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          { !close &&
          <Box p={3} minWidth={'300px'} borderRadius={'10px'} component={Paper} > 
             <Typography> Overall Sales</Typography>
            <DoughnutChart data={chartData2} options={options} />
            </Box>
            }
           </Grid>
     </Grid>
  )

}

export default ProductSalesChart
