import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import userAuthenication from '../../appwriteservices/Auth';
import { LogoutState } from '../../store/authSlice';


function NavButton({bgColor='bg-indigo-700',textColor='text-white'}) {
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
    <div className=" flex justify-center items-center  ">
      <button
        className={`p-2.5 cursor-pointer   rounded-2xl ${bgColor} ${textColor}`}
        onClick={handleClick}
       
      >
        {buttonText.name } 
      </button>
    </div>
  );
}


export default NavButton