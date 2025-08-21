import React, { useState } from 'react'
import Logo from './logo'
import Input from './Input'
import { Link,useNavigate } from 'react-router-dom'
import Button from './Button'
import { useForm } from 'react-hook-form'
import {useDispatch} from "react-redux"
import userAuthenication from '../appwriteservices/Auth'
import { LoginState, LogoutState } from '../store/authSlice'

function LoginForm() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {register, handleSubmit} = useForm()
    const [error,seterror]=useState("")

        async function UserLogIn(data){
            try {
                
            seterror("")
           const session=await userAuthenication.Login(data)
           if(session) {
            const userData=await userAuthenication.getCurrentUser()
            if(userData)
                { dispatch(LoginState(userData))
                navigate("/")
           }}}
            catch (error) {
                seterror(error.message);
            }
        }

  return (
  <div className='w-full h-[100vh] bg-white flex  justify-center items-center'>

    <div className='w-[40%] h-[90%] bg-gray-200 flex justify-center items-center'>
    <div className="flex flex-col items-center gap-y-2">
        <div className='w-[20%] h-[10%]'>
            <Logo/>
        </div>
        <div className='text-black h-[5%]'>
            <h2 className='text-center text-2xl font-bold leading-tight'>LogIn to Continue</h2>
            
        </div>
        <form onSubmit={handleSubmit(UserLogIn)} className='w-[100%] flex justify-center items-center'>
            <div className='flex flex-col items-center w-[100%] gap-y-2'> 
        <Input label="Email"
        type="email"
        placeholder="Enter your Email"
        className='rounded-lg'
        {...register('email',{
            required:true,
            validate:{
                 matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
            }
        })}
        />


        <Input label="Password"
        type="password"
        placeholder="Enter Password" 
        className='rounded-lg'
        {...register('password',{
            required:true,
           
        })}
        />

        <p>Don't have a account? 
            <Link
            to='/signup'
            className='text-blue-600 duration-200 hover:underline text-primary'>
             SignUp
            
            </Link>
        </p>
             {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <div className='w-[80%] h-[10%]'> 
        <Button type='submit' children='LogIn' bgColor='bg-indigo-700' />
        </div>
        </div>
        </form>
    </div>
</div>

    </div>
   
 
  )
}

export default LoginForm