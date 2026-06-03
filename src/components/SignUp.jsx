import React, { useState } from "react";
import Logo from "./Logo";
import Input from "./Input";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { LoginState } from "../store/authSlice";

function SignUpForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch("password", "");

  const isValid =
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password) &&
    /[!@#$%^&*(),.?":{}|<>]/.test(password);

  async function UserSignUp(data) {
    dispatch(
      LoginState({
        id: Date.now(),
        name: data.fullName,
        email: data.email
      })
    );

    navigate("/");
  }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-white">
      <div className="w-[90%] sm:w-[40%] bg-gray-200 p-6 rounded-lg shadow-md flex flex-col items-center">

        <Logo />
        <h2 className="text-xl font-bold mt-3 mb-5">
          Create Account
        </h2>

        <form
          onSubmit={handleSubmit(UserSignUp)}
          className="w-full flex flex-col gap-4"
        >

          {/* FULL NAME */}
          <div>
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter full name"
              {...register("fullName", {
                required: "Full name is required"
              })}
            />
            {errors.fullName && (
              <p className="text-red-600 text-xs mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <Input
              label="Email"
              type="email"
              placeholder="Enter email"
              {...register("email", {
                required: "Email is required"
              })}
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required"
              })}
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-xs text-blue-600 cursor-pointer"
            >
              {showPassword ? "Hide" : "Show"}
            </span>

            {errors.password && (
              <p className="text-red-600 text-xs mt-1">
                {errors.password.message}
              </p>
            )}

            {/* CHECKLIST */}
            <div className="text-xs mt-2 space-y-1">
              <p className={password.length >= 8 ? "text-green-600" : "text-red-600"}>
                • 8+ characters
              </p>
              <p className={/[A-Z]/.test(password) ? "text-green-600" : "text-red-600"}>
                • One uppercase
              </p>
              <p className={/[a-z]/.test(password) ? "text-green-600" : "text-red-600"}>
                • One lowercase
              </p>
              <p className={/\d/.test(password) ? "text-green-600" : "text-red-600"}>
                • One number
              </p>
              <p className={/[!@#$%^&*(),.?":{}|<>]/.test(password) ? "text-green-600" : "text-red-600"}>
                • One special character
              </p>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <Input
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (val) =>
                  val === password || "Passwords do not match"
              })}
            />

            <span
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-3 top-9 text-xs text-blue-600 cursor-pointer"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </span>

            {errors.confirmPassword && (
              <p className="text-red-600 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* LOGIN LINK */}
          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </p>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={!isValid}
            className="bg-indigo-600 text-white py-2 rounded-lg disabled:bg-gray-400"
          >
            Sign Up
          </button>

        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
