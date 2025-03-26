import { useState } from "react";
import {  FaGooglePlusG } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import InputForm from "./InputForm";
import { useAuth } from "../reactContext/authContext";
import Swal from "sweetalert2";

const Login = () => {

    const {loginUser, signUpWithGoogle } = useAuth();
    const [email, setEmail ] = useState('');
    const [password, setPassword ] = useState('');
    const [message, setMessage ] = useState('');
    const navigate = useNavigate();

    // React hook form
    const {
        register,
        handleSubmit,
      } = useForm()

      const onSubmit = async (data) => {
        try {
            const user = await loginUser(data.email, data.password);
            // alert('User Logged In Successfully', user);
            Swal.fire({
                title: "Login Successfully",
                icon: "success",
                draggable: true
              });
            if(!user){
                setMessage('Invalid Email and Password');
            }
            navigate('/');
        } catch (error) {
            console.log(error);
            setMessage('Invalid Email and Password');
            
        }
      }
    //   console.log(watch("example")); // watch input value by passing the name of it

     //   GOOGLE SIGN IN
     const handleGoogleSignIn = async () => {
        try {
            const user = await signUpWithGoogle();
            alert('User Logged In Successfully', user);
        } catch (error) {
            console.log(error);
            setEmail('Unable to Sign In With Google Auth');
        }
      }

  return (
    <>
        <div className="h-[calc(100vh-120px)] flex justify-center items-center ">
            <div className="w-full max-w-sm mx-auto bg-gray-100 shadow-md rounded pt-6 px-8 pb-8 mb-4">
            {/* <div className="w-full max-w-sm mx-auto bg-gray-100 shadow-md rounded pt-6 px-8 pb-8 mb-4"> */}
                <h1 className="text-xl font-semibold mb-4 text-center">Login</h1>
                <hr className="mb-8" />

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <InputForm
                            {...register("email", { required: true })}
                            type="email"
                            name="email"
                            id="email"
                            label="Email Address:"
                            placeholder="Enter your email"
                            value = {email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <InputForm
                            {...register("password", { required: true })}
                            label="Password:"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            value = {password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {
                        message && <p className="text-red-500 mb-4 text-xs">Invalid Email and Password</p>
                    }

                        {/* LOGIN BUTTON */}
                    <div>
                        <button className='bg-primary w-full  text-white font-bold py-2 px-8 rounded-md focus:outline-none'> Login </button>
                    </div>
                    </form>

                            <p className='align-baseline text-center font-medium mt-4 text-sm'>Don&apos;t  have an account? <Link to="/register" className='text-red-500'>Register</Link></p>

                    {/* google sign in */}
                    <div className='mt-4'>
                        <button 
                           onClick={handleGoogleSignIn}
                        className='w-full flex flex-wrap gap-1 items-center justify-center bg-primary text-white font-bold py-2 px-4 rounded-md focus:outline-none'>
                        <FaGooglePlusG  className='mr-2'/>
                            Sign in with Google
                        </button>
                    </div>

                        <p className='mt-5 text-center text-gray-500 text-xs'>©2025 Book Store. All rights reserved.</p>
            </div>
        </div>
    
    </>
    
  )
}

export default Login
