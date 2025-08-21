import { useEffect, useState } from "react"
import userAuthenication from "./appwriteservices/Auth"
import { useDispatch } from "react-redux"
import { LoginState, LogoutState } from "./store/authSlice";
import Footer from "./components/Footer";
import Header from "./components/header/Header";
import { Outlet } from "react-router-dom";

function App() {
      
  const [loading,setloading]=useState(true)
  const dispatch=useDispatch();

  useEffect(()=>{
      userAuthenication.getCurrentUser().then((userData)=>{
        if(userData){
          dispatch(LoginState(userData));
        }
        else{
          dispatch(LogoutState(userData))
        }
           
      })
      .finally(()=>{setloading(false)})


  },[])




  

  
return(
  
  <> 
       <Header/>
       
       <Outlet/>

         <Footer/>

  </>
)
}
export default App
