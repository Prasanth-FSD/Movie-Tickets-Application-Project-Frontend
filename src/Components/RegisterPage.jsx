import React, { useEffect } from 'react';
import * as Yup from 'yup'
import './Style/RegisterPage&Login.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';

const RegisterPage = () => {
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

    // Formik
    const initialValues = {username:'',email:'',password:''}
    const validationSchema = Yup.object({
        username: Yup.string().matches(/^[A-Za-z][A-Za-z0-9_]{3,29}$/g, 'Invalid Username').required('Username is Required'),
        email:Yup.string().email('Invalid email address').matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Invalid email address').required('Email is Required'),
        password: Yup.string().min(8).required('Password is Required'),
    })


    // Register API Call
    const onSubmit  = async(values)=>{
        // console.log("Register Api Payloads", values);
        try {
           //const registerResponse =  await axios.post('http://localhost:8500/movieticketapi/user/register',values)
             const registerResponse =  await axios.post('https://movie-tickets-application-project-backend.onrender.com/movieticketapi/user/register',values)
            console.log(registerResponse)
            toast.success(registerResponse.data.message)
            setTimeout(() => {
                navigate('/')
            }, 1000);
        } catch (err) {
           toast.error(err.response.data.message)
           console.log('Error', err.message);
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
                    <img src="bg.svg" />
                </div>
                <div class="login-content">
                    <form onSubmit={formik.handleSubmit}>
                        <img src="avatar.svg" />
                        <h2 class="title">Welcome</h2>
                        <div class="input-div one">
                            <div class="i">
                                <i class="fas fa-user"></i>
                            </div>
                            <div class="div">
                                <h5>Username</h5>
                                <input type="text" class="input" id='username' value={formik.values.username} onChange={formik.handleChange} />
                            </div>
                        </div>
                         <span className="text-danger">{formik.errors.username}</span>
                           
                        <div class="input-div one">
                            <div class="i">
                                <i class="fas fa-envelope"></i>
                            </div>
                            <div class="div">
                                <h5>Email</h5>
                                <input type="email" class="input" id='email' value={formik.values.email} onChange={formik.handleChange} />
                            </div>
                        </div>
                        <span className="text-danger">{formik.errors.email}</span>

                        <div class="input-div pass">
                            <div class="i">
                                <i class="fas fa-lock"></i>
                            </div>
                            <div class="div">
                                <h5>Password</h5>
                                <input type="password" class="input" id='password' value={formik.values.password} onChange={formik.handleChange} />
                            </div>
                        </div>
                        <span className="text-danger">{formik.errors.password}</span>
                        {/* <input type="submit" class="button" value="Register" /> */}
                        <button type='submit'  class="button">Register</button>
                    <Link to='/'>Already a user?</Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;