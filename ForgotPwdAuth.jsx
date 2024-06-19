
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from 'axios';
import { BASE_URL } from '../../Data/APIdata';
const ForgotPwdAuth = () => {  
    const [searchparam] = useSearchParams();
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    
    const verifyUser = async(id,token) => {
        //console.log(id,token);
        //console.log("Verifying authorization");
        try{
         const response = await axios.post(`${BASE_URL}/user/forgotpwd/authorize/${id}/${token}`);
         //console.log(response);
         if(response.status === 200){
          // console.log(response, response.data);
            let resetID = response.data.id;
            let token = response.data.token;
            navigate(`/reset-pwd/${resetID}/${token}`,{ replace: true });
         }
        }
        catch(err){
            console.log("error authorizing", err);
           // console.log(err.response.data) 
            setMsg("error authorizing")
            window.alert("Password Reset link invalid")
        }
        
    }   
    useEffect(()=> {
       const id = searchparam.get("id")
      const token  = searchparam.get("token") 
      if(id && token) {
        verifyUser(id,token);
      }
       else {
        window.alert("Password Reset link is invalid")
       }
    },[searchparam])
    return(
        <div className="text-white mx-auto my-5">
        <h6>Verifying user authorization. Please wait .. </h6> 
        {msg && <h6 className="text-danger">{msg}</h6>}
        </div>
    )
}
export default ForgotPwdAuth;
