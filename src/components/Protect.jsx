import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function Protect({isauthenticate=true, children}) {

    const [loader,setLoader]=useState(true);
    const navigate=useNavigate();
    const userStatus=useSelector((state)=>state.userCurrentState)


    useEffect(()=>{
        if(isauthenticate && userStatus !==isauthenticate){
           console.log('authentication: ',isauthenticate);
           console.log('userStatus: ',userStatus);
            navigate('/login');
        }
        else if(!isauthenticate&& userStatus!==isauthenticate){
          console.log('authentication: ',isauthenticate);
           console.log('userStatus: ',userStatus);
          navigate('/');
        }
        else{ setLoader(false)}
    },[userStatus,isauthenticate])
 
  return loader? <h1>Loading</h1> : <>{children}</> 
  
}

export default Protect