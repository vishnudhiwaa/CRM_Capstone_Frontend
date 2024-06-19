
import PieChart from '../Charts/PieChart';
import React, { useState, useEffect } from 'react'
import {  Grid, Box, Typography, Paper } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '../../Data/APIdata';
import { REQUEST_STATUS } from '../Data/statusCode';

const EnggChart = () => { 
    const [requests, setRequests] = useState([]);
    const [close, setClose] = useState(true)
    const type = ["Assigned", "Resolved"]
    const [data, setData] = useState({})  
    const options = {
       } 

       const getEnggReq = async() => {
        try{
            const token = localStorage.getItem('tokenAuth')
            const email = localStorage.getItem('email')
                //console.log(token, email)
            const config = { headers : {"x-auth-token" : token}}
            const response = await axios.post(`${BASE_URL}/request/get-requests`, 
            {request_engg : email}, config) 
            //console.log(response.data.requestsList) 
            if( response.status === 200) {
              const t = [...response.data.requestsList]
                 setRequests( [...response.data.requestsList])
                let  tempC = t.filter( el => el.request_status === REQUEST_STATUS.Resolved)
                let  tempA = t.filter( el => el.request_status === REQUEST_STATUS.Assigned)
                const num = [tempA.length, tempC.length];
                

                 setData({
                  labels: type,
                  datasets : [{
                    label: "Requests Breakup",
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
            }
            catch(error){
              console.log(error);
          }
          }

    useEffect( () => {
        getEnggReq()
      }, [])

  return (
    <Grid container justifyContent={'center'} alignItems={'center'} p={1}>
    <Grid item xs={12} sm={10} md={8} lg={6} xl={4} key={"engg-chart1"} my={2} >
          { !close &&
          <Box p={3} minWidth={'300px'} borderRadius={'10px'} component={Paper} > 
           <Typography> Your Requests </Typography>
            <PieChart data={data} options={options} />
            </Box>
            }
    </Grid>
    </Grid>
  ) 
}

export default EnggChart
