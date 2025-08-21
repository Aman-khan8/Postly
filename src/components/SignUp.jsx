import React, { useState } from 'react';
import Logo from './logo';
import Input from './Input';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import userAuthentication from '../appwriteservices/Auth';
import { LoginState } from '../store/authSlice';



function SignUpForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);



  async function UserSignUp(data) {
   
  try {
    const { user, session } = await userAuthentication.SignUp({
      email: data.email,
      password: data.password,
      name: data.fullName
    });

    if (!session) {
      setError("SignUp failed: no session created");
      return;
    }

    const currentUser = await userAuthentication.getCurrentUser();

    if (!currentUser) {
      setError("No current user found after signup");
      return;
    }

    dispatch(LoginState(currentUser));
 
    navigate('/');

  } catch (err) {
    setError(err.message || "Something went wrong");
  }
}
  return (
    <>
    
 <div className='w-full h-[100vh] bg-white flex justify-center items-center'>
      <div className='w-[40%] h-[95%] bg-gray-200 flex justify-center items-center'>
        <div className="flex flex-col items-center gap-y-2 w-full p-4">
          <div className='w-[20%] h-[10%]'>
            <Logo />
            
          </div>
          <h2 className='text-center text-2xl font-bold leading-tight mb-4'>Create your Account</h2>
           <form onSubmit={handleSubmit(UserSignUp)} 
            className='w-full flex flex-col items-center gap-y-4'>

                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

           <Input
  label="Full Name"
  type="text"
  placeholder="Enter your Full Name"
  {...register("fullName", { required: "Full name is required" })}
/>
{errors.fullName && (
  <p className="text-red-600 text-sm">{errors.fullName.message}</p>
)}

<Input
  label="Email"
  type="email"
  placeholder="Enter your Email"
  {...register("email", { 
    required: "Email is required",
    pattern: {
      value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      message: "Invalid email format"
    }
  })}
/>
{errors.email && (
  <p className="text-red-600 text-sm">{errors.email.message}</p>
)}

<Input
  label="Password"
  type="password"
  placeholder="Enter your Password"
  {...register("password", { 
    required: "Password is required",
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      message: "Password must be at least 8 characters long and include letters and numbers"
    }
  })}
/>
{errors.password && (
  <p className="text-red-600 text-sm">{errors.password.message}</p>
)}


              <p>
              Already have an account?{' '}
              <Link to='/login' className='text-blue-600 hover:underline'>
                Login
              </Link>
            </p>

              <div className='w-[80%] h-[30%]'>
              
              <button type='Submit' className='bg-indigo-700 w-full h-full rounded-2xl p-2 text-white'>Sign UP</button>
            </div>

            </form>
          </div>
          </div>
        </div>
          
              
    </>
  )
}

export default SignUpForm;
