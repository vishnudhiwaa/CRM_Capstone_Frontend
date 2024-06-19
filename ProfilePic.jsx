
import { Stack, Typography, Box, Avatar, Paper, Button, TextField, Input } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import AppBarComponent from '../AppBarComponent/AppBarComponent';
import { changeUserPhone, changeUserPic } from '../Redux/Reducers/userReducer';
import { BASE_URL } from '../../Data/APIdata';
import { useNavigate } from 'react-router-dom';

const ProfilePic = () => {
     
    const user = useSelector(state => state.userInfo.user_data)
    const url = user.pic_URL
    const picID = user.pic_URL_ID
    const navigate = useNavigate()
    const [phone, setPhone] = useState();
    const [image, setImage] = useState({url: url, public_id: ""});
    const [delImage, setDelImage] = useState({url: "", public_id: ""});
    const [fileSizeExceeded, setFileSizeExceeded] = useState(false);
    const maxFileSize = 2000000; // 2MB
    const preset_key = process.env.REACT_APP_PRESET_KEY;
    const cloud_name = process.env.REACT_APP_CLOUD_NAME;
    const dispatch = useDispatch();
    
    const handleImage = (e) => {
        setFileSizeExceeded(false);
        const file = e.target.files[0];
                if (file.size > maxFileSize) {
                    setFileSizeExceeded(true);
                    return; // do not process the file if it exceeds the size limit
                }
                else if(image.url === "" || image.url === "na") {
                    setImage(e.target.files[0])
                }
                else 
                {
                const temp = {...image};
                setDelImage(temp)
                setImage(e.target.files[0])
            }
      } 

      const handleUpload = async(event) => {
        if(!fileSizeExceeded){
            const imgForm = new FormData();
            imgForm.append("file", image)
            imgForm.append("upload_preset", preset_key)
            imgForm.append("cloud_name",cloud_name) 
            imgForm.append("folder","users");
        
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, imgForm)
            // console.log(response);
            // console.log(response.data.public_id);
            setImage({url: response.data.secure_url, public_id: response.data.public_id}) 

            const db_response = await updateUserDB({email: user.email,
                                pic_URL: response.data.secure_url,
                                pic_URL_ID: response.data.public_id })
            if(db_response.status = 200) {
                dispatch(changeUserPic({url: response.data.secure_url, public_id: response.data.public_id}))
            }
            if(delImage.url && delImage.public_id){
            deleteImage(delImage.public_id)
            } 
        }
        else{
            window.alert("File size should be less than 2MB")
        }
      }
        
         const updateUserDB = async(data) => {
                try{ 
                    const token = localStorage.getItem('tokenAuth')
                    const config = { headers : {"x-auth-token" : token}}
                    const response = await axios.put(`${BASE_URL}/user/update-pic`, data, config )
                    return response
                }
                catch(error){ 
                    console.log("image not updated")
                    return error
                }
         }
         const updateUserPhone = async() => {
                try{ 
                    
                    const token = localStorage.getItem('tokenAuth')
                    const email = localStorage.getItem('email')
                    const role = localStorage.getItem('role')
                    const config = { headers : {"x-auth-token" : token}}
                    const data = { email : email, phone : phone}
                    const response = await axios.put(`${BASE_URL}/user/update-phone`, 
                    data, config )
                    if(response.status === 200) { 
                        dispatch(changeUserPhone({phone : phone}))
                        window.alert("Phone number updated")
                        navigate(`/${role}-dashboard`)
                    }
                }
                catch(error){ 
                    console.log("phone number not updated")
                    window.alert("Phone number not updated")
                    return error
                }
         }

         const deleteImage = async (public_id) => {
            try{
            //console.log("delete old image")
            const token = localStorage.getItem('tokenAuth')
            const config = { headers : {"x-auth-token" : token}}
            const response = await axios.delete(`${BASE_URL}/user/delete-pic?public_id=${public_id}`, config)
            //console.log(response)
            }
            catch(error){ 
                console.log("cloud not updated")
                return error
            }
           }
     

  return (
   
    <Stack my={'2rem'} mx={'auto'} justifyContent={'center'} 
    alignItems={'center'} minWidth={'250px'}  maxWidth={'500px'} component={Paper}>
       
        <Typography variant='h6'>
            Change Profile Picture
        </Typography>
        <Box>
        { user ? 
              <Avatar sx={{ width: 100, height: 100 , bgcolor: '#0E0E0E' }}  alt="User Pic" src= {image.url ? image.url:  "na"} />
             : <Avatar  alt="User" src= "na" />
            }
        </Box>
        <Stack gap={2} width={'90%'} my={'2rem'}>
        <Input type='file' onChange={handleImage}></Input>
        <Button variant='contained' onClick={handleUpload}
        disabled={fileSizeExceeded}>Upload</Button>
        <hr></hr>
          <Typography sx={{ wordBreak: "break-word" }} variant='body2'>
          <Box component="span" fontWeight={550} m={1}>Uploaded image URL: </Box> 
            {image.url} 
            </Typography>
        </Stack>
        {fileSizeExceeded && (
                        <p className='error'>
                            File size exceeded the limit 2MB
                        </p>
        )}

        <Stack gap={2} width={'90%'} my={'2rem'}>
            <TextField type='number' required 
            label="Phone"
            name="phone"
            variant='outlined'
            placeholder='Enter phone number'
            onChange={(e) => setPhone(e.target.value)} /> 
            <Button onClick={updateUserPhone}>Update</Button>
        </Stack>
    </Stack>
   
  )
}

export default ProfilePic
