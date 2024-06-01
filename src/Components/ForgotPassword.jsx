import React, { useEffect } from 'react';
import './Style/RegisterPage&Login.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import * as Yup from 'yup'
import { useFormik } from 'formik';
const ForgotPassword = () => {
    useEffect(() => {
        const inputs = document.querySelectorAll(".input");

        function addcl() {
            let parent = this.parentNode.parentNode;
            parent.classList.add("focus");
        }

        function remcl() {
            let parent = this.parentNode.parentNode;
            if (this.value === "") {
                parent.classList.remove("focus");
            }
        }

        inputs.forEach(input => {
            input.addEventListener("focus", addcl);
            input.addEventListener("blur", remcl);
        });

        // Cleanup function to remove event listeners when the component unmounts
        return () => {
            inputs.forEach(input => {
                input.removeEventListener("focus", addcl);
                input.removeEventListener("blur", remcl);
            });
        };
    }, []); // Empty dependency array to run the effect only once when the component mounts
    
    const navigate = useNavigate()

    const initialValues ={email:''}

    const validationSchema = Yup.object({
        email:Yup.string().email('Invalid email address').matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Invalid email address').required('Email is Required'),
    })

    const onSubmit = async (values)=>{
        try {
           //const res = await axios.post('http://localhost:8500/movieticketapi/user/forgotpassword',values)
             const res = await axios.post('https://movie-tickets-application-project-backend.onrender.com/movieticketapi/user/forgotpassword',values)
            toast.success(res.data.message)
            setTimeout(() => {
                navigate('/')
            }, 2000);
        } catch (error) {
            toast.error(error.response.data.message)
        } 
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    })

    
    return (
        <div>
            <img class="wave" src="wave.png" />
            <div class="LoginPagecontainer">
                <div class="img">
                    <img src="forgot.svg" />
                </div>
                <div class="login-content">
                    <form onSubmit={formik.handleSubmit}>
                        <img src="avatar.svg" />
                        <h2 class="title">Forgot Password</h2>
                        <div class="input-div one">
                            <div class="i">
                                <i class="fas fa-user"></i>
                            </div>
                            <div class="div">
                                <h5>Email</h5>
                                <input type="email" class="input" id='email' value={formik.values.email} onChange={formik.handleChange} />
                            </div>
                        </div>
                        <span className="text-danger">{formik.errors.email}</span>
                        {/* <a href="#">Forgot Password?</a> */}
                        <Link to='/'>Back to Login?</Link>
                        {/* <input type="submit" class="button" value="Login" /> */}
                        <button type='submit' className='button'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;