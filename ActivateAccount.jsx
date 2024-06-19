
import React, { useEffect, useState } from 'react'
import Base from '../Base'
import { useParams, useSearchParams, useNavigate} from 'react-router-dom'
import { Box, Stack } from '@mui/material';
import AppBarComponent from '../AppBarComponent/AppBarComponent';
import axios from 'axios';
import { BASE_URL } from '../../Data/APIdata';

const ActivateAccount = () => {
    const {id} = useParams();
    const [searchparam] = useSearchParams();
    const [resp, setResp] = useState("")
    const navigate = useNavigate();
     
    const activateUser = async(id,token) => {
        //console.log("Verifying activation");
        try{
         const response = await axios.post(`${BASE_URL}/user/activate/${id}/${token}`)
         //console.log(response);
            if(response.status === 200){
                setResp("Account Activated. Login to Continue")                
                setTimeout( ()=> {
                    navigate(`/`);
                },3000)                
             }
         
         else {
            console.log("error activating");
            setResp("Account not activated", response.data.message)
         }
         
        }
        catch(err){
            console.log("error authorizing");
            console.log(err) 
            setResp("Error occured while activating account.")
        }
    }   

    useEffect( () => { 
        const token  = searchparam.get("activateToken") 
        if(id && token !== null) {
            activateUser(id,token);
        }
        else{
            setResp("Invalid Link")
        }
        },[])

  return (
    <>
    <AppBarComponent />
    <Base>
        <Stack justifyContent={'center'} alignItems={'center'}>
            { resp ? 
            <Box p={1}>
                {resp}
            </Box>
            :
            <Box p={1}>
               Please wait while we activate your account
            </Box>
            }
        </Stack>
    </Base>
    </>
  )
}

export default ActivateAccount
