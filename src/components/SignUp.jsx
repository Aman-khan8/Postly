import React, { useState } from 'react';
import Logo from './Logo';
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
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const password = watch("password", "");

// validations
const hasMinLength = password.length >= 8;
const hasUpperCase = /[A-Z]/.test(password);
const hasLowerCase = /[a-z]/.test(password);
const hasNumber = /\d/.test(password);
const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

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
<div className='w-full h-[100vh] bg-white flex justify-center items-center'>
<div className='sm:w-[40%] w-[90%] h-[95%] bg-gray-200 flex justify-center items-center'>
<div className="flex flex-col items-center sm:gap-y-2 gap-y-5 w-full p-4">

<div className='sm:w-[20%] sm:h-[10%] w-[50%]'>
<Logo />
</div>

<h2 className='text-center text-2xl font-bold leading-tight mb-4'>
Create your Account
</h2>

<form onSubmit={handleSubmit(UserSignUp)}
className='w-full flex flex-col items-center sm:gap-y-2 gap-y-5'>

{/* FULL NAME */}
<Input
label="Full Name"
type="text"
className='rounded-lg'
placeholder="Enter your Full Name"
{...register("fullName", { required: "Full name is required" })}
/>
{errors.fullName && (
<p className="text-red-600 text-sm">{errors.fullName.message}</p>
)}

{/* EMAIL */}
<Input
label="Email"
type="email"
placeholder="Enter your Email"
className='rounded-lg'
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

{/* PASSWORD */}
<div className="relative w-full">
<Input
label="Password"
type={showPassword ? "text" : "password"}
placeholder="Enter your Password"
className="rounded-lg"
{...register("password", {
required: "Password is required",
pattern: {
value:
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
message:
"Password must contain uppercase, lowercase, number and special character"
}
})}
/>

{/* INSIDE BUTTON */}
<button
type="button"
onClick={() => setShowPassword(!showPassword)}
className="absolute right-3 top-9 text-blue-600 text-sm"
>
{showPassword ? "Hide" : "Show"}
</button>

{errors.password && (
<p className="text-red-600 text-sm">{errors.password.message}</p>
)}
</div>

{/* PASSWORD CHECKLIST */}
<div className="text-sm mt-2">
<p className={hasMinLength ? "text-green-600" : "text-red-600"}>
{hasMinLength ? "✅" : "❌"} At least 8 characters
</p>

<p className={hasUpperCase ? "text-green-600" : "text-red-600"}>
{hasUpperCase ? "✅" : "❌"} One uppercase letter
</p>

<p className={hasLowerCase ? "text-green-600" : "text-red-600"}>
{hasLowerCase ? "✅" : "❌"} One lowercase letter
</p>

<p className={hasNumber ? "text-green-600" : "text-red-600"}>
{hasNumber ? "✅" : "❌"} One number
</p>

<p className={hasSpecialChar ? "text-green-600" : "text-red-600"}>
{hasSpecialChar ? "✅" : "❌"} One special character
</p>
</div>

{/* CONFIRM PASSWORD */}
<div className="relative w-full">
<Input
label="Confirm Password"
type={showConfirmPassword ? "text" : "password"}
placeholder="Confirm Password"
className="rounded-lg"
{...register("confirmPassword", {
required: "Confirm Password is required",
validate: (value) =>
value === password || "Passwords do not match"
})}
/>

{/* INSIDE BUTTON */}
<button
type="button"
onClick={() => setShowConfirmPassword(!showConfirmPassword)}
className="absolute right-3 top-9 text-blue-600 text-sm"
>
{showConfirmPassword ? "Hide" : "Show"}
</button>

{errors.confirmPassword && (
<p className="text-red-600 text-sm">
{errors.confirmPassword.message}
</p>
)}
</div>

{/* LOGIN */}
<p>
Already have an account?{' '}
<Link to='/login' className='text-blue-600 hover:underline'>
Login
</Link>
</p>

{/* ERROR */}
{error && (
<p className="text-red-600 sm:text-sm text-xs text-center">
{error}
</p>
)}

{/* SUBMIT */}
<div className='w-[80%] h-[30%]'>
<button
type="submit"
disabled={
!(
hasMinLength &&
hasUpperCase &&
hasLowerCase &&
hasNumber &&
hasSpecialChar
)
}
className="bg-indigo-700 w-full h-full rounded-2xl p-2 text-white disabled:bg-gray-400"
>
Sign Up
</button>
</div>

</form>
</div>
</div>
</div>
);
}

export default SignUpForm;
