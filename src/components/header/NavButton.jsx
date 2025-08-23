import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import userAuthenication from '../../appwriteservices/Auth';
import { LogoutState } from '../../store/authSlice';


function NavButton() {
  const accountStatus = useSelector((state) => state.userCurrentState);
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const buttonText = accountStatus
    ? { name: "Log Out", path: "/login" }
    : { name: "Log In", path: "/login" };


    async function handleClick() {
      if(buttonText.name==='Log In'){
        navigate(buttonText.path)
      }
      else{
        const logStatus=await userAuthenication.Logout();
        if(logStatus){
           dispatch(LogoutState());
           navigate(buttonText.path)
        }
      }
    }
  return (
    <div className=" flex justify-center items-center text-white ">
      <button
        className="  text-white bg-indigo-700 rounded-2xl p-1.5"
        onClick={handleClick}
       
      >
        {buttonText.name } 
      </button>
    </div>
  );
}


export default NavButton