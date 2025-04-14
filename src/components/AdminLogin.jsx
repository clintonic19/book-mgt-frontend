import { useState } from 'react'
import InputForm from './InputForm'
import {  useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from "axios";
import { API_URL } from '../redux/slice/booksApi/bookApiSlice';
import Swal from 'sweetalert2';

const AdminLogin = () => {

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
            //ADMIN API CALL
            const response = await axios.post(`${API_URL}/api/auth/admin`, data,{
                headers:{
                    'Content-Type': 'application/json'
                }
            })
           const auth = response.data;
           
           //CHECK IF TOKEN EXISTS AND REDIRECT TO DASHBOARD
           if(auth.token){
                localStorage.setItem('token', auth.token);
                setTimeout(() => {
                    localStorage.removeItem('token');
                    setMessage('Expired token. Please login again');
                    navigate('/');
                }, 3600 * 1000);
            }else{
                setMessage('Invalid Username and Password');}
              Swal.fire({
                            title: "Admin Login Successful",
                            // text: "Your order placed successfully!",
                            icon: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#3085d6",
                            // cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, It's Okay!"
                        })
                        navigate("/dashboard");  
        }catch (error) {
            setMessage('Invalid Username and Password');    
            // message('Invalid Username and Password');    
            console.log(error);
        }
      };

    return (
        <>
            <div className="h-screen flex justify-center items-center ">
                <div className="w-full max-w-sm mx-auto bg-gray-100 shadow-md rounded pt-6 px-8 pb-8 mb-4">
                {/* <div className="w-full max-w-sm mx-auto bg-gray-100 shadow-md rounded pt-6 px-8 pb-8 mb-4"> */}
                    <h1 className="text-xl font-semibold mb-4 text-center">Admin Login</h1>
                    <hr className="mb-8" />
    
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <InputForm
                                {...register("username", { required: true })}
                                type="text"
                                name="username"
                                id="username"
                                label="Username:"
                                placeholder="Enter your username"
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
    
                        {/* {
                            message && <p className="text-red-500 mb-4 text-xs">Invalid Email and Password</p>
                        } */}
    
                            {/* LOGIN BUTTON */}
                        <div>
                            <button className='bg-primary w-full  text-white font-bold py-2 px-8 rounded-md focus:outline-none'> Login </button>
                        </div>
                        </form>
    
                                {/* <p className='align-baseline text-center font-medium mt-4 text-sm'>Don&apos;t  have an account? <Link to="/register" className='text-red-500'>Register</Link></p> */}
                            <p className='mt-5 text-center text-gray-500 text-xs'>©2025 Book Store. All rights reserved.</p>
                </div>
            </div>
        
        </>
        
      )
  
}

export default AdminLogin
